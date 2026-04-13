import { ImageWithFallback } from './figma/ImageWithFallback';

interface MockupFigureProps {
  src: string;
  alt: string;
  caption?: string;
  className?: string;
  onClick?: () => void;
}

/**
 * iPhone-style phone frame mockup using pure CSS.
 * Wraps mobile screenshots (375px wide) in a realistic device frame
 * that constrains their size and provides visual context.
 * Clickable — opens lightbox when onClick is provided.
 */
export function PhoneMockup({ src, alt, caption, className = '', onClick }: MockupFigureProps) {
  return (
    <figure className={`my-8 ${className}`}>
      <div
        className={`flex justify-center ${onClick ? 'cursor-pointer' : ''}`}
        onClick={onClick}
        role={onClick ? 'button' : undefined}
        tabIndex={onClick ? 0 : undefined}
        onKeyDown={
          onClick
            ? (e) => {
                if (e.key === 'Enter' || e.key === ' ') onClick();
              }
            : undefined
        }
      >
        <div className="relative w-[260px] sm:w-[280px] md:w-[320px] group">
          {/* Phone outer shell */}
          <div className="relative bg-neutral-900 rounded-[2.5rem] p-3 shadow-2xl shadow-black/50 border border-white/[0.08] transition-shadow duration-300 group-hover:shadow-black/70 group-hover:border-white/[0.15]">
            {/* Dynamic Island */}
            <div className="absolute top-[1.05rem] left-1/2 -translate-x-1/2 w-[5.5rem] h-[1.5rem] bg-black rounded-full z-10" />

            {/* Screen area */}
            <div className="relative rounded-[1.4rem] overflow-hidden bg-black">
              <ImageWithFallback
                src={src}
                alt={alt}
                className="w-full h-auto object-top object-cover"
              />
              {/* Hover overlay */}
              {onClick && (
                <div className="absolute inset-0 bg-white/0 group-hover:bg-white/[0.04] transition-colors duration-300 flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-white/0 group-hover:text-white/60 transition-all duration-300 scale-75 group-hover:scale-100"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6"
                    />
                  </svg>
                </div>
              )}
            </div>

            {/* Home indicator bar */}
            <div className="flex justify-center mt-2 pb-1">
              <div className="w-28 h-[3px] bg-white/15 rounded-full" />
            </div>
          </div>
        </div>
      </div>
      {caption && (
        <figcaption className="text-sm mt-4 text-center text-white/70 leading-relaxed">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

/**
 * Renders two phone mockups side by side for flow showcases.
 */
interface PhonePairProps {
  leftSrc: string;
  leftAlt: string;
  rightSrc: string;
  rightAlt: string;
  caption?: string;
  className?: string;
  onLeftClick?: () => void;
  onRightClick?: () => void;
}

export function PhonePair({
  leftSrc,
  leftAlt,
  rightSrc,
  rightAlt,
  caption,
  className = '',
  onLeftClick,
  onRightClick,
}: PhonePairProps) {
  return (
    <figure className={`my-8 ${className}`}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-8 max-w-2xl mx-auto">
        <div
          className={`relative bg-neutral-900 rounded-[2rem] p-2.5 shadow-2xl shadow-black/50 border border-white/[0.08] transition-all duration-300 hover:shadow-black/70 hover:border-white/[0.15] ${onLeftClick ? 'cursor-pointer' : ''}`}
          onClick={onLeftClick}
          role={onLeftClick ? 'button' : undefined}
          tabIndex={onLeftClick ? 0 : undefined}
          onKeyDown={
            onLeftClick
              ? (e) => {
                  if (e.key === 'Enter' || e.key === ' ') onLeftClick();
                }
              : undefined
          }
        >
          <div className="absolute top-[0.85rem] left-1/2 -translate-x-1/2 w-[4.5rem] h-[1.2rem] bg-black rounded-full z-10" />
          <div className="relative rounded-[1.1rem] overflow-hidden bg-black">
            <ImageWithFallback
              src={leftSrc}
              alt={leftAlt}
              className="w-full h-auto object-top object-cover"
            />
            {onLeftClick && (
              <div className="absolute inset-0 bg-white/0 hover:bg-white/[0.04] transition-colors duration-300 flex items-center justify-center group/left">
                <svg
                  className="w-7 h-7 text-white/0 group-hover/left:text-white/50 transition-all duration-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6"
                  />
                </svg>
              </div>
            )}
          </div>
          <div className="flex justify-center mt-1.5">
            <div className="w-24 h-[2px] bg-white/15 rounded-full" />
          </div>
        </div>
        <div
          className={`relative bg-neutral-900 rounded-[2rem] p-2.5 shadow-2xl shadow-black/50 border border-white/[0.08] transition-all duration-300 hover:shadow-black/70 hover:border-white/[0.15] ${onRightClick ? 'cursor-pointer' : ''}`}
          onClick={onRightClick}
          role={onRightClick ? 'button' : undefined}
          tabIndex={onRightClick ? 0 : undefined}
          onKeyDown={
            onRightClick
              ? (e) => {
                  if (e.key === 'Enter' || e.key === ' ') onRightClick();
                }
              : undefined
          }
        >
          <div className="absolute top-[0.85rem] left-1/2 -translate-x-1/2 w-[4.5rem] h-[1.2rem] bg-black rounded-full z-10" />
          <div className="relative rounded-[1.1rem] overflow-hidden bg-black">
            <ImageWithFallback
              src={rightSrc}
              alt={rightAlt}
              className="w-full h-auto object-top object-cover"
            />
            {onRightClick && (
              <div className="absolute inset-0 bg-white/0 hover:bg-white/[0.04] transition-colors duration-300 flex items-center justify-center group/right">
                <svg
                  className="w-7 h-7 text-white/0 group-hover/right:text-white/50 transition-all duration-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6"
                  />
                </svg>
              </div>
            )}
          </div>
          <div className="flex justify-center mt-1.5">
            <div className="w-24 h-[2px] bg-white/15 rounded-full" />
          </div>
        </div>
      </div>
      {caption && (
        <figcaption className="text-sm mt-4 text-center text-white/70 leading-relaxed">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

/**
 * Browser/desktop mockup frame for web screenshots (1440px wide).
 * Clickable — opens lightbox when onClick is provided.
 */
export function DesktopMockup({ src, alt, caption, className = '', onClick }: MockupFigureProps) {
  return (
    <figure className={`my-8 ${className}`}>
      <div
        className={`relative bg-neutral-900 rounded-xl overflow-hidden shadow-2xl shadow-black/50 border border-white/[0.08] transition-all duration-300 hover:shadow-black/70 hover:border-white/[0.15] ${onClick ? 'cursor-pointer' : ''}`}
        onClick={onClick}
        role={onClick ? 'button' : undefined}
        tabIndex={onClick ? 0 : undefined}
        onKeyDown={
          onClick
            ? (e) => {
                if (e.key === 'Enter' || e.key === ' ') onClick();
              }
            : undefined
        }
      >
        {/* Browser chrome */}
        <div className="flex items-center gap-2 px-4 py-2 bg-neutral-800/60 border-b border-white/[0.06]">
          {/* Traffic lights */}
          <div className="flex gap-1.5 shrink-0">
            <div className="w-[11px] h-[11px] rounded-full bg-[#FF5F57]" />
            <div className="w-[11px] h-[11px] rounded-full bg-[#FEBC2E]" />
            <div className="w-[11px] h-[11px] rounded-full bg-[#28C840]" />
          </div>
          {/* URL bar */}
          <div className="flex-1 flex justify-center">
            <div className="bg-neutral-700/50 rounded-md px-4 py-[3px] text-white/25 text-[11px] font-mono w-44 md:w-64 text-center truncate select-none">
              localhost
            </div>
          </div>
          {/* Spacer for symmetry */}
          <div className="w-[42px] shrink-0" />
        </div>
        {/* Screen content */}
        <div className="overflow-hidden relative group/desktop">
          <ImageWithFallback
            src={src}
            alt={alt}
            className="w-full h-auto object-top object-cover"
          />
          {onClick && (
            <div className="absolute inset-0 bg-white/0 group-hover/desktop:bg-white/[0.03] transition-colors duration-300 flex items-center justify-center">
              <svg
                className="w-9 h-9 text-white/0 group-hover/desktop:text-white/50 transition-all duration-300 scale-75 group-hover/desktop:scale-100"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6"
                />
              </svg>
            </div>
          )}
        </div>
      </div>
      {caption && (
        <figcaption className="text-sm mt-3 text-center text-white/70 leading-relaxed">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
