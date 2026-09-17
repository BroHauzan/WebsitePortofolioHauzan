// ============================================================
// TOAST & CLIPBOARD UTILITIES
// Lightweight event-driven communication for notifications & clipboard
// ============================================================

export const TOAST_EVENT = 'portfolio-toast';

/**
 * Dispatch a custom event to display a toast notification.
 * @param {string} message - Notification text
 * @param {'success' | 'info' | 'error'} [type='success'] - Visual style indicator
 * @param {number} [duration=3000] - Duration in ms before auto-dismiss
 */
export function showToast(message, type = 'success', duration = 3000) {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(
    new CustomEvent(TOAST_EVENT, {
      detail: {
        id: `${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        message,
        type,
        duration,
      },
    })
  );
}

/**
 * Safely copy text to clipboard with automatic fallback for restricted permissions,
 * older browser engines, or non-secure contexts.
 * Triggers a toast notification on success or failure.
 * @param {string} text - Text to copy
 * @param {string} [successMessage='Disalin ke papan klip!'] - Custom toast text
 * @returns {Promise<boolean>} Whether copy succeeded
 */
export async function copyToClipboard(text, successMessage = 'Disalin ke papan klip!') {
  let copied = false;

  // Primary: Modern Async Clipboard API
  if (navigator?.clipboard?.writeText && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(text);
      copied = true;
    } catch {
      copied = false;
    }
  }

  // Fallback: document.execCommand('copy') via temporary textarea
  if (!copied && typeof document !== 'undefined') {
    try {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.setAttribute('readonly', '');
      textarea.style.position = 'fixed';
      textarea.style.top = '-9999px';
      textarea.style.left = '-9999px';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();

      copied = document.execCommand('copy');
      document.body.removeChild(textarea);
    } catch {
      copied = false;
    }
  }

  if (copied) {
    showToast(successMessage, 'success');
  } else {
    showToast('Gagal menyalin. Silakan salin secara manual.', 'error');
  }

  return copied;
}
