// ============================================================
// COMMAND PALETTE EVENT BUS
// Decoupled trigger to open and close the global command palette
// ============================================================

export const PALETTE_OPEN_EVENT = 'open-command-palette';

/**
 * Dispatch an event to open the command palette.
 */
export function openCommandPalette() {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent(PALETTE_OPEN_EVENT));
}
