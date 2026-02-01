// Fixed architectural elements with enhanced visuals

export default function FixedElements({ elements, scale, showDimensions }) {
  return (
    <g className="fixed-elements">
      <defs>
        {/* Appliance metallic gradient */}
        <linearGradient id="applianceGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#9ca3af" />
          <stop offset="50%" stopColor="#6b7280" />
          <stop offset="100%" stopColor="#4b5563" />
        </linearGradient>

        {/* Kitchen counter wood gradient */}
        <linearGradient id="counterGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#5d4037" />
          <stop offset="50%" stopColor="#4e342e" />
          <stop offset="100%" stopColor="#3e2723" />
        </linearGradient>

        {/* Window gradient */}
        <linearGradient id="windowGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#93c5fd" />
          <stop offset="50%" stopColor="#60a5fa" />
          <stop offset="100%" stopColor="#3b82f6" />
        </linearGradient>

        {/* Wall gradient */}
        <linearGradient id="wallGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#475569" />
          <stop offset="50%" stopColor="#64748b" />
          <stop offset="100%" stopColor="#475569" />
        </linearGradient>

        {/* Glow filter for window */}
        <filter id="windowGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Kitchen Counter/Appliances area */}
      <rect
        x={elements.kitchenCounter.x * scale}
        y={elements.kitchenCounter.y * scale}
        width={elements.kitchenCounter.width * scale}
        height={elements.kitchenCounter.height * scale}
        fill="url(#counterGrad)"
        stroke="#8d6e63"
        strokeWidth="2"
        rx="4"
      />
      <text
        x={(elements.kitchenCounter.x + elements.kitchenCounter.width / 2) * scale}
        y={(elements.kitchenCounter.y + 12) * scale}
        textAnchor="middle"
        fill="#d7ccc8"
        fontSize="9"
        fontWeight="500"
        opacity="0.8"
      >
        KITCHEN
      </text>

      {/* Dishwasher */}
      <rect
        x={elements.dishwasher.x * scale}
        y={elements.dishwasher.y * scale}
        width={elements.dishwasher.width * scale}
        height={elements.dishwasher.height * scale}
        fill="url(#applianceGrad)"
        stroke="#9ca3af"
        strokeWidth="1.5"
        rx="3"
      />
      <rect
        x={(elements.dishwasher.x + 2) * scale}
        y={(elements.dishwasher.y + 2) * scale}
        width={(elements.dishwasher.width - 4) * scale}
        height="4"
        fill="rgba(255,255,255,0.2)"
        rx="1"
      />
      <text
        x={(elements.dishwasher.x + elements.dishwasher.width / 2) * scale}
        y={(elements.dishwasher.y + elements.dishwasher.height / 2 + 2) * scale}
        textAnchor="middle"
        fill="#e5e7eb"
        fontSize="10"
        fontWeight="600"
      >
        DW
      </text>

      {/* Microwave */}
      <rect
        x={elements.microwave.x * scale}
        y={elements.microwave.y * scale}
        width={elements.microwave.width * scale}
        height={elements.microwave.height * scale}
        fill="#1f2937"
        stroke="#374151"
        strokeWidth="1.5"
        rx="2"
      />
      <rect
        x={(elements.microwave.x + 3) * scale}
        y={(elements.microwave.y + 3) * scale}
        width={(elements.microwave.width - 10) * scale}
        height={(elements.microwave.height - 6) * scale}
        fill="#111827"
        rx="1"
      />
      <text
        x={(elements.microwave.x + elements.microwave.width / 2) * scale}
        y={(elements.microwave.y + elements.microwave.height / 2 + 2) * scale}
        textAnchor="middle"
        fill="#9ca3af"
        fontSize="8"
        fontWeight="500"
      >
        Micro
      </text>

      {/* Refrigerator */}
      <rect
        x={elements.refrigerator.x * scale}
        y={elements.refrigerator.y * scale}
        width={elements.refrigerator.width * scale}
        height={elements.refrigerator.height * scale}
        fill="url(#applianceGrad)"
        stroke="#9ca3af"
        strokeWidth="2"
        rx="3"
      />
      <line
        x1={(elements.refrigerator.x + elements.refrigerator.width / 2) * scale}
        y1={(elements.refrigerator.y + 3) * scale}
        x2={(elements.refrigerator.x + elements.refrigerator.width / 2) * scale}
        y2={(elements.refrigerator.y + elements.refrigerator.height - 3) * scale}
        stroke="#4b5563"
        strokeWidth="2"
      />
      <rect
        x={(elements.refrigerator.x + 2) * scale}
        y={(elements.refrigerator.y + 2) * scale}
        width={(elements.refrigerator.width - 4) * scale}
        height="4"
        fill="rgba(255,255,255,0.15)"
        rx="1"
      />
      <text
        x={(elements.refrigerator.x + elements.refrigerator.width / 2) * scale}
        y={(elements.refrigerator.y + elements.refrigerator.height / 2 + 3) * scale}
        textAnchor="middle"
        fill="#f3f4f6"
        fontSize="11"
        fontWeight="600"
      >
        Fridge
      </text>

      {/* Window with glow effect */}
      <rect
        x={(elements.window.x - 5) * scale}
        y={(elements.window.y - 2) * scale}
        width={(elements.window.width + 10) * scale}
        height={(elements.window.height + 25) * scale}
        fill="rgba(147,197,253,0.15)"
        rx="4"
        filter="url(#windowGlow)"
      />
      <rect
        x={elements.window.x * scale}
        y={elements.window.y * scale}
        width={elements.window.width * scale}
        height={elements.window.height * scale}
        fill="url(#windowGrad)"
        stroke="#60a5fa"
        strokeWidth="3"
        rx="2"
      />

      {/* Window label and light rays */}
      <text
        x={(elements.window.x + elements.window.width / 2) * scale}
        y={(elements.window.y + 22) * scale}
        textAnchor="middle"
        fill="#bfdbfe"
        fontSize="11"
        fontWeight="600"
      >
        Floor-to-Ceiling Window
      </text>

      {/* Light rays */}
      {[0, 1, 2, 3, 4].map((i) => (
        <g key={i} transform={`translate(${(elements.window.x + 20 + i * 28) * scale}, ${(elements.window.y + 40) * scale})`} opacity="0.6">
          <path
            d="M 0 0 L -6 20 L 6 20 Z"
            fill="rgba(253,224,71,0.2)"
          />
          <path
            d="M 0 0 L 0 18 M -3 14 L 0 18 L 3 14"
            fill="none"
            stroke="#fcd34d"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </g>
      ))}
      <text
        x={(elements.window.x + elements.window.width / 2) * scale}
        y={(elements.window.y + 68) * scale}
        textAnchor="middle"
        fill="#fcd34d"
        fontSize="10"
        fontWeight="500"
        opacity="0.8"
      >
        Natural Light
      </text>

      {/* Dividing Wall */}
      <rect
        x={elements.dividingWall.x * scale}
        y={elements.dividingWall.y * scale}
        width={elements.dividingWall.width * scale}
        height={elements.dividingWall.height * scale}
        fill="url(#wallGrad)"
        stroke="#94a3b8"
        strokeWidth="3"
        rx="2"
      />
      <rect
        x={(elements.dividingWall.x + 2) * scale}
        y={(elements.dividingWall.y + 1) * scale}
        width={(elements.dividingWall.width - 4) * scale}
        height="2"
        fill="rgba(255,255,255,0.15)"
      />
      <text
        x={(elements.dividingWall.x + elements.dividingWall.width / 2) * scale}
        y={(elements.dividingWall.y - 10) * scale}
        textAnchor="middle"
        fill="#cbd5e1"
        fontSize="10"
        fontWeight="600"
      >
        Dividing Wall
      </text>

      {/* Doorway */}
      <rect
        x={elements.dividingDoorway.x * scale}
        y={elements.dividingDoorway.y * scale}
        width={elements.dividingDoorway.width * scale}
        height={elements.dividingDoorway.height * scale}
        fill="#1e293b"
        stroke="#475569"
        strokeWidth="1.5"
        strokeDasharray="6,3"
      />
      <text
        x={(elements.dividingDoorway.x + elements.dividingDoorway.width / 2) * scale}
        y={(elements.dividingDoorway.y + 20) * scale}
        textAnchor="middle"
        fill="#94a3b8"
        fontSize="9"
        fontWeight="500"
      >
        Doorway
      </text>

      {/* Bathroom */}
      <rect
        x={elements.bathroom.x * scale}
        y={elements.bathroom.y * scale}
        width={elements.bathroom.width * scale}
        height={elements.bathroom.height * scale}
        fill="#1e293b"
        stroke="#475569"
        strokeWidth="2"
        rx="4"
      />
      <text
        x={(elements.bathroom.x + elements.bathroom.width / 2) * scale}
        y={(elements.bathroom.y + elements.bathroom.height / 2) * scale}
        textAnchor="middle"
        dominantBaseline="middle"
        fill="#64748b"
        fontSize="11"
        fontWeight="500"
      >
        Bathroom
      </text>

      {/* W/D */}
      <rect
        x={elements.washerDryer.x * scale}
        y={elements.washerDryer.y * scale}
        width={elements.washerDryer.width * scale}
        height={elements.washerDryer.height * scale}
        fill="url(#applianceGrad)"
        stroke="#9ca3af"
        strokeWidth="1.5"
        rx="3"
      />
      <circle
        cx={(elements.washerDryer.x + elements.washerDryer.width / 2) * scale}
        cy={(elements.washerDryer.y + elements.washerDryer.height / 2) * scale}
        r="8"
        fill="#374151"
        stroke="#4b5563"
      />
      <text
        x={(elements.washerDryer.x + elements.washerDryer.width / 2) * scale}
        y={(elements.washerDryer.y + elements.washerDryer.height + 12) * scale}
        textAnchor="middle"
        fill="#94a3b8"
        fontSize="9"
        fontWeight="500"
      >
        W/D
      </text>

      {/* Walk-in Closet */}
      <rect
        x={elements.walkInCloset.x * scale}
        y={elements.walkInCloset.y * scale}
        width={elements.walkInCloset.width * scale}
        height={elements.walkInCloset.height * scale}
        fill="#1e293b"
        stroke="#475569"
        strokeWidth="2"
        rx="4"
      />
      <text
        x={(elements.walkInCloset.x + elements.walkInCloset.width / 2) * scale}
        y={(elements.walkInCloset.y + elements.walkInCloset.height / 2 - 6) * scale}
        textAnchor="middle"
        fill="#64748b"
        fontSize="9"
        fontWeight="500"
      >
        Walk-in
      </text>
      <text
        x={(elements.walkInCloset.x + elements.walkInCloset.width / 2) * scale}
        y={(elements.walkInCloset.y + elements.walkInCloset.height / 2 + 6) * scale}
        textAnchor="middle"
        fill="#64748b"
        fontSize="9"
        fontWeight="500"
      >
        Closet
      </text>

      {/* Entry Door */}
      <rect
        x={elements.entryDoor.x * scale}
        y={elements.entryDoor.y * scale}
        width={elements.entryDoor.width * scale}
        height={elements.entryDoor.height * scale}
        fill="#78716c"
        stroke="#a8a29e"
        strokeWidth="3"
        rx="2"
      />
      <path
        d={`M ${(elements.entryDoor.x + elements.entryDoor.width) * scale} ${elements.entryDoor.y * scale}
            A ${elements.entryDoor.swingRadius * scale} ${elements.entryDoor.swingRadius * scale}
            0 0 1
            ${(elements.entryDoor.x + elements.entryDoor.width + elements.entryDoor.swingRadius * 0.7) * scale} ${(elements.entryDoor.y - elements.entryDoor.swingRadius * 0.7) * scale}`}
        fill="none"
        stroke="#a8a29e"
        strokeWidth="2"
        strokeDasharray="6,4"
        opacity="0.6"
      />
      <text
        x={(elements.entryDoor.x + elements.entryDoor.width / 2) * scale}
        y={(elements.entryDoor.y + 18) * scale}
        textAnchor="middle"
        fill="#d6d3d1"
        fontSize="11"
        fontWeight="600"
      >
        Entry
      </text>

      {/* Storage shelf */}
      <rect
        x={elements.storageShelf1.x * scale}
        y={elements.storageShelf1.y * scale}
        width={elements.storageShelf1.width * scale}
        height={elements.storageShelf1.height * scale}
        fill="#374151"
        stroke="#4b5563"
        strokeWidth="1.5"
        rx="2"
      />
      <text
        x={(elements.storageShelf1.x + elements.storageShelf1.width / 2) * scale}
        y={(elements.storageShelf1.y + elements.storageShelf1.height / 2 + 2) * scale}
        textAnchor="middle"
        fill="#9ca3af"
        fontSize="10"
        fontWeight="600"
      >
        S
      </text>

      {/* TV Corner marker */}
      <circle
        cx={elements.tvCorner.x * scale}
        cy={elements.tvCorner.y * scale}
        r="14"
        fill="rgba(239,68,68,0.2)"
        stroke="#ef4444"
        strokeWidth="3"
      />
      <circle
        cx={elements.tvCorner.x * scale}
        cy={elements.tvCorner.y * scale}
        r="5"
        fill="#ef4444"
      />
      <text
        x={(elements.tvCorner.x + 20) * scale}
        y={elements.tvCorner.y * scale + 4}
        fill="#fca5a5"
        fontSize="11"
        fontWeight="600"
      >
        TV Wall
      </text>

      {/* Room labels */}
      <text
        x={125 * scale}
        y={85 * scale}
        textAnchor="middle"
        fill="#475569"
        fontSize="16"
        fontWeight="700"
        letterSpacing="2"
        opacity="0.5"
      >
        LIVING / KITCHEN
      </text>
      <text
        x={125 * scale}
        y={102 * scale}
        textAnchor="middle"
        fill="#475569"
        fontSize="11"
        fontWeight="500"
        opacity="0.4"
      >
        17'4" x 13'0"
      </text>

      <text
        x={168 * scale}
        y={205 * scale}
        textAnchor="middle"
        fill="#475569"
        fontSize="14"
        fontWeight="700"
        letterSpacing="1"
        opacity="0.5"
      >
        BEDROOM
      </text>
      <text
        x={168 * scale}
        y={220 * scale}
        textAnchor="middle"
        fill="#475569"
        fontSize="10"
        fontWeight="500"
        opacity="0.4"
      >
        8'0" x 9'10"
      </text>
    </g>
  );
}
