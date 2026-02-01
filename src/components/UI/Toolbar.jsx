// Toolbar with controls - enhanced styling

export default function Toolbar({
  selectedFurniture,
  onRotate,
  onDelete,
  showZones,
  setShowZones,
  showTrafficPaths,
  setShowTrafficPaths,
  showDimensions,
  setShowDimensions,
  gridSnap,
  setGridSnap,
}) {
  return (
    <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-5 shadow-xl border border-slate-700/50">
      <h3 className="text-white font-bold mb-4 flex items-center gap-2 text-lg">
        <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        Controls
      </h3>

      {/* Selected furniture controls */}
      {selectedFurniture ? (
        <div className="mb-5 p-4 bg-gradient-to-br from-blue-900/30 to-slate-800 rounded-xl border border-blue-500/30">
          <div className="flex items-center gap-3 mb-3">
            <div
              className="w-10 h-8 rounded-lg shadow-inner"
              style={{
                background: selectedFurniture.id === 'couch' ? 'linear-gradient(135deg, #b45309, #78350f)' :
                  selectedFurniture.id === 'tv' ? 'linear-gradient(135deg, #1e293b, #0f172a)' :
                  selectedFurniture.id === 'desk' ? 'linear-gradient(135deg, #4b5563, #1f2937)' :
                  '#374151'
              }}
            />
            <div>
              <div className="text-white font-semibold text-sm">
                {selectedFurniture.name.split('(')[0].trim()}
              </div>
              <div className="text-blue-300 text-xs">
                {selectedFurniture.width}" × {selectedFurniture.depth}"
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 mb-3 text-xs text-slate-400">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Rotation: <span className="text-white font-medium">{selectedFurniture.rotation || 0}°</span>
          </div>

          <div className="flex gap-2 mb-3">
            <button
              onClick={() => onRotate(-90)}
              className="flex-1 px-3 py-2.5 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-sm font-medium transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-1"
              title="Rotate counter-clockwise"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
              </svg>
              -90°
            </button>
            <button
              onClick={() => onRotate(90)}
              className="flex-1 px-3 py-2.5 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-sm font-medium transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-1"
              title="Rotate clockwise"
            >
              +90°
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 10h-10a8 8 0 00-8 8v2M21 10l-6 6m6-6l-6-6" />
              </svg>
            </button>
          </div>

          <button
            onClick={onDelete}
            className="w-full px-3 py-2.5 bg-red-600/80 hover:bg-red-500 text-white rounded-lg text-sm font-medium transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Remove
          </button>
        </div>
      ) : (
        <div className="mb-5 p-4 bg-slate-800/50 rounded-xl border border-slate-700/50 text-center">
          <svg className="w-8 h-8 mx-auto mb-2 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
          </svg>
          <div className="text-slate-400 text-sm">Click any furniture to select it</div>
        </div>
      )}

      {/* View toggles */}
      <div className="space-y-2">
        <Toggle
          checked={showZones}
          onChange={setShowZones}
          color="blue"
          label="Show Zones"
          description="Living, kitchen, bedroom areas"
        />
        <Toggle
          checked={showTrafficPaths}
          onChange={setShowTrafficPaths}
          color="green"
          label="Traffic Paths"
          description="Walking routes through space"
        />
        <Toggle
          checked={showDimensions}
          onChange={setShowDimensions}
          color="amber"
          label="Dimensions"
          description="Show all measurements"
        />
        <Toggle
          checked={gridSnap}
          onChange={setGridSnap}
          color="purple"
          label="Grid Snap"
          description='Align to 6" grid'
        />
      </div>

      {/* Legend */}
      <div className="mt-5 pt-4 border-t border-slate-700/50">
        <h4 className="text-slate-500 text-xs font-semibold mb-3 uppercase tracking-wider">Status Legend</h4>
        <div className="grid grid-cols-3 gap-2 text-xs">
          <div className="flex flex-col items-center gap-1 p-2 rounded-lg bg-slate-800/50">
            <div className="w-4 h-4 rounded-full bg-gradient-to-br from-red-400 to-red-600 shadow-lg shadow-red-500/30"></div>
            <span className="text-slate-400">Collision</span>
          </div>
          <div className="flex flex-col items-center gap-1 p-2 rounded-lg bg-slate-800/50">
            <div className="w-4 h-4 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 shadow-lg shadow-amber-500/30"></div>
            <span className="text-slate-400">Blocks</span>
          </div>
          <div className="flex flex-col items-center gap-1 p-2 rounded-lg bg-slate-800/50">
            <div className="w-4 h-4 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 shadow-lg shadow-blue-500/30"></div>
            <span className="text-slate-400">Selected</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Custom toggle component
function Toggle({ checked, onChange, color, label, description }) {
  const colorClasses = {
    blue: 'bg-blue-500',
    green: 'bg-emerald-500',
    amber: 'bg-amber-500',
    purple: 'bg-purple-500',
  };

  return (
    <label className="flex items-center gap-3 p-2.5 rounded-lg cursor-pointer hover:bg-slate-800/50 transition-colors group">
      <div className="relative">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="sr-only"
        />
        <div className={`w-10 h-6 rounded-full transition-colors ${checked ? colorClasses[color] : 'bg-slate-700'}`}>
          <div className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white shadow-md transition-transform ${checked ? 'translate-x-4' : ''}`} />
        </div>
      </div>
      <div className="flex-1">
        <div className="text-white text-sm font-medium">{label}</div>
        <div className="text-slate-500 text-xs">{description}</div>
      </div>
    </label>
  );
}
