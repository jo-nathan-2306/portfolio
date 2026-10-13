interface AppIconProps {
  variant?: string;
}

function getSize(variant: string | undefined, scale: number) {
  const baseSize = variant?.startsWith("16x16") ? 16 : 32;
  return Math.round(baseSize * scale);
}

export function DoomIcon({ variant }: AppIconProps) {
  const size = getSize(variant, 1.2);
  return (
    <img
      className="doom-window-icon"
      src="/icons/doom.png"
      alt=""
      width={size}
      height={size}
      style={{ objectFit: "contain", flexShrink: 0 }}
    />
  );
}

export function PortfolioIcon({ variant }: AppIconProps) {
  const size = getSize(variant, 1.5);
  return (
    <img
      src="/icons/portfolio-book.png"
      alt=""
      width={size}
      height={size}
      style={{ objectFit: "contain", flexShrink: 0, imageRendering: "pixelated" }}
    />
  );
}
