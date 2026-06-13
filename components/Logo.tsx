import Image from "next/image";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center", className)}>
      <Image
        src="/logo.png"
        alt="NextBite"
        width={140}
        height={48}
        priority
        className="h-12 w-auto object-contain"
      />
    </span>
  );
}
