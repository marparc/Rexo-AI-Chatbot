"use client"

import * as React from "react"
import { Button } from "@/components/atoms/button"
import { Input } from "@/components/atoms/input"
import { Label } from "@/components/atoms/label"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

export default function ChatbotPage() {
  const [messages, setMessages] = React.useState<Message[]>([])
  const [input, setInput] = React.useState("")
  const [isLoading, setIsLoading] = React.useState(false)
  const messagesEndRef = React.useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  React.useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleNewChat = () => {
    setMessages([])
    setInput("")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      const response = await fetch("http://localhost:8000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMessage.content,
          history: messages,
        }),
      })

      const data = await response.json()

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.response || "Sorry, I couldn't process that.",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error("Error:", error)
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: "Sorry, there was an error processing your request.",
          timestamp: new Date(),
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  return (
    <div className="relative flex flex-1 overflow-hidden bg-[#0a0a0f]">
      {/* Background glow orbs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-60 -left-60 h-[500px] w-[500px] rounded-full bg-fuchsia-600/8 blur-[120px]" />
        <div className="absolute -right-60 -bottom-60 h-[500px] w-[500px] rounded-full bg-violet-600/8 blur-[120px]" />
      </div>

      {/* Main */}
      <div className="relative flex flex-1 flex-col">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto">
          {messages.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center px-4 text-center">
              {/* Glow icon */}
              <div className="relative mx-auto mb-6 h-16 w-16">
                <div className="absolute inset-0 rounded-full bg-fuchsia-500/20 blur-xl" />
                <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-fuchsia-500 to-violet-600 shadow-xl shadow-fuchsia-500/30">
                  <svg
                    className="ml-4 h-7 w-7 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 3l1.5 7.5L21 12l-7.5 1.5L12 21l-1.5-7.5L3 12l7.5-1.5L12 3z" />
                  </svg>
                </div>
              </div>
              <h2 className="text-2xl font-bold tracking-tight text-white">
                How can I help you?
              </h2>
              <p className="mt-2 text-sm text-neutral-600">
                Ask Rexo anything.
              </p>
            </div>
          ) : (
            <div className="mx-auto max-w-2xl space-y-6 px-4 py-8">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${message.role === "user" ? "flex-row-reverse" : ""}`}
                >
                  {/* Avatar */}
                  {message.role === "assistant" && (
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-fuchsia-500 to-violet-600 shadow-lg shadow-fuchsia-500/20">
                      <div className="h-1.5 w-1.5 rounded-full bg-white" />
                    </div>
                  )}

                  {/* Bubble */}
                  <div
                    className={`max-w-[75%] ${message.role === "user" ? "items-end" : "items-start"} flex flex-col gap-1`}
                  >
                    {message.role === "user" ? (
                      <div className="rounded-2xl rounded-tr-sm bg-gradient-to-br from-fuchsia-500 to-violet-600 px-4 py-2.5 shadow-lg shadow-fuchsia-500/20">
                        <p className="text-sm leading-relaxed text-white">
                          {message.content}
                        </p>
                      </div>
                    ) : (
                      <div className="rounded-2xl rounded-tl-sm bg-[#1a1a24] px-4 py-2.5 ring-1 ring-white/8">
                        <p className="text-sm leading-relaxed text-neutral-200">
                          {message.content}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* User avatar */}
                  {message.role === "user" && (
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/10">
                      <svg
                        className="h-4 w-4 text-neutral-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    </div>
                  )}
                </div>
              ))}

              {isLoading && (
                <div className="flex gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-fuchsia-500 to-violet-600 shadow-lg shadow-fuchsia-500/20">
                    <div className="h-1.5 w-1.5 rounded-full bg-white" />
                  </div>
                  <div className="rounded-2xl rounded-tl-sm bg-[#1a1a24] px-4 py-3 ring-1 ring-white/8">
                    <div className="flex items-center gap-1.5">
                      <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-fuchsia-400 [animation-delay:-0.3s]" />
                      <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-fuchsia-400 [animation-delay:-0.15s]" />
                      <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-fuchsia-400" />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Input */}
        <div className="border-t border-white/5 bg-[#0a0a0f]/80 p-4 backdrop-blur-xl">
          <div className="mx-auto max-w-2xl">
            <form onSubmit={handleSubmit} className="relative">
              <Label htmlFor="message" className="sr-only">
                Message
              </Label>
              <Input
                id="message"
                type="text"
                placeholder="Ask Rexo anything..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isLoading}
                className="h-12 rounded-2xl border-white/10 bg-white/5 pr-14 text-white placeholder:text-neutral-700 focus-visible:border-fuchsia-500/40 focus-visible:ring-fuchsia-500/15"
              />
              <Button
                type="submit"
                disabled={!input.trim() || isLoading}
                size="icon"
                className="absolute top-1/2 right-1.5 -translate-y-1/2 rounded-xl bg-gradient-to-br from-fuchsia-500 to-violet-600 shadow-lg shadow-fuchsia-500/30 hover:brightness-110 disabled:opacity-20"
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
                    d="M5 10l7-7m0 0l7 7m-7-7v18"
                  />
                </svg>
              </Button>
            </form>
            <p className="mt-2 text-center text-xs text-neutral-800">
              Rexo can make mistakes. Verify important information.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
