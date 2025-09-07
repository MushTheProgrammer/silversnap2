import Image from 'next/image';
import { cn } from "@/lib/utils";

const logoSrc = "/img/logo/logo.png";

export default function Logo({ className }: { className?: string }) {
  return (
    <Image
      src={logoSrc}
      alt="SilverSnaps Logo"
      width={400}
      height={400}
      className={cn("w-[500px] md:w-[35px]", className)}
    />
  );
}
