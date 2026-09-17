// ============================================================
// WEB MICRO-HAPTICS ENGINE
// Emulating Apple Taptic Engine tactile feedback via Web Vibration API
// Safe execution: silently fails if not supported or disabled
// ============================================================

const isVibrationSupported =
  typeof window !== 'undefined' &&
  typeof navigator !== 'undefined' &&
  typeof navigator.vibrate === 'function';

/**
 * Trigger a crisp, ultra-light haptic tap (10ms)
 * Perfect for carousel navigation, keyboard palette selection, or tab switches
 */
export function triggerLightHaptic() {
  if (!isVibrationSupported) return;
  try {
    navigator.vibrate(10);
  } catch {
    // Ignore permissions/unsupported errors
  }
}

/**
 * Trigger a medium mechanical snap (16ms)
 * Used for opening drawers, command palette, or toggling main actions
 */
export function triggerMediumHaptic() {
  if (!isVibrationSupported) return;
  try {
    navigator.vibrate(16);
  } catch {
    // Ignore permissions/unsupported errors
  }
}

/**
 * Trigger an Apple-grade success double-pulse [12ms, 35ms pause, 18ms]
 * Used for successful clipboard copy, action completions, and confirmations
 */
export function triggerSuccessHaptic() {
  if (!isVibrationSupported) return;
  try {
    navigator.vibrate([12, 35, 18]);
  } catch {
    // Ignore permissions/unsupported errors
  }
}
