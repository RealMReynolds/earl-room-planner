// Zone visualization overlays

export default function ZoneOverlays({ zones, scale }) {
  return (
    <g className="zone-overlays" opacity="0.8">
      {Object.entries(zones).map(([key, zone]) => (
        <g key={key}>
          <rect
            x={zone.x * scale}
            y={zone.y * scale}
            width={zone.width * scale}
            height={zone.height * scale}
            fill={zone.color}
            stroke={zone.color.replace('0.1', '0.4')}
            strokeWidth="1"
            strokeDasharray="4,4"
            rx="4"
          />
          <text
            x={(zone.x + zone.width / 2) * scale}
            y={(zone.y + 12) * scale}
            textAnchor="middle"
            fill={zone.color.replace('0.1', '0.8')}
            fontSize="10"
            fontWeight="500"
            fontFamily="sans-serif"
          >
            {zone.label}
          </text>
        </g>
      ))}
    </g>
  );
}
