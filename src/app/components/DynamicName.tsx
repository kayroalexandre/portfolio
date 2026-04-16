import { useEffect, useRef } from 'react';

interface DynamicNameProps {
  className?: string;
  as?: 'h1' | 'h2';
}

const dynamicNameText = 'KAYRO GOMES';

export function DynamicName({ className = '', as: Tag = 'h1' }: DynamicNameProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    let animationFrameId: number;

    const update = () => {
      if (!containerRef.current || !textRef.current) {
        return;
      }

      // Mede o texto sem tracking para redistribuir o spacing com mais precisão.
      textRef.current.style.letterSpacing = '0px';
      const containerWidth = containerRef.current.offsetWidth;
      const textWidth = textRef.current.offsetWidth;
      const text = textRef.current.textContent || '';
      const gaps = text.length - 1;

      const fontSizePx = parseFloat(window.getComputedStyle(textRef.current).fontSize);
      const compensation = fontSizePx * 0.14;
      const targetWidth = containerWidth + compensation;
      const diff = targetWidth - textWidth;

      if (diff > 0 && gaps > 0) {
        textRef.current.style.letterSpacing = `${diff / gaps}px`;
      } else {
        textRef.current.style.letterSpacing = '0px';
      }
    };

    const scheduledUpdate = () => {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(update);
    };

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(scheduledUpdate);
    }
    scheduledUpdate();

    let observer: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined' && containerRef.current) {
      observer = new ResizeObserver(() => scheduledUpdate());
      observer.observe(containerRef.current);
    }

    window.addEventListener('resize', scheduledUpdate);

    return () => {
      if (observer) {
        observer.disconnect();
      }
      window.removeEventListener('resize', scheduledUpdate);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full">
      <Tag
        ref={textRef}
        className={`inline-block whitespace-nowrap uppercase text-[clamp(3rem,12vw,12rem)] font-black leading-[0.9] -ml-[0.07em] ${className}`.trim()}
      >
        {dynamicNameText}
      </Tag>
    </div>
  );
}
