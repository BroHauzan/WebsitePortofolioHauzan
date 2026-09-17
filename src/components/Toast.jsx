import { useEffect, useState } from 'react';
import { TOAST_EVENT } from '../utils/toast';

export default function Toast() {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    const handleToast = (event) => {
      const toastData = event.detail;
      if (!toastData || !toastData.message) return;

      setToasts((prev) => [...prev, toastData]);

      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== toastData.id));
      }, toastData.duration || 3000);
    };

    window.addEventListener(TOAST_EVENT, handleToast);
    return () => window.removeEventListener(TOAST_EVENT, handleToast);
  }, []);

  if (toasts.length === 0) return null;

  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      className="fixed bottom-6 right-6 z-[100] flex flex-col gap-2 max-w-sm w-[calc(100%-3rem)] sm:w-auto pointer-events-none"
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          role="status"
          className="pointer-events-auto flex items-center justify-between gap-3 px-4 py-3 bg-[#fbfbf9] text-ink-primary border border-ink-primary/20 rounded-xl shadow-xl shadow-slate-900/10 backdrop-blur-md transition-all animate-fadeIn"
        >
          <div className="flex items-center gap-2.5 min-w-0">
            {toast.type === 'error' ? (
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-red-100 text-red-700 flex items-center justify-center text-xs font-bold">
                ✕
              </span>
            ) : (
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-ink-primary text-cream flex items-center justify-center text-xs">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                </svg>
              </span>
            )}
            <p className="text-xs sm:text-sm font-medium leading-tight truncate">
              {toast.message}
            </p>
          </div>
          <button
            type="button"
            aria-label="Tutup pemberitahuan"
            onClick={() => setToasts((prev) => prev.filter((t) => t.id !== toast.id))}
            className="flex-shrink-0 p-1 text-ink-muted hover:text-ink-primary transition-colors rounded-lg focus-ring"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      ))}
    </div>
  );
}
