// ============================================================
// SHARED ICONS — inline SVG icon components (camera, person, and
// one icon per showcase category). Stroke-based, currentColor,
// no external image assets.
//
// All icons share the same signature: ({ className, ...rest })
// where className defaults to 'w-6 h-6', so size can be overridden
// per call site. aria-hidden="true" is kept on every svg.
// ============================================================

export function CameraIcon({ className = 'w-6 h-6', ...rest }) {
  return (
    <svg
      aria-hidden="true"
      className={`stroke-current stroke-[1.5] fill-none ${className}`}
      viewBox="0 0 24 24"
      {...rest}
    >
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" strokeLinecap="round" strokeLinejoin="round"></path>
      <circle cx="12" cy="13" r="4"></circle>
    </svg>
  );
}

export function PersonIcon({ className = 'w-6 h-6', ...rest }) {
  return (
    <svg
      aria-hidden="true"
      className={`stroke-current stroke-[1.5] fill-none ${className}`}
      viewBox="0 0 24 24"
      {...rest}
    >
      <circle cx="12" cy="8" r="4" strokeLinecap="round" strokeLinejoin="round"></circle>
      <path d="M6 20v-1a6 6 0 0 1 12 0v1" strokeLinecap="round" strokeLinejoin="round"></path>
      <rect height="5" rx="1" strokeLinecap="round" strokeLinejoin="round" width="7" x="15" y="15"></rect>
      <circle cx="18.5" cy="17.5" r="1"></circle>
    </svg>
  );
}

export function PhotographyIcon({ className = 'w-6 h-6', ...rest }) {
  return (
    <svg
      aria-hidden="true"
      className={`stroke-current stroke-[1.5] fill-none ${className}`}
      viewBox="0 0 24 24"
      {...rest}
    >
      <circle cx="12" cy="12" r="3.2"></circle>
      <path d="M9 2L7.17 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-3.17L15 2H9z" strokeLinecap="round" strokeLinejoin="round"></path>
    </svg>
  );
}

export function VideographyIcon({ className = 'w-6 h-6', ...rest }) {
  return (
    <svg
      aria-hidden="true"
      className={`stroke-current stroke-[1.5] fill-none ${className}`}
      viewBox="0 0 24 24"
      {...rest}
    >
      <rect height="12" rx="2" width="14" x="2" y="6"></rect>
      <path d="m22 7-6 4.5L22 16V7z"></path>
    </svg>
  );
}

export function MotionIcon({ className = 'w-6 h-6', ...rest }) {
  return (
    <svg
      aria-hidden="true"
      className={`stroke-current stroke-[1.5] fill-none ${className}`}
      viewBox="0 0 24 24"
      {...rest}
    >
      <circle cx="12" cy="12" r="10"></circle>
      <polygon points="10 8 16 12 10 16 10 8"></polygon>
      <path d="M12 2a10 10 0 0 1 10 10" strokeDasharray="4 4"></path>
    </svg>
  );
}

export function ShortFilmIcon({ className = 'w-6 h-6', ...rest }) {
  return (
    <svg
      aria-hidden="true"
      className={`stroke-current stroke-[1.5] fill-none ${className}`}
      viewBox="0 0 24 24"
      {...rest}
    >
      <rect height="18" rx="2" width="18" x="3" y="3"></rect>
      <line x1="3" x2="21" y1="9" y2="9"></line>
      <line x1="9" x2="9" y1="21" y2="9"></line>
      <line x1="15" x2="15" y1="21" y2="9"></line>
      <line x1="7" x2="5" y1="3" y2="9"></line>
      <line x1="13" x2="11" y1="3" y2="9"></line>
      <line x1="19" x2="17" y1="3" y2="9"></line>
    </svg>
  );
}

export function WebDevIcon({ className = 'w-6 h-6', ...rest }) {
  return (
    <svg
      aria-hidden="true"
      className={`stroke-current stroke-[1.5] fill-none ${className}`}
      viewBox="0 0 24 24"
      {...rest}
    >
      <polyline points="16 18 22 12 16 6"></polyline>
      <polyline points="8 6 2 12 8 18"></polyline>
      <line x1="14" x2="10" y1="4" y2="20"></line>
    </svg>
  );
}

// Coverflow card icons (one per showcase category, keyed by category key)
export const showcaseIcons = {
  photography: PhotographyIcon,
  videography: VideographyIcon,
  motion: MotionIcon,
  shortfilm: ShortFilmIcon,
  webdev: WebDevIcon,
};
