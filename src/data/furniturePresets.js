// Furniture presets with dimensions in inches
// All furniture can be placed and rotated
// Room orientation: Top = Window, Left = Kitchen, Bottom = Entry

import { ROOM } from './roomDimensions';

export const FURNITURE_CATALOG = {
  // Current furniture
  couch: {
    id: 'couch',
    name: 'Couch (Poly & Bark Napa 72")',
    width: 72,
    depth: 36,
    height: 34,
    color: '#8B4513', // Cognac brown leather
    category: 'seating',
    priority: true, // Needs to be placed first
  },
  desk: {
    id: 'desk',
    name: 'Desk',
    width: 48,
    depth: 24,
    height: 30,
    color: '#4A4A4A', // Gray
    category: 'work',
  },
  officeChair: {
    id: 'officeChair',
    name: 'Office Chair',
    width: 26,
    depth: 26,
    height: 42,
    color: '#2D2D2D', // Dark gray/black
    category: 'work',
    isCircle: true, // Render as circle
  },
  tv: {
    id: 'tv',
    name: 'TV (55" Wall Mounted)',
    width: 50,
    depth: 4,
    height: 30,
    color: '#1a1a1a', // Black
    category: 'entertainment',
  },
  coffeeTable: {
    id: 'coffeeTable',
    name: 'Coffee Table',
    width: 48,
    depth: 24,
    height: 18,
    color: '#5D4E37', // Wood brown
    category: 'living',
  },
  sideTable: {
    id: 'sideTable',
    name: 'Side Table',
    width: 18,
    depth: 18,
    height: 24,
    color: '#6B5B4F', // Wood
    category: 'living',
  },
  tableLamp: {
    id: 'tableLamp',
    name: 'Table Lamp',
    width: 10,
    depth: 10,
    height: 24,
    color: '#E8E0D5', // White ceramic
    category: 'lighting',
    isCircle: true,
  },
  stool: {
    id: 'stool',
    name: 'Small Stool',
    width: 14,
    depth: 14,
    height: 18,
    color: '#D4AF37', // Gold/brass
    category: 'seating',
  },

  // Bedroom furniture
  queenBed: {
    id: 'queenBed',
    name: 'Queen Bed (Future)',
    width: 60,
    depth: 80,
    height: 24,
    color: '#E8E0D5', // White bedding
    category: 'bedroom',
  },
  nightstand: {
    id: 'nightstand',
    name: 'Nightstand',
    width: 20,
    depth: 18,
    height: 24,
    color: '#5D4E37',
    category: 'bedroom',
  },
  airMattress: {
    id: 'airMattress',
    name: 'Air Mattress (Current)',
    width: 60,
    depth: 80,
    height: 8,
    color: '#F5F5F5',
    category: 'bedroom',
  },

  // Future PC setup
  pcTower: {
    id: 'pcTower',
    name: 'PC Tower',
    width: 8,
    depth: 18,
    height: 20,
    color: '#1a1a1a',
    category: 'work',
  },
  dualMonitors: {
    id: 'dualMonitors',
    name: 'Dual Monitors',
    width: 48,
    depth: 8,
    height: 18,
    color: '#2D2D2D',
    category: 'work',
  },
};

// Default furniture placements (current setup from photos)
// Positioned in LIVING area (top portion) and BEDROOM (bottom portion)
export const DEFAULT_FURNITURE = [
  {
    ...FURNITURE_CATALOG.desk,
    instanceId: 'desk-1',
    x: 100, // Currently blocking kitchen area
    y: 60,
    rotation: 0,
  },
  {
    ...FURNITURE_CATALOG.officeChair,
    instanceId: 'chair-1',
    x: 110,
    y: 90,
    rotation: 0,
  },
  {
    ...FURNITURE_CATALOG.tv,
    instanceId: 'tv-1',
    x: 35, // On TV wall (where kitchen meets main space)
    y: 130,
    rotation: 0,
  },
  {
    ...FURNITURE_CATALOG.airMattress,
    instanceId: 'bed-1',
    x: 120, // In bedroom area (below dividing wall)
    y: ROOM.livingDepth + 20,
    rotation: 0,
  },
];

// Layout presets to compare - positioned relative to room
export const LAYOUT_PRESETS = {
  layoutA: {
    name: 'Layout A: Couch Facing TV',
    description: 'Couch centered, facing TV wall',
    furniture: [
      {
        ...FURNITURE_CATALOG.couch,
        instanceId: 'couch-1',
        x: 70, // Center of living area
        y: 80, // Mid-room
        rotation: 0, // Facing TV wall (left)
      },
      {
        ...FURNITURE_CATALOG.tv,
        instanceId: 'tv-1',
        x: 35,
        y: 80,
        rotation: 0,
      },
      {
        ...FURNITURE_CATALOG.coffeeTable,
        instanceId: 'coffee-1',
        x: 75,
        y: 60,
        rotation: 0,
      },
      {
        ...FURNITURE_CATALOG.desk,
        instanceId: 'desk-1',
        x: 150, // Near window, right side
        y: 30,
        rotation: 0,
      },
      {
        ...FURNITURE_CATALOG.officeChair,
        instanceId: 'chair-1',
        x: 160,
        y: 60,
        rotation: 0,
      },
      {
        ...FURNITURE_CATALOG.airMattress,
        instanceId: 'bed-1',
        x: 120,
        y: ROOM.livingDepth + 20,
        rotation: 0,
      },
    ],
  },
  layoutB: {
    name: 'Layout B: Couch Near Window',
    description: 'Couch against window wall, faces TV',
    furniture: [
      {
        ...FURNITURE_CATALOG.couch,
        instanceId: 'couch-1',
        x: 100, // Closer to window
        y: 15, // Near window wall (top)
        rotation: 180, // Facing into room
      },
      {
        ...FURNITURE_CATALOG.tv,
        instanceId: 'tv-1',
        x: 35,
        y: 100,
        rotation: 0,
      },
      {
        ...FURNITURE_CATALOG.coffeeTable,
        instanceId: 'coffee-1',
        x: 100,
        y: 60,
        rotation: 0,
      },
      {
        ...FURNITURE_CATALOG.desk,
        instanceId: 'desk-1',
        x: 100,
        y: 110, // Near dividing wall
        rotation: 0,
      },
      {
        ...FURNITURE_CATALOG.officeChair,
        instanceId: 'chair-1',
        x: 110,
        y: 140,
        rotation: 0,
      },
      {
        ...FURNITURE_CATALOG.airMattress,
        instanceId: 'bed-1',
        x: 120,
        y: ROOM.livingDepth + 20,
        rotation: 0,
      },
    ],
  },
  layoutC: {
    name: 'Layout C: Couch as Divider',
    description: 'Couch separates living from entry path',
    furniture: [
      {
        ...FURNITURE_CATALOG.couch,
        instanceId: 'couch-1',
        x: 60,
        y: 100,
        rotation: 90, // Perpendicular, back toward entry
      },
      {
        ...FURNITURE_CATALOG.tv,
        instanceId: 'tv-1',
        x: 35,
        y: 70,
        rotation: 0,
      },
      {
        ...FURNITURE_CATALOG.coffeeTable,
        instanceId: 'coffee-1',
        x: 50,
        y: 80,
        rotation: 90,
      },
      {
        ...FURNITURE_CATALOG.desk,
        instanceId: 'desk-1',
        x: 150,
        y: 20,
        rotation: 0,
      },
      {
        ...FURNITURE_CATALOG.officeChair,
        instanceId: 'chair-1',
        x: 160,
        y: 50,
        rotation: 0,
      },
      {
        ...FURNITURE_CATALOG.airMattress,
        instanceId: 'bed-1',
        x: 120,
        y: ROOM.livingDepth + 20,
        rotation: 0,
      },
    ],
  },
  layoutD: {
    name: 'Layout D: TV Viewing Focus',
    description: 'Optimized 94" viewing distance',
    furniture: [
      {
        ...FURNITURE_CATALOG.couch,
        instanceId: 'couch-1',
        x: 90, // 94" from TV wall
        y: 75,
        rotation: 0,
      },
      {
        ...FURNITURE_CATALOG.tv,
        instanceId: 'tv-1',
        x: 35,
        y: 75, // Aligned with couch center
        rotation: 0,
      },
      {
        ...FURNITURE_CATALOG.coffeeTable,
        instanceId: 'coffee-1',
        x: 75,
        y: 60,
        rotation: 0,
      },
      {
        ...FURNITURE_CATALOG.sideTable,
        instanceId: 'side-1',
        x: 165, // End of couch
        y: 80,
        rotation: 0,
      },
      {
        ...FURNITURE_CATALOG.tableLamp,
        instanceId: 'lamp-1',
        x: 168,
        y: 84,
        rotation: 0,
      },
      {
        ...FURNITURE_CATALOG.desk,
        instanceId: 'desk-1',
        x: 150,
        y: 20,
        rotation: 0,
      },
      {
        ...FURNITURE_CATALOG.officeChair,
        instanceId: 'chair-1',
        x: 160,
        y: 50,
        rotation: 0,
      },
      {
        ...FURNITURE_CATALOG.airMattress,
        instanceId: 'bed-1',
        x: 120,
        y: ROOM.livingDepth + 20,
        rotation: 0,
      },
    ],
  },
};

export default {
  FURNITURE_CATALOG,
  DEFAULT_FURNITURE,
  LAYOUT_PRESETS,
};
