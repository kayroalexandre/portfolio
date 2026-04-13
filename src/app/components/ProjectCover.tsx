import { ImageWithFallback } from './figma/ImageWithFallback';

interface CoverProps {
  className?: string;
}

/**
 * Cover for the UnimedPay project card.
 * Shows the app home screen inside a phone mockup on a dark gradient background.
 */
export function UnimedPayCover({ className = '' }: CoverProps) {
  const homeImage = new URL('../../../cases/telas-unimedpay/Home.png', import.meta.url).href;

  return (
    <div
      className={`relative w-full h-full bg-gradient-to-br from-[#0a1628] via-[#0f1d32] to-[#0a1220] overflow-hidden ${className}`}
    >
      {/* Decorative gradient circles */}
      <div className="absolute -top-[20%] -right-[10%] w-[60%] h-[60%] rounded-full bg-[#4f8cff]/8 blur-3xl" />
      <div className="absolute -bottom-[15%] -left-[10%] w-[50%] h-[50%] rounded-full bg-[#34d399]/6 blur-3xl" />

      {/* Phone mockup centered */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-[38%] max-w-[200px]">
          {/* Phone shell */}
          <div className="relative bg-gradient-to-b from-neutral-700 to-neutral-900 rounded-[18%] p-[5%] shadow-2xl shadow-black/60 border border-white/[0.08]">
            {/* Dynamic Island */}
            <div className="absolute top-[4%] left-1/2 -translate-x-1/2 w-[32%] h-[3%] bg-black rounded-full" />

            {/* Screen */}
            <div className="relative rounded-[13%] overflow-hidden bg-black aspect-[375/812]">
              <ImageWithFallback
                src={homeImage}
                alt="UnimedPay"
                className="w-full h-full object-cover object-top"
              />
            </div>

            {/* Home indicator */}
            <div className="flex justify-center pt-[1.5%]">
              <div className="w-[35%] h-[2px] bg-white/20 rounded-full" />
            </div>
          </div>
        </div>
      </div>

      {/* Subtle corner accents */}
      <div className="absolute top-4 left-5 text-white/20 text-[0.65rem] font-mono tracking-wider uppercase">
        Mobile
      </div>
      <div className="absolute bottom-4 right-5 text-white/20 text-[0.65rem] font-mono tracking-wider uppercase">
        Healthtech
      </div>
    </div>
  );
}

/**
 * Cover for the Monetix project card.
 * Shows the web dashboard inside a browser mockup on a dark gradient background.
 */
export function MonetixCover({ className = '' }: CoverProps) {
  const terminalsImage = new URL(
    '../../../cases/telas-monetix/Terminais de Pagamento.png',
    import.meta.url
  ).href;

  return (
    <div
      className={`relative w-full h-full bg-gradient-to-br from-[#0a1a12] via-[#0f2318] to-[#0a1620] overflow-hidden ${className}`}
    >
      {/* Decorative gradient circles */}
      <div className="absolute -top-[15%] -left-[10%] w-[50%] h-[50%] rounded-full bg-[#34d399]/6 blur-3xl" />
      <div className="absolute -bottom-[20%] -right-[15%] w-[60%] h-[60%] rounded-full bg-[#4f8cff]/5 blur-3xl" />

      {/* Browser mockup */}
      <div className="absolute inset-0 flex items-center justify-center px-[6%]">
        <div className="relative w-full max-w-[85%]">
          <div className="relative bg-gradient-to-b from-neutral-700 to-neutral-800 rounded-xl shadow-2xl shadow-black/60 border border-white/[0.08] overflow-hidden">
            {/* Browser chrome */}
            <div className="flex items-center gap-[3%] px-[3%] py-[2.5%] bg-neutral-800/80 border-b border-white/[0.04]">
              <div className="flex gap-[1.5%]">
                <div className="w-[8px] h-[8px] rounded-full bg-[#FF5F57]/70" />
                <div className="w-[8px] h-[8px] rounded-full bg-[#FEBC2E]/70" />
                <div className="w-[8px] h-[8px] rounded-full bg-[#28C840]/70" />
              </div>
              <div className="flex-1 flex justify-center">
                <div
                  className="bg-white/5 rounded-[4px] px-[2%] py-[0.5%] text-white/20 text-[6px] font-mono truncate max-w-[40%]"
                  aria-hidden="true"
                >
                  monetix.com.br
                </div>
              </div>
              <div className="w-[8%]" />
            </div>

            {/* Screen */}
            <div className="overflow-hidden aspect-[1440/1024]">
              <ImageWithFallback
                src={terminalsImage}
                alt="Monetix"
                className="w-full h-full object-cover object-top"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Subtle corner accents */}
      <div className="absolute top-4 left-5 text-white/20 text-[0.65rem] font-mono tracking-wider uppercase">
        Desktop
      </div>
      <div className="absolute bottom-4 right-5 text-white/20 text-[0.65rem] font-mono tracking-wider uppercase">
        Fintech
      </div>
    </div>
  );
}

/**
 * Map of project slugs to their cover components.
 */
export const projectCovers: Record<string, React.FC<CoverProps>> = {
  monetix: MonetixCover,
  unimedpay: UnimedPayCover,
};
