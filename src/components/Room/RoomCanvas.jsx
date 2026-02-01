import { useRef, useState, useCallback, useEffect } from 'react';
import { SCALE, ROOM, FIXED_ELEMENTS, TRAFFIC_PATHS, ZONES } from '../../data/roomDimensions';
import { rectsOverlap, overlapsTrafficPath, snapToGrid } from '../../utils/geometry';
import FixedElements from './FixedElements';
import ZoneOverlays from './ZoneOverlays';
import TrafficPaths from './TrafficPaths';
import DraggableFurniture from '../Furniture/DraggableFurniture';

// Canvas dimensions in pixels (includes bedroom area below living room)
const TOTAL_HEIGHT = ROOM.livingDepth + ROOM.bedroomDepth + 40;
const CANVAS_WIDTH = ROOM.livingWidth * SCALE + 120;
const CANVAS_HEIGHT = TOTAL_HEIGHT * SCALE + 120;

export default function RoomCanvas({
  furniture,
  setFurniture,
  selectedId,
  setSelectedId,
  showZones,
  showTrafficPaths,
  showDimensions,
  gridSnap,
}) {
  const svgRef = useRef(null);
  const [dragState, setDragState] = useState(null);

  // Calculate collisions for all furniture
  const getCollisions = useCallback((items) => {
    const collisions = {};

    items.forEach((item, index) => {
      let hasCollision = false;
      let blocksPath = false;

      // Check against other furniture
      items.forEach((other, otherIndex) => {
        if (index !== otherIndex) {
          if (rectsOverlap(item, other)) {
            hasCollision = true;
          }
        }
      });

      // Check against traffic paths
      TRAFFIC_PATHS.forEach((path) => {
        if (overlapsTrafficPath(item, path)) {
          blocksPath = true;
        }
      });

      // Check against fixed elements
      const blockingElements = [
        'kitchenCounter', 'refrigerator', 'dishwasher', 'microwave',
        'dividingWall', 'bathroom', 'walkInCloset', 'washerDryer'
      ];

      blockingElements.forEach((key) => {
        const element = FIXED_ELEMENTS[key];
        if (element && element.width && element.height) {
          if (rectsOverlap(item, { ...element, depth: element.height })) {
            hasCollision = true;
          }
        }
      });

      collisions[item.instanceId] = { hasCollision, blocksPath };
    });

    return collisions;
  }, []);

  const collisions = getCollisions(furniture);

  // Handle mouse/touch events for dragging
  const handlePointerDown = useCallback(
    (e, item) => {
      if (e.button !== 0) return;

      const svg = svgRef.current;
      const pt = svg.createSVGPoint();
      pt.x = e.clientX;
      pt.y = e.clientY;
      const svgP = pt.matrixTransform(svg.getScreenCTM().inverse());

      setDragState({
        id: item.instanceId,
        startX: svgP.x,
        startY: svgP.y,
        itemStartX: item.x * SCALE,
        itemStartY: item.y * SCALE,
      });

      setSelectedId(item.instanceId);
      e.preventDefault();
    },
    [setSelectedId]
  );

  const handlePointerMove = useCallback(
    (e) => {
      if (!dragState) return;

      const svg = svgRef.current;
      const pt = svg.createSVGPoint();
      pt.x = e.clientX;
      pt.y = e.clientY;
      const svgP = pt.matrixTransform(svg.getScreenCTM().inverse());

      const dx = svgP.x - dragState.startX;
      const dy = svgP.y - dragState.startY;

      let newX = (dragState.itemStartX + dx) / SCALE;
      let newY = (dragState.itemStartY + dy) / SCALE;

      if (gridSnap) {
        newX = snapToGrid(newX);
        newY = snapToGrid(newY);
      }

      const item = furniture.find(f => f.instanceId === dragState.id);
      if (item) {
        newX = Math.max(0, Math.min(newX, ROOM.livingWidth - item.width));
        newY = Math.max(0, Math.min(newY, TOTAL_HEIGHT - item.depth));
      }

      setFurniture((prev) =>
        prev.map((item) =>
          item.instanceId === dragState.id ? { ...item, x: newX, y: newY } : item
        )
      );
    },
    [dragState, gridSnap, setFurniture, furniture]
  );

  const handlePointerUp = useCallback(() => {
    setDragState(null);
  }, []);

  useEffect(() => {
    if (dragState) {
      window.addEventListener('pointermove', handlePointerMove);
      window.addEventListener('pointerup', handlePointerUp);
      return () => {
        window.removeEventListener('pointermove', handlePointerMove);
        window.removeEventListener('pointerup', handlePointerUp);
      };
    }
  }, [dragState, handlePointerMove, handlePointerUp]);

  const handleCanvasClick = (e) => {
    if (e.target === svgRef.current || e.target.classList.contains('room-floor')) {
      setSelectedId(null);
    }
  };

  return (
    <svg
      ref={svgRef}
      width={CANVAS_WIDTH}
      height={CANVAS_HEIGHT}
      viewBox={`0 0 ${CANVAS_WIDTH} ${CANVAS_HEIGHT}`}
      className="rounded-2xl shadow-2xl cursor-crosshair"
      onClick={handleCanvasClick}
      style={{
        touchAction: 'none',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)'
      }}
    >
      <defs>
        {/* Improved grid patterns */}
        <pattern id="smallGrid" width={6 * SCALE} height={6 * SCALE} patternUnits="userSpaceOnUse">
          <path d={`M ${6 * SCALE} 0 L 0 0 0 ${6 * SCALE}`} fill="none" stroke="rgba(148,163,184,0.05)" strokeWidth="0.5" />
        </pattern>
        <pattern id="largeGrid" width={24 * SCALE} height={24 * SCALE} patternUnits="userSpaceOnUse">
          <rect width={24 * SCALE} height={24 * SCALE} fill="url(#smallGrid)" />
          <path d={`M ${24 * SCALE} 0 L 0 0 0 ${24 * SCALE}`} fill="none" stroke="rgba(148,163,184,0.1)" strokeWidth="1" />
        </pattern>

        {/* Floor texture gradient */}
        <linearGradient id="floorGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#374151" />
          <stop offset="50%" stopColor="#3f4a5c" />
          <stop offset="100%" stopColor="#374151" />
        </linearGradient>

        <linearGradient id="bedroomFloor" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2d3748" />
          <stop offset="50%" stopColor="#343f52" />
          <stop offset="100%" stopColor="#2d3748" />
        </linearGradient>

        {/* Glow effects */}
        <filter id="windowGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="8" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="2" dy="4" stdDeviation="4" floodColor="#000" floodOpacity="0.3" />
        </filter>

        <filter id="innerShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feComponentTransfer in="SourceAlpha">
            <feFuncA type="table" tableValues="1 0" />
          </feComponentTransfer>
          <feGaussianBlur stdDeviation="3" />
          <feOffset dx="2" dy="2" result="offsetblur" />
          <feFlood floodColor="#000" floodOpacity="0.4" result="color" />
          <feComposite in2="offsetblur" operator="in" />
          <feComposite in2="SourceAlpha" operator="in" />
          <feMerge>
            <feMergeNode in="SourceGraphic" />
            <feMergeNode />
          </feMerge>
        </filter>

        {/* Wood texture pattern */}
        <pattern id="woodTexture" width="20" height="20" patternUnits="userSpaceOnUse">
          <rect width="20" height="20" fill="#4a3728" />
          <line x1="0" y1="5" x2="20" y2="5" stroke="#3d2d1f" strokeWidth="1" opacity="0.3" />
          <line x1="0" y1="10" x2="20" y2="10" stroke="#5a4738" strokeWidth="0.5" opacity="0.2" />
          <line x1="0" y1="15" x2="20" y2="15" stroke="#3d2d1f" strokeWidth="1" opacity="0.3" />
        </pattern>
      </defs>

      {/* Background with subtle vignette */}
      <rect x="0" y="0" width={CANVAS_WIDTH} height={CANVAS_HEIGHT} fill="url(#floorGradient)" opacity="0.3" />

      {/* Offset group for padding */}
      <g transform="translate(60, 60)">
        {/* Living/Kitchen floor with texture */}
        <rect
          className="room-floor"
          x="0"
          y="0"
          width={ROOM.livingWidth * SCALE}
          height={ROOM.livingDepth * SCALE}
          fill="url(#floorGradient)"
          stroke="#64748b"
          strokeWidth="3"
          rx="8"
          filter="url(#innerShadow)"
        />

        {/* Bedroom floor */}
        <rect
          className="room-floor"
          x={(ROOM.livingWidth - ROOM.bedroomWidth - 20) * SCALE}
          y={(ROOM.livingDepth + 6) * SCALE}
          width={(ROOM.bedroomWidth + 20) * SCALE}
          height={(ROOM.bedroomDepth - 6) * SCALE}
          fill="url(#bedroomFloor)"
          stroke="#64748b"
          strokeWidth="2"
          rx="8"
          filter="url(#innerShadow)"
        />

        {/* Grid overlay */}
        <rect
          x="0"
          y="0"
          width={ROOM.livingWidth * SCALE}
          height={TOTAL_HEIGHT * SCALE}
          fill="url(#largeGrid)"
          pointerEvents="none"
        />

        {/* Zone overlays */}
        {showZones && <ZoneOverlays zones={ZONES} scale={SCALE} />}

        {/* Traffic paths */}
        {showTrafficPaths && <TrafficPaths paths={TRAFFIC_PATHS} scale={SCALE} />}

        {/* Fixed architectural elements */}
        <FixedElements elements={FIXED_ELEMENTS} scale={SCALE} showDimensions={showDimensions} />

        {/* Furniture items */}
        {furniture.map((item) => (
          <DraggableFurniture
            key={item.instanceId}
            item={item}
            scale={SCALE}
            isSelected={selectedId === item.instanceId}
            collision={collisions[item.instanceId]}
            onPointerDown={(e) => handlePointerDown(e, item)}
            showDimensions={showDimensions}
          />
        ))}

        {/* Dimension labels */}
        {showDimensions && (
          <>
            <g transform={`translate(0, ${-20})`}>
              <line x1="0" y1="0" x2={ROOM.livingWidth * SCALE} y2="0" stroke="#94a3b8" strokeWidth="2" strokeDasharray="4,2" />
              <circle cx="0" cy="0" r="4" fill="#94a3b8" />
              <circle cx={ROOM.livingWidth * SCALE} cy="0" r="4" fill="#94a3b8" />
              <rect x={(ROOM.livingWidth * SCALE) / 2 - 50} y="-14" width="100" height="20" rx="4" fill="#1e293b" />
              <text x={(ROOM.livingWidth * SCALE) / 2} y="0" textAnchor="middle" fill="#e2e8f0" fontSize="12" fontFamily="monospace" fontWeight="600">
                {(ROOM.livingWidth / 12).toFixed(1)}' ({ROOM.livingWidth}")
              </text>
            </g>

            <g transform={`translate(${(ROOM.livingWidth + 15) * SCALE}, 0)`}>
              <line x1="0" y1="0" x2="0" y2={ROOM.livingDepth * SCALE} stroke="#94a3b8" strokeWidth="2" strokeDasharray="4,2" />
              <circle cx="0" cy="0" r="4" fill="#94a3b8" />
              <circle cx="0" cy={ROOM.livingDepth * SCALE} r="4" fill="#94a3b8" />
              <rect x="8" y={(ROOM.livingDepth * SCALE) / 2 - 10} width="90" height="20" rx="4" fill="#1e293b" />
              <text x="12" y={(ROOM.livingDepth * SCALE) / 2 + 4} textAnchor="start" fill="#e2e8f0" fontSize="12" fontFamily="monospace" fontWeight="600">
                {(ROOM.livingDepth / 12).toFixed(1)}' ({ROOM.livingDepth}")
              </text>
            </g>
          </>
        )}
      </g>

      {/* Compass rose */}
      <g transform={`translate(${CANVAS_WIDTH - 50}, 50)`}>
        <circle cx="0" cy="0" r="25" fill="rgba(30,41,59,0.9)" stroke="#475569" strokeWidth="2" />
        <text x="0" y="-8" textAnchor="middle" fill="#f8fafc" fontSize="14" fontWeight="bold">N</text>
        <path d="M 0 -18 L 4 -6 L 0 -10 L -4 -6 Z" fill="#60a5fa" />
        <text x="0" y="16" textAnchor="middle" fill="#94a3b8" fontSize="8">Window</text>
      </g>
    </svg>
  );
}
