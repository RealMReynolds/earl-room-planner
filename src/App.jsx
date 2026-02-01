import { useState, useEffect, useCallback } from 'react';
import RoomCanvas from './components/Room/RoomCanvas';
import Toolbar from './components/UI/Toolbar';
import SaveLoadPanel from './components/UI/SaveLoadPanel';
import FurnitureCatalog from './components/Furniture/FurnitureCatalog';
import { DEFAULT_FURNITURE } from './data/furniturePresets';
import { saveCurrentLayout, loadCurrentLayout } from './utils/storage';

function App() {
  const [furniture, setFurniture] = useState(() => {
    const saved = loadCurrentLayout();
    return saved || DEFAULT_FURNITURE;
  });

  const [selectedId, setSelectedId] = useState(null);

  const [showZones, setShowZones] = useState(true);
  const [showTrafficPaths, setShowTrafficPaths] = useState(true);
  const [showDimensions, setShowDimensions] = useState(false);
  const [gridSnap, setGridSnap] = useState(true);

  useEffect(() => {
    saveCurrentLayout(furniture);
  }, [furniture]);

  const selectedFurniture = furniture.find((f) => f.instanceId === selectedId);

  const handleRotate = useCallback(
    (degrees) => {
      if (!selectedId) return;
      setFurniture((prev) =>
        prev.map((item) =>
          item.instanceId === selectedId
            ? { ...item, rotation: ((item.rotation || 0) + degrees + 360) % 360 }
            : item
        )
      );
    },
    [selectedId]
  );

  const handleDelete = useCallback(() => {
    if (!selectedId) return;
    setFurniture((prev) => prev.filter((item) => item.instanceId !== selectedId));
    setSelectedId(null);
  }, [selectedId]);

  const handleAddFurniture = useCallback((newItem) => {
    setFurniture((prev) => [...prev, newItem]);
    setSelectedId(newItem.instanceId);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selectedId) return;

      switch (e.key) {
        case 'Delete':
        case 'Backspace':
          if (document.activeElement.tagName !== 'INPUT') {
            handleDelete();
          }
          break;
        case 'r':
        case 'R':
          if (document.activeElement.tagName !== 'INPUT') {
            handleRotate(e.shiftKey ? -90 : 90);
          }
          break;
        case 'Escape':
          setSelectedId(null);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedId, handleDelete, handleRotate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Header */}
      <header className="border-b border-slate-700/50 bg-slate-900/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-[1800px] mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent flex items-center gap-3">
                <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                The Earl - Room Layout Planner
              </h1>
              <p className="text-slate-400 text-sm mt-1 flex items-center gap-4">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  Unit S-01 (1JR-03)
                </span>
                <span className="text-slate-600">|</span>
                <span>Living: 17'4" × 13'0"</span>
                <span className="text-slate-600">|</span>
                <span>Bedroom: 8'0" × 9'10"</span>
              </p>
            </div>
            <div className="hidden md:flex items-center gap-2 text-xs text-slate-500 bg-slate-800/50 px-4 py-2 rounded-lg border border-slate-700/50">
              <kbd className="px-2 py-1 bg-slate-700 rounded text-slate-300 font-mono">R</kbd>
              <span>Rotate</span>
              <span className="text-slate-600 mx-2">|</span>
              <kbd className="px-2 py-1 bg-slate-700 rounded text-slate-300 font-mono">Del</kbd>
              <span>Remove</span>
              <span className="text-slate-600 mx-2">|</span>
              <kbd className="px-2 py-1 bg-slate-700 rounded text-slate-300 font-mono">Esc</kbd>
              <span>Deselect</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-[1800px] mx-auto p-6">
        <div className="flex gap-6 flex-wrap xl:flex-nowrap">
          {/* Canvas area */}
          <div className="flex-1 min-w-0 overflow-x-auto">
            <div className="inline-block">
              <RoomCanvas
                furniture={furniture}
                setFurniture={setFurniture}
                selectedId={selectedId}
                setSelectedId={setSelectedId}
                showZones={showZones}
                showTrafficPaths={showTrafficPaths}
                showDimensions={showDimensions}
                gridSnap={gridSnap}
              />
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-full xl:w-80 space-y-5 flex-shrink-0">
            <Toolbar
              selectedFurniture={selectedFurniture}
              onRotate={handleRotate}
              onDelete={handleDelete}
              showZones={showZones}
              setShowZones={setShowZones}
              showTrafficPaths={showTrafficPaths}
              setShowTrafficPaths={setShowTrafficPaths}
              showDimensions={showDimensions}
              setShowDimensions={setShowDimensions}
              gridSnap={gridSnap}
              setGridSnap={setGridSnap}
            />

            <FurnitureCatalog onAddFurniture={handleAddFurniture} />

            <SaveLoadPanel
              furniture={furniture}
              setFurniture={setFurniture}
              setSelectedId={setSelectedId}
            />
          </div>
        </div>

        {/* Couch deadline banner */}
        <div className="mt-8 p-5 bg-gradient-to-r from-amber-900/30 to-orange-900/30 border border-amber-600/30 rounded-xl flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center flex-shrink-0">
            <svg className="w-6 h-6 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <p className="text-amber-300 font-semibold flex items-center gap-2">
              Priority: Couch placement before NIN concert
              <span className="text-xs bg-amber-500/20 px-2 py-0.5 rounded-full text-amber-200">Feb 11</span>
            </p>
            <p className="text-amber-200/60 text-sm mt-0.5">
              Poly & Bark Napa 72" (72" × 36") - Cognac Leather
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 mt-8 py-4">
        <div className="max-w-[1800px] mx-auto px-6 text-center text-slate-500 text-sm">
          Built for The Earl, Clarendon, Arlington VA
        </div>
      </footer>
    </div>
  );
}

export default App;
