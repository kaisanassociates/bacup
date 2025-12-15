import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

// A lightweight red splash overlay that shows briefly on route changes
const RouteSplash = ({ duration = 600 }: { duration?: number }) => {
  const location = useLocation();
  const [visible, setVisible] = useState(true); // show on first mount
  const timerRef = useRef<number | null>(null);
  const lastPathRef = useRef<string>(location.pathname);

  useEffect(() => {
    // If path changed, trigger splash
    if (lastPathRef.current !== location.pathname) {
      lastPathRef.current = location.pathname;
      setVisible(true);
    }

    // Hide after duration
    if (visible) {
      if (timerRef.current) window.clearTimeout(timerRef.current);
      timerRef.current = window.setTimeout(() => setVisible(false), duration);
    }

    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, [location.pathname, duration, visible]);

  return (
    <div
      aria-hidden
      className={`fixed inset-0 z-[1100] pointer-events-none transition-opacity duration-300 ${
        visible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* Red background with subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-700 via-red-600 to-rose-600" />

      {/* Decorative glows */}
      <div className="absolute -top-24 -left-24 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl" />

      {/* Center content */}
      <div className="relative h-full w-full flex items-center justify-center">
        <div className="text-center select-none">
          <h1 className="text-5xl md:text-7xl font-black tracking-tight text-white drop-shadow-md">
            INFLUENCIA
          </h1>
          <p className="mt-2 text-xs md:text-sm text-white/80 uppercase tracking-widest">
            Edition 2.0
          </p>
        </div>
      </div>
    </div>
  );
};

export default RouteSplash;
