import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "rounded-sm px-2 py-0.5 text-xs font-semibold tracking-widest inline-flex items-center uppercase transition-colors",
  {
    variants: {
      variant: {
        default: "bg-red-600/10 text-red-500 ring-red-600/20 ring-1",
        secondary: "bg-white/5 text-neutral-400 ring-white/10 ring-1",
        outline: "border-white/10 text-neutral-400 border",
        destructive: "bg-red-950/60 text-red-400 ring-red-900/40 ring-1",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant,
  ...props
}: React.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return (
    <span
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
