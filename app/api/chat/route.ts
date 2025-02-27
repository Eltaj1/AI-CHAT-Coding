import { openai } from "@ai-sdk/openai"
import { streamText } from "ai"

// Allow streaming responses up to 30 seconds
export const maxDuration = 30

// Use environment variable for API key
const apiKey = process.env.OPENAI_API_KEY

if (!apiKey) {
  throw new Error("OPENAI_API_KEY is not set in environment variables")
}

export async function POST(req: Request) {
  const { messages, model = "gpt-4o" } = await req.json()

  // Use the model specified by the client, or default to gpt-4o
  const selectedModel = model || "gpt-4o"

  const result = streamText({
    model: openai(selectedModel),
    messages,
    temperature: 0.7,
    max_tokens: 2000,
    apiKey: apiKey, // Use the API key from environment variable
  })

  return result.toDataStreamResponse()
}

