import { useEffect, useRef, useState } from 'react';

import { uiEventBus } from '../lib/ui-events';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ScrollZoomImageProps {
  src: string;
  alt: string;
  className?: string;
}

export function ScrollZoomImage({ src, alt, className }: ScrollZoomImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1.3);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Progress: 0 when container top enters viewport bottom, 1 when fully visible
      const progress = Math.min(
        Math.max((windowHeight - rect.top) / (windowHeight + rect.height), 0),
        1
      );

      // Scale from 1.3 (zoomed) down to 1.0 (normal)
      const nextScale = Number((1.3 - progress * 0.3).toFixed(4));
      setScale(nextScale);
      uiEventBus.emit('image:scroll-zoom', { src, scale: nextScale });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [src]);

  return (
    <div ref={containerRef} className="w-full h-full overflow-hidden">
      <ImageWithFallback
        src={src}
        alt={alt}
        className={className}
        style={{ transform: `scale(${scale})`, transition: 'transform 0.1s linear' }}
      />
    </div>
  );
}
