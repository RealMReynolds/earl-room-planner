// Geometry utilities for collision detection and calculations

/**
 * Check if two rectangles overlap (AABB collision)
 */
export function rectsOverlap(rect1, rect2) {
  // Get bounding boxes accounting for rotation
  const box1 = getRotatedBoundingBox(rect1);
  const box2 = getRotatedBoundingBox(rect2);

  return !(
    box1.right < box2.left ||
    box1.left > box2.right ||
    box1.bottom < box2.top ||
    box1.top > box2.bottom
  );
}

/**
 * Get axis-aligned bounding box for a rotated rectangle
 */
export function getRotatedBoundingBox(rect) {
  const { x, y, width, depth, rotation = 0 } = rect;
  const centerX = x + width / 2;
  const centerY = y + depth / 2;

  // Get corners
  const corners = [
    { x: -width / 2, y: -depth / 2 },
    { x: width / 2, y: -depth / 2 },
    { x: width / 2, y: depth / 2 },
    { x: -width / 2, y: depth / 2 },
  ];

  // Rotate corners
  const rad = (rotation * Math.PI) / 180;
  const cos = Math.cos(rad);
  const sin = Math.sin(rad);

  const rotatedCorners = corners.map((corner) => ({
    x: centerX + corner.x * cos - corner.y * sin,
    y: centerY + corner.x * sin + corner.y * cos,
  }));

  // Find bounding box
  const xs = rotatedCorners.map((c) => c.x);
  const ys = rotatedCorners.map((c) => c.y);

  return {
    left: Math.min(...xs),
    right: Math.max(...xs),
    top: Math.min(...ys),
    bottom: Math.max(...ys),
  };
}

/**
 * Check if a point is inside a rectangle
 */
export function pointInRect(point, rect) {
  const box = getRotatedBoundingBox(rect);
  return (
    point.x >= box.left &&
    point.x <= box.right &&
    point.y >= box.top &&
    point.y <= box.bottom
  );
}

/**
 * Check if a rectangle overlaps with a traffic path
 */
export function overlapsTrafficPath(rect, path) {
  const box = getRotatedBoundingBox(rect);
  const halfWidth = path.width / 2;

  // Check each segment of the path
  for (let i = 0; i < path.points.length - 1; i++) {
    const p1 = path.points[i];
    const p2 = path.points[i + 1];

    // Create a rough bounding box for the path segment
    const pathBox = {
      left: Math.min(p1.x, p2.x) - halfWidth,
      right: Math.max(p1.x, p2.x) + halfWidth,
      top: Math.min(p1.y, p2.y) - halfWidth,
      bottom: Math.max(p1.y, p2.y) + halfWidth,
    };

    // Check for overlap
    if (
      !(
        box.right < pathBox.left ||
        box.left > pathBox.right ||
        box.bottom < pathBox.top ||
        box.top > pathBox.bottom
      )
    ) {
      return true;
    }
  }

  return false;
}

/**
 * Calculate distance between two points
 */
export function distance(p1, p2) {
  const dx = p2.x - p1.x;
  const dy = p2.y - p1.y;
  return Math.sqrt(dx * dx + dy * dy);
}

/**
 * Snap position to grid
 */
export function snapToGrid(value, gridSize = 6) {
  return Math.round(value / gridSize) * gridSize;
}

/**
 * Check if furniture is within room bounds
 */
export function isWithinBounds(furniture, roomBounds) {
  const box = getRotatedBoundingBox(furniture);
  return (
    box.left >= roomBounds.x &&
    box.right <= roomBounds.x + roomBounds.width &&
    box.top >= roomBounds.y &&
    box.bottom <= roomBounds.y + roomBounds.height
  );
}

/**
 * Get the center point of a rectangle
 */
export function getCenter(rect) {
  return {
    x: rect.x + rect.width / 2,
    y: rect.y + rect.depth / 2,
  };
}

export default {
  rectsOverlap,
  getRotatedBoundingBox,
  pointInRect,
  overlapsTrafficPath,
  distance,
  snapToGrid,
  isWithinBounds,
  getCenter,
};
