import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "font-heading relative inline-flex items-baseline text-2xl font-bold tracking-tight",
        className
      )}
    >
      <span className="text-primary">Next</span>
      <span className="relative text-secondary">
        Bite
        {/* leaf */}
        <svg
          viewBox="0 0 24 24"
          className="absolute -top-[0.55em] left-[0.05em] h-[0.6em] w-[0.6em] -rotate-12"
          fill="currentColor"
          aria-hidden
        >
          <path d="M12 22c6-2 9-8 9-16-8 0-14 3-16 9 3-1 6-1 9 0-4 0-7 2-9 7h7z" />
        </svg>
      </span>
    </span>
  );
}
