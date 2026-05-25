"use client"

import * as React from "react"
import { Button } from "@/components/atoms/button"
import { Modal } from "../atoms/modal"

export function Navbar() {
  const [isModalOpen, setIsModalOpen] = React.useState(false)

  return (
    <>
      <header className="flex items-center justify-between border-b border-white/5 bg-[#0a0a0f]/80 px-5 py-3 backdrop-blur-xl">
        <div className="flex items-center gap-2.5">
          <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-gradient-to-br from-fuchsia-500 to-violet-600 shadow-lg shadow-fuchsia-500/30">
            <div className="h-1.5 w-1.5 rounded-full bg-white" />
          </div>
          <span className="text-sm font-bold tracking-wide text-white">
            Rexo
          </span>
          <svg
            className="h-3.5 w-3.5 text-neutral-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsModalOpen(true)}
          >
            Log in
          </Button>
          <Button size="sm" onClick={() => setIsModalOpen(true)}>
            Sign up
          </Button>
        </div>
      </header>

      {isModalOpen && (
        <Modal
          title="This feature is not available."
          description="Check back later for updates."
          onClose={() => setIsModalOpen(false)}
          icon={
            <svg
              className="h-6 w-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
              />
            </svg>
          }
        />
      )}
    </>
  )
}
