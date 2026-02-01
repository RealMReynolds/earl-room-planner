// Draggable furniture item with enhanced visuals

export default function DraggableFurniture({
  item,
  scale,
  isSelected,
  collision,
  onPointerDown,
  showDimensions,
}) {
  const { x, y, width, depth, rotation = 0, color, name, isCircle, id } = item;
  const hasCollision = collision?.hasCollision;
  const blocksPath = collision?.blocksPath;

  // Enhanced colors based on furniture type
  const getGradientColors = () => {
    if (id === 'couch') return { main: '#92400e', light: '#b45309', dark: '#78350f', text: '#fef3c7' };
    if (id === 'desk') return { main: '#374151', light: '#4b5563', dark: '#1f2937', text: '#f1f5f9' };
    if (id === 'officeChair') return { main: '#1f2937', light: '#374151', dark: '#111827', text: '#f1f5f9' };
    if (id === 'tv') return { main: '#0f172a', light: '#1e293b', dark: '#020617', text: '#60a5fa' };
    if (id === 'airMattress' || id === 'queenBed') return { main: '#e5e7eb', light: '#f3f4f6', dark: '#d1d5db', text: '#374151' };
    if (id === 'coffeeTable' || id === 'sideTable' || id === 'nightstand') return { main: '#5d4037', light: '#6d4c41', dark: '#4e342e', text: '#fef3c7' };
    if (id === 'tableLamp') return { main: '#fef3c7', light: '#fef9c3', dark: '#fde68a', text: '#78350f' };
    if (id === 'stool') return { main: '#b45309', light: '#d97706', dark: '#92400e', text: '#fef3c7' };
    return { main: color, light: color, dark: color, text: '#ffffff' };
  };

  const colors = getGradientColors();
  const gradientId = `grad-${item.instanceId}`;

  // Determine glow color based on state
  let glowColor = 'transparent';
  let strokeColor = 'rgba(100,116,139,0.6)';
  let strokeWidth = 1.5;

  if (isSelected) {
    glowColor = 'rgba(59,130,246,0.5)';
    strokeColor = '#3b82f6';
    strokeWidth = 3;
  } else if (hasCollision) {
    glowColor = 'rgba(239,68,68,0.4)';
    strokeColor = '#ef4444';
    strokeWidth = 2.5;
  } else if (blocksPath) {
    glowColor = 'rgba(245,158,11,0.4)';
    strokeColor = '#f59e0b';
    strokeWidth = 2.5;
  }

  const centerX = x + width / 2;
  const centerY = y + depth / 2;

  return (
    <g
      transform={`rotate(${rotation}, ${centerX * scale}, ${centerY * scale})`}
      onPointerDown={onPointerDown}
      style={{ cursor: 'grab' }}
      className="furniture-item"
    >
      <defs>
        {/* Gradient for 3D effect */}
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={colors.light} />
          <stop offset="40%" stopColor={colors.main} />
          <stop offset="100%" stopColor={colors.dark} />
        </linearGradient>
      </defs>

      {/* Selection/collision glow */}
      {(isSelected || hasCollision || blocksPath) && (
        <>
          {isCircle ? (
            <circle
              cx={(x + width / 2) * scale}
              cy={(y + depth / 2) * scale}
              r={(Math.max(width, depth) / 2 + 10) * scale}
              fill="none"
              stroke={glowColor}
              strokeWidth="16"
              style={{ filter: 'blur(6px)' }}
            />
          ) : (
            <rect
              x={(x - 10) * scale}
              y={(y - 10) * scale}
              width={(width + 20) * scale}
              height={(depth + 20) * scale}
              fill="none"
              stroke={glowColor}
              strokeWidth="16"
              rx="14"
              style={{ filter: 'blur(6px)' }}
            />
          )}
        </>
      )}

      {/* Drop shadow */}
      {isCircle ? (
        <ellipse
          cx={(x + width / 2 + 3) * scale}
          cy={(y + depth / 2 + 4) * scale}
          rx={(Math.max(width, depth) / 2) * scale}
          ry={(Math.max(width, depth) / 2 * 0.9) * scale}
          fill="rgba(0,0,0,0.25)"
          style={{ filter: 'blur(4px)' }}
        />
      ) : (
        <rect
          x={(x + 3) * scale}
          y={(y + 4) * scale}
          width={width * scale}
          height={depth * scale}
          fill="rgba(0,0,0,0.25)"
          rx="6"
          style={{ filter: 'blur(4px)' }}
        />
      )}

      {/* Main furniture shape */}
      {isCircle ? (
        <circle
          cx={(x + width / 2) * scale}
          cy={(y + depth / 2) * scale}
          r={(Math.max(width, depth) / 2) * scale}
          fill={`url(#${gradientId})`}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
        />
      ) : (
        <>
          {/* Main rectangle */}
          <rect
            x={x * scale}
            y={y * scale}
            width={width * scale}
            height={depth * scale}
            fill={`url(#${gradientId})`}
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            rx="6"
          />
          {/* Top highlight edge */}
          <rect
            x={(x + 3) * scale}
            y={(y + 2) * scale}
            width={(width - 6) * scale}
            height={Math.min(6, depth * scale * 0.1)}
            fill="rgba(255,255,255,0.15)"
            rx="2"
          />
        </>
      )}

      {/* Furniture label */}
      <text
        x={(x + width / 2) * scale}
        y={(y + depth / 2) * scale}
        textAnchor="middle"
        dominantBaseline="middle"
        fill={colors.text}
        fontSize={Math.max(10, Math.min(13, width * scale * 0.13))}
        fontWeight="600"
        fontFamily="system-ui, -apple-system, sans-serif"
        style={{
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      >
        {name.split('(')[0].trim().split(' ').slice(0, 2).join(' ')}
      </text>

      {/* Dimension badges when selected or showDimensions */}
      {(isSelected || showDimensions) && (
        <>
          {/* Width dimension badge */}
          <g transform={`translate(${(x + width / 2) * scale}, ${(y - 14) * scale})`}>
            <rect x="-20" y="-10" width="40" height="18" rx="6" fill="#0f172a" stroke="#334155" strokeWidth="1.5" />
            <text x="0" y="2" textAnchor="middle" fill="#e2e8f0" fontSize="11" fontFamily="ui-monospace, monospace" fontWeight="600">
              {width}"
            </text>
          </g>
          {/* Depth dimension badge */}
          <g transform={`translate(${(x + width + 14) * scale}, ${(y + depth / 2) * scale})`}>
            <rect x="-20" y="-10" width="40" height="18" rx="6" fill="#0f172a" stroke="#334155" strokeWidth="1.5" />
            <text x="0" y="2" textAnchor="middle" fill="#e2e8f0" fontSize="11" fontFamily="ui-monospace, monospace" fontWeight="600">
              {depth}"
            </text>
          </g>
        </>
      )}

      {/* Warning indicator */}
      {(hasCollision || blocksPath) && (
        <g transform={`translate(${(x + width - 10) * scale}, ${(y + 10) * scale})`}>
          <circle r="14" fill={hasCollision ? '#dc2626' : '#d97706'} stroke="#fff" strokeWidth="2.5" />
          <text
            y="1"
            textAnchor="middle"
            dominantBaseline="middle"
            fill="white"
            fontSize="16"
            fontWeight="bold"
            style={{ pointerEvents: 'none' }}
          >
            !
          </text>
        </g>
      )}

      {/* Rotation handle when selected */}
      {isSelected && (
        <g transform={`translate(${(x + width / 2) * scale}, ${(y - 30) * scale})`}>
          <line x1="0" y1="16" x2="0" y2="8" stroke="#3b82f6" strokeWidth="2" />
          <circle r="12" fill="#3b82f6" stroke="#fff" strokeWidth="2.5" style={{ cursor: 'grab' }} />
          <path
            d="M -5 -1 A 6 6 0 1 1 5 -1"
            fill="none"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path d="M 5 -1 L 7 -5 L 8 1 Z" fill="white" />
        </g>
      )}
    </g>
  );
}
