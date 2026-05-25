const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL

export async function sendChatMessage(message: string, history: unknown[]) {
  const response = await fetch(`${API_BASE_URL}/api/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message, history }),
  })
  return response.json()
}
