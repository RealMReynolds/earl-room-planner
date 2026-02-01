// Traffic flow path visualization

export default function TrafficPaths({ paths, scale }) {
  return (
    <g className="traffic-paths">
      {paths.map((path) => {
        // Create path string from points
        const pathD = path.points
          .map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x * scale} ${p.y * scale}`)
          .join(' ');

        return (
          <g key={path.id}>
            {/* Path corridor background */}
            <path
              d={pathD}
              fill="none"
              stroke="rgba(34, 197, 94, 0.2)"
              strokeWidth={path.width * scale}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Path center line */}
            <path
              d={pathD}
              fill="none"
              stroke="rgba(34, 197, 94, 0.5)"
              strokeWidth="2"
              strokeDasharray="8,4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Direction arrows */}
            {path.points.slice(0, -1).map((point, i) => {
              const nextPoint = path.points[i + 1];
              const midX = (point.x + nextPoint.x) / 2;
              const midY = (point.y + nextPoint.y) / 2;
              const angle = Math.atan2(nextPoint.y - point.y, nextPoint.x - point.x) * (180 / Math.PI);

              return (
                <g key={i} transform={`translate(${midX * scale}, ${midY * scale}) rotate(${angle})`}>
                  <path
                    d="M -8 -4 L 0 0 L -8 4"
                    fill="none"
                    stroke="rgba(34, 197, 94, 0.7)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
              );
            })}
            {/* Label at start */}
            <text
              x={path.points[0].x * scale}
              y={path.points[0].y * scale + 20}
              textAnchor="middle"
              fill="rgba(34, 197, 94, 0.8)"
              fontSize="9"
              fontFamily="sans-serif"
            >
              {path.label}
            </text>
          </g>
        );
      })}
    </g>
  );
}
