"use client"

import * as React from "react"
import { Button } from "@/components/atoms/button"

interface ModalProps {
  title: string
  description?: string
  confirmLabel?: string
  icon?: React.ReactNode
  onClose: () => void
  onConfirm?: () => void
}

export function Modal({
  title,
  description,
  confirmLabel = "Got it",
  icon,
  onClose,
  onConfirm,
}: ModalProps) {
  return (
    <div
      className="absolute inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-sm rounded-2xl border border-white/5 bg-[#0a0a0f] p-8 shadow-2xl shadow-black/60"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Background glow */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
          <div className="absolute -top-20 -left-20 h-40 w-40 rounded-full bg-fuchsia-600/10 blur-[60px]" />
          <div className="absolute -right-20 -bottom-20 h-40 w-40 rounded-full bg-violet-600/10 blur-[60px]" />
        </div>

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 flex h-7 w-7 cursor-pointer items-center justify-center rounded-lg text-neutral-600 transition-colors hover:bg-white/5 hover:text-neutral-300"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div className="relative flex flex-col items-center gap-5 text-center">
          {/* Icon */}
          {icon && (
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-fuchsia-500/20 blur-xl" />
              <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-fuchsia-500 to-violet-600 shadow-lg shadow-fuchsia-500/30">
                {icon}
              </div>
            </div>
          )}

          {/* Text */}
          <div className="flex flex-col gap-1.5">
            <h3 className="text-base font-bold tracking-tight text-white">
              {title}
            </h3>
            {description && (
              <p className="text-sm text-neutral-600">{description}</p>
            )}
          </div>

          {/* Button */}
          <Button
            size="sm"
            onClick={onConfirm ?? onClose}
            className="mt-1 w-full bg-gradient-to-br from-fuchsia-500 to-violet-600 text-white shadow-lg shadow-fuchsia-500/30 hover:brightness-110"
          >
            {confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  )
}
