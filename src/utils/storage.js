// LocalStorage utilities for saving and loading layouts

const STORAGE_KEY = 'earl-room-planner-layouts';
const CURRENT_LAYOUT_KEY = 'earl-room-planner-current';

/**
 * Save a layout to localStorage
 */
export function saveLayout(name, furniture) {
  const layouts = getAllLayouts();
  layouts[name] = {
    name,
    furniture,
    savedAt: new Date().toISOString(),
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(layouts));
}

/**
 * Get all saved layouts
 */
export function getAllLayouts() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : {};
  } catch (e) {
    console.error('Error loading layouts:', e);
    return {};
  }
}

/**
 * Load a specific layout by name
 */
export function loadLayout(name) {
  const layouts = getAllLayouts();
  return layouts[name] || null;
}

/**
 * Delete a saved layout
 */
export function deleteLayout(name) {
  const layouts = getAllLayouts();
  delete layouts[name];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(layouts));
}

/**
 * Save current working layout (auto-save)
 */
export function saveCurrentLayout(furniture) {
  localStorage.setItem(CURRENT_LAYOUT_KEY, JSON.stringify(furniture));
}

/**
 * Load current working layout
 */
export function loadCurrentLayout() {
  try {
    const data = localStorage.getItem(CURRENT_LAYOUT_KEY);
    return data ? JSON.parse(data) : null;
  } catch (e) {
    console.error('Error loading current layout:', e);
    return null;
  }
}

/**
 * Export layout as JSON file
 */
export function exportLayoutAsJson(name, furniture) {
  const data = {
    name,
    furniture,
    exportedAt: new Date().toISOString(),
    version: '1.0',
  };

  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: 'application/json',
  });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = `${name.replace(/\s+/g, '-').toLowerCase()}-layout.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * Import layout from JSON file
 */
export function importLayoutFromJson(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        if (data.furniture && Array.isArray(data.furniture)) {
          resolve(data);
        } else {
          reject(new Error('Invalid layout file format'));
        }
      } catch (err) {
        reject(new Error('Failed to parse layout file'));
      }
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsText(file);
  });
}

export default {
  saveLayout,
  getAllLayouts,
  loadLayout,
  deleteLayout,
  saveCurrentLayout,
  loadCurrentLayout,
  exportLayoutAsJson,
  importLayoutFromJson,
};
