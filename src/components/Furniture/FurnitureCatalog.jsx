// Furniture catalog panel - enhanced styling

import { FURNITURE_CATALOG } from '../../data/furniturePresets';

const categoryConfig = {
  seating: {
    label: 'Seating',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
    color: 'amber'
  },
  work: {
    label: 'Work',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    color: 'blue'
  },
  entertainment: {
    label: 'Entertainment',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    color: 'purple'
  },
  living: {
    label: 'Living',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
    color: 'emerald'
  },
  lighting: {
    label: 'Lighting',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    color: 'yellow'
  },
  bedroom: {
    label: 'Bedroom',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    ),
    color: 'indigo'
  },
};

const colorClasses = {
  amber: { bg: 'bg-amber-500/10', border: 'border-amber-500/30', text: 'text-amber-400' },
  blue: { bg: 'bg-blue-500/10', border: 'border-blue-500/30', text: 'text-blue-400' },
  purple: { bg: 'bg-purple-500/10', border: 'border-purple-500/30', text: 'text-purple-400' },
  emerald: { bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', text: 'text-emerald-400' },
  yellow: { bg: 'bg-yellow-500/10', border: 'border-yellow-500/30', text: 'text-yellow-400' },
  indigo: { bg: 'bg-indigo-500/10', border: 'border-indigo-500/30', text: 'text-indigo-400' },
};

export default function FurnitureCatalog({ onAddFurniture }) {
  const groupedFurniture = Object.values(FURNITURE_CATALOG).reduce((acc, item) => {
    const cat = item.category || 'other';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(item);
    return acc;
  }, {});

  const handleAdd = (item) => {
    const instanceId = `${item.id}-${Date.now()}`;
    onAddFurniture({
      ...item,
      instanceId,
      x: 80,
      y: 80,
      rotation: 0,
    });
  };

  // Get gradient style for furniture preview
  const getGradientStyle = (id) => {
    if (id === 'couch') return 'linear-gradient(135deg, #b45309, #78350f)';
    if (id === 'desk') return 'linear-gradient(135deg, #4b5563, #1f2937)';
    if (id === 'officeChair') return 'linear-gradient(135deg, #374151, #111827)';
    if (id === 'tv') return 'linear-gradient(135deg, #1e293b, #0f172a)';
    if (id === 'airMattress' || id === 'queenBed') return 'linear-gradient(135deg, #f3f4f6, #d1d5db)';
    if (id.includes('Table') || id === 'nightstand') return 'linear-gradient(135deg, #6d4c41, #4e342e)';
    if (id === 'tableLamp') return 'linear-gradient(135deg, #fef9c3, #fde68a)';
    if (id === 'stool') return 'linear-gradient(135deg, #d97706, #92400e)';
    return '#6b7280';
  };

  return (
    <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-5 shadow-xl border border-slate-700/50 max-h-[420px] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-slate-800">
      <h3 className="text-white font-bold mb-4 flex items-center gap-2 text-lg sticky top-0 bg-gradient-to-r from-slate-800 to-slate-900 pb-2 -mt-1 pt-1">
        <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
        Add Furniture
      </h3>

      {Object.entries(categoryConfig).map(([catKey, catConfig]) => {
        const items = groupedFurniture[catKey];
        if (!items || items.length === 0) return null;
        const colors = colorClasses[catConfig.color];

        return (
          <div key={catKey} className="mb-4">
            <h4 className={`text-xs font-semibold mb-2 flex items-center gap-2 ${colors.text} uppercase tracking-wider`}>
              {catConfig.icon}
              {catConfig.label}
            </h4>
            <div className="space-y-1.5">
              {items.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleAdd(item)}
                  className={`w-full flex items-center gap-3 p-2.5 rounded-lg ${colors.bg} border ${colors.border} hover:border-opacity-60 transition-all text-left group hover:scale-[1.02] active:scale-[0.98]`}
                >
                  <div
                    className="w-10 h-7 rounded-md shadow-inner flex-shrink-0"
                    style={{ background: getGradientStyle(item.id) }}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="text-white text-sm font-medium truncate">
                      {item.name.split('(')[0].trim()}
                    </div>
                    <div className="text-slate-400 text-xs">
                      {item.width}" × {item.depth}" × {item.height}"h
                    </div>
                  </div>
                  <div className="w-7 h-7 rounded-lg bg-slate-700/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </div>
                </button>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
