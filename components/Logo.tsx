import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * NextBite ka logo.
 *
 * `imageClassName` se naap badla ja sakta hai — default h-12 wahi hai
 * jo navbar istemal karta hai, is liye purani jagahen jaisi thin waisi
 * hi rehti hain.
 */
export function Logo({
  className,
  imageClassName = "h-12 w-auto",
}: {
  className?: string;
  imageClassName?: string;
}) {
  return (
    <span className={cn("inline-flex items-center", className)}>
      <Image
        src="/logo.png"
        alt="NextBite"
        width={140}
        height={48}
        priority
        className={cn("object-contain", imageClassName)}
      />
    </span>
  );
}
