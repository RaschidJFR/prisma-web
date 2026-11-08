import type { ReactNode } from "react";
import { cn } from "@prisma-docs/ui/lib/cn";

/**
 * Review aid: marks prose that is new in a pull request with a soft green
 * background. It renders its children unchanged unless
 * NEXT_PUBLIC_HIGHLIGHT_NEW=1 is set, so a wrapper left in a page does nothing
 * in production. Remove the wrappers before merging.
 */
export function Added({ children, inline = false }: { children: ReactNode; inline?: boolean }) {
  if (process.env.NEXT_PUBLIC_HIGHLIGHT_NEW !== "1") return <>{children}</>;

  if (inline) {
    return (
      <span data-added className="rounded-sm bg-emerald-500/15 px-0.5">
        {children}
      </span>
    );
  }

  return (
    <div
      data-added
      className={cn(
        "-ml-4 my-4 rounded-r-md border-l-4 border-emerald-500/60 bg-emerald-500/10 py-1 pl-3 pr-2",
        "[&>*:first-child]:mt-0 [&>*:last-child]:mb-0",
      )}
    >
      {children}
    </div>
  );
}
