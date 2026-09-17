// ============================================================
// SCROLL LOCK UTILITY
// Reference-counted body scroll lock preventing race conditions
// across multiple simultaneous or transitioning modals/drawers
// ============================================================

let lockCount = 0;

/**
 * Lock document body scroll when a modal/overlay opens.
 */
export function lockBodyScroll() {
  if (typeof document === 'undefined') return;
  lockCount += 1;
  if (lockCount === 1) {
    document.body.style.overflow = 'hidden';
  }
}

/**
 * Unlock document body scroll when a modal/overlay closes.
 */
export function unlockBodyScroll() {
  if (typeof document === 'undefined') return;
  lockCount = Math.max(0, lockCount - 1);
  if (lockCount === 0) {
    document.body.style.overflow = '';
  }
}
