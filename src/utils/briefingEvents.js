// ============================================================
// PRODUCTION BRIEFING EVENT BUS
// Decoupled communication for opening project briefing drawers,
// with buffer support for lazy-loaded consumers
// ============================================================

export const BRIEFING_OPEN_EVENT = 'open-production-briefing';

let pendingBriefingId = null;

/**
 * Dispatch an event to open the production briefing drawer for a given project key.
 * If the consumer component has not mounted yet, the ID is buffered.
 * @param {string} briefingId - The ID of the briefing (e.g. 'dies-natalis', 'videography')
 */
export function openProductionBriefing(briefingId) {
  if (typeof window === 'undefined') return;
  pendingBriefingId = briefingId;
  window.dispatchEvent(
    new CustomEvent(BRIEFING_OPEN_EVENT, {
      detail: { id: briefingId },
    })
  );
}

/**
 * Check and consume any pending briefing request that was fired
 * before consumer components mounted.
 * @returns {string|null}
 */
export function consumePendingBriefing() {
  const id = pendingBriefingId;
  pendingBriefingId = null;
  return id;
}
