import Image from "next/image";

interface BrandLogoProps {
  src: string;
  alt: string;
  className?: string;
}

export function BrandLogo({ src, alt, className = "" }: BrandLogoProps) {
  return (
    <div
      className={`flex flex-row items-center justify-center gap-[10px] overflow-clip rounded-none p-0 ${className}`}
    >
      <div className="relative w-[200px] h-[80px] overflow-clip rounded-none">
        <Image src={src} alt={alt} fill className="object-cover object-center" />
      </div>
    </div>
  );
}
