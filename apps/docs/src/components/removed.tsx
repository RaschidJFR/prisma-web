import type { ReactNode } from "react";
import { cn } from "@prisma-docs/ui/lib/cn";

/**
 * Review aid: marks content that a pull request removes with a soft red
 * background. Like <Added>, it renders its children unchanged unless
 * NEXT_PUBLIC_HIGHLIGHT_NEW=1 is set. Remove the wrappers, and the content
 * inside them, before merging.
 *
 * Removed supersedes Added: any <Added> nested inside renders without its green
 * styling (see the `data-added` selectors below), so the whole region reads red.
 */
export function Removed({ children, inline = false }: { children: ReactNode; inline?: boolean }) {
  if (process.env.NEXT_PUBLIC_HIGHLIGHT_NEW !== "1") return <>{children}</>;

  const neutralizeAdded =
    "[&_[data-added]]:border-transparent [&_[data-added]]:bg-transparent";

  if (inline) {
    return (
      <span
        className={cn("rounded-sm bg-red-500/15 px-0.5 line-through decoration-red-500/60", neutralizeAdded)}
      >
        {children}
      </span>
    );
  }

  return (
    <div
      className={cn(
        "-ml-4 my-4 rounded-r-md border-l-4 border-red-500/60 bg-red-500/10 py-1 pl-3 pr-2",
        "[&>*:first-child]:mt-0 [&>*:last-child]:mb-0",
        neutralizeAdded,
      )}
    >
      {children}
    </div>
  );
}
