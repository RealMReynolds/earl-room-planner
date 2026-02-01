// Save/Load panel - enhanced styling

import { useState, useRef } from 'react';
import {
  saveLayout,
  getAllLayouts,
  deleteLayout,
  exportLayoutAsJson,
  importLayoutFromJson,
} from '../../utils/storage';
import { LAYOUT_PRESETS } from '../../data/furniturePresets';

export default function SaveLoadPanel({ furniture, setFurniture, setSelectedId }) {
  const [savedLayouts, setSavedLayouts] = useState(() => getAllLayouts());
  const [saveName, setSaveName] = useState('');
  const [showSaveInput, setShowSaveInput] = useState(false);
  const fileInputRef = useRef(null);

  const handleSave = () => {
    if (!saveName.trim()) return;
    saveLayout(saveName.trim(), furniture);
    setSavedLayouts(getAllLayouts());
    setSaveName('');
    setShowSaveInput(false);
  };

  const handleLoad = (layout) => {
    setFurniture(layout.furniture);
    setSelectedId(null);
  };

  const handleDelete = (name) => {
    if (confirm(`Delete layout "${name}"?`)) {
      deleteLayout(name);
      setSavedLayouts(getAllLayouts());
    }
  };

  const handleExport = () => {
    const name = saveName.trim() || `earl-layout-${new Date().toISOString().slice(0, 10)}`;
    exportLayoutAsJson(name, furniture);
  };

  const handleImport = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const data = await importLayoutFromJson(file);
      setFurniture(data.furniture);
      setSelectedId(null);
    } catch (err) {
      alert(err.message);
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleLoadPreset = (presetKey) => {
    const preset = LAYOUT_PRESETS[presetKey];
    if (preset) {
      setFurniture(preset.furniture);
      setSelectedId(null);
    }
  };

  return (
    <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-5 shadow-xl border border-slate-700/50">
      <h3 className="text-white font-bold mb-4 flex items-center gap-2 text-lg">
        <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
        </svg>
        Layouts
      </h3>

      {/* Save controls */}
      {showSaveInput ? (
        <div className="mb-5 flex gap-2">
          <input
            type="text"
            value={saveName}
            onChange={(e) => setSaveName(e.target.value)}
            placeholder="Layout name..."
            className="flex-1 px-3 py-2.5 bg-slate-700/50 border border-slate-600 rounded-lg text-white text-sm placeholder-slate-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
            onKeyDown={(e) => e.key === 'Enter' && handleSave()}
            autoFocus
          />
          <button
            onClick={handleSave}
            className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-sm font-medium transition-all hover:scale-105 active:scale-95"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </button>
          <button
            onClick={() => setShowSaveInput(false)}
            className="px-3 py-2.5 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-sm transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      ) : (
        <button
          onClick={() => setShowSaveInput(true)}
          className="w-full mb-5 px-4 py-3 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white rounded-lg text-sm font-medium transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
          </svg>
          Save Current Layout
        </button>
      )}

      {/* Preset layouts */}
      <div className="mb-5">
        <h4 className="text-slate-500 text-xs font-semibold mb-3 uppercase tracking-wider flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
          </svg>
          Layout Presets
        </h4>
        <div className="space-y-2">
          {Object.entries(LAYOUT_PRESETS).map(([key, preset]) => (
            <button
              key={key}
              onClick={() => handleLoadPreset(key)}
              className="w-full text-left p-3 rounded-lg bg-slate-800/50 border border-slate-700/50 hover:border-purple-500/30 hover:bg-purple-900/20 transition-all group"
            >
              <div className="flex items-center justify-between">
                <div className="text-white text-sm font-medium group-hover:text-purple-300 transition-colors">
                  {preset.name}
                </div>
                <svg className="w-4 h-4 text-slate-500 group-hover:text-purple-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
              <div className="text-slate-500 text-xs mt-1">{preset.description}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Saved layouts */}
      {Object.keys(savedLayouts).length > 0 && (
        <div className="mb-5">
          <h4 className="text-slate-500 text-xs font-semibold mb-3 uppercase tracking-wider flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
            </svg>
            Your Saved Layouts
          </h4>
          <div className="space-y-1.5">
            {Object.entries(savedLayouts).map(([name, layout]) => (
              <div
                key={name}
                className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-800/50 hover:bg-slate-700/50 transition-colors group"
              >
                <button
                  onClick={() => handleLoad(layout)}
                  className="flex-1 text-left text-white text-sm truncate hover:text-purple-300 transition-colors"
                >
                  {name}
                </button>
                <button
                  onClick={() => handleDelete(name)}
                  className="w-7 h-7 rounded-md flex items-center justify-center text-red-400 opacity-0 group-hover:opacity-100 hover:bg-red-500/20 transition-all"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Import/Export */}
      <div className="pt-4 border-t border-slate-700/50 grid grid-cols-2 gap-2">
        <button
          onClick={handleExport}
          className="px-3 py-2.5 bg-slate-700/50 hover:bg-slate-600/50 text-white rounded-lg text-sm transition-colors flex items-center justify-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
          </svg>
          Export
        </button>
        <button
          onClick={() => fileInputRef.current?.click()}
          className="px-3 py-2.5 bg-slate-700/50 hover:bg-slate-600/50 text-white rounded-lg text-sm transition-colors flex items-center justify-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Import
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept=".json"
          onChange={handleImport}
          className="hidden"
        />
      </div>
    </div>
  );
}
