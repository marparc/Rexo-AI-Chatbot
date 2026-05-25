import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "h-9 w-full min-w-0 rounded-xl border border-white/10 bg-white/5 px-3.5 py-1 text-sm text-white transition-all outline-none placeholder:text-neutral-600 focus-visible:border-fuchsia-500/50 focus-visible:bg-white/8 focus-visible:ring-2 focus-visible:ring-fuchsia-500/20 disabled:pointer-events-none disabled:opacity-40",
        className
      )}
      {...props}
    />
  )
}

export { Input }
