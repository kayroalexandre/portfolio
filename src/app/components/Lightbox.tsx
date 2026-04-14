import { useCallback, useEffect, useRef, useState } from 'react';

interface LightboxProps {
  src: string;
  alt: string;
  onClose: () => void;
}

/**
 * Full-screen lightbox overlay for viewing images at original size.
 * Supports zoom/pan, keyboard navigation (Esc to close),
 * and scroll-to-dismiss on mobile.
 */
export function Lightbox({ src, alt, onClose }: LightboxProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  // Close on Esc
  useEffect(() => {
    const handleKeyDown = (keyboardEvent: KeyboardEvent) => {
      if (keyboardEvent.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Prevent body scroll when open
  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = original;
    };
  }, []);

  const handleOverlayClick = useCallback(
    (mouseEvent: React.MouseEvent) => {
      if (mouseEvent.target === overlayRef.current) onClose();
    },
    [onClose]
  );

  const handleWheel = useCallback((wheelEvent: React.WheelEvent) => {
    wheelEvent.preventDefault();
    setScale((currentScale) =>
      Math.min(Math.max(currentScale + (wheelEvent.deltaY > 0 ? -0.15 : 0.15), 0.5), 5)
    );
  }, []);

  const handlePointerDown = useCallback(
    (pointerEvent: React.PointerEvent) => {
      if (scale > 1) {
        setIsDragging(true);
        setDragStart({
          x: pointerEvent.clientX - translate.x,
          y: pointerEvent.clientY - translate.y,
        });
        (pointerEvent.target as HTMLElement).setPointerCapture(pointerEvent.pointerId);
      }
    },
    [scale, translate]
  );

  const handlePointerMove = useCallback(
    (pointerEvent: React.PointerEvent) => {
      if (!isDragging) return;
      setTranslate({
        x: pointerEvent.clientX - dragStart.x,
        y: pointerEvent.clientY - dragStart.y,
      });
    },
    [isDragging, dragStart]
  );

  const handlePointerUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleReset = useCallback(() => {
    setScale(1);
    setTranslate({ x: 0, y: 0 });
  }, []);

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      onWheel={handleWheel}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm animate-lightbox-in"
      role="dialog"
      aria-label={`Imagem ampliada: ${alt}`}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
        aria-label="Fechar"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        >
          <line x1="4" y1="4" x2="16" y2="16" />
          <line x1="16" y1="4" x2="4" y2="16" />
        </svg>
      </button>

      {/* Zoom controls */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex items-center gap-3 bg-white/10 rounded-full px-4 py-2 backdrop-blur-sm">
        <button
          onClick={() => setScale((currentScale) => Math.max(currentScale - 0.25, 0.5))}
          className="text-white hover:text-white/80 transition-colors text-lg leading-none cursor-pointer"
          aria-label="Reduzir zoom"
        >
          −
        </button>
        <button
          onClick={handleReset}
          className="text-white/60 hover:text-white/80 transition-colors text-xs cursor-pointer"
        >
          {Math.round(scale * 100)}%
        </button>
        <button
          onClick={() => setScale((currentScale) => Math.min(currentScale + 0.25, 5))}
          className="text-white hover:text-white/80 transition-colors text-lg leading-none cursor-pointer"
          aria-label="Aumentar zoom"
        >
          +
        </button>
      </div>

      {/* Image */}
      <img
        src={src}
        alt={alt}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        className="max-h-[90vh] max-w-[95vw] object-contain select-none"
        style={{
          transform: `scale(${scale}) translate(${translate.x / scale}px, ${translate.y / scale}px)`,
          transition: isDragging ? 'none' : 'transform 0.2s ease',
          cursor: scale > 1 ? (isDragging ? 'grabbing' : 'grab') : 'zoom-in',
        }}
        draggable={false}
      />
    </div>
  );
}

/**
 * Hook to manage lightbox state — open/close with image info.
 */
export function useLightbox() {
  const [state, setState] = useState<{ src: string; alt: string } | null>(null);

  const open = useCallback((src: string, alt: string) => {
    setState({ src, alt });
  }, []);

  const close = useCallback(() => {
    setState(null);
  }, []);

  return { lightbox: state, open, close };
}
