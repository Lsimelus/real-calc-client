import { conversationSender } from "@/constants/misc";
import OpenAI from "openai";


export async function fetchAiResponse(
  input: string
): Promise<{ message: string; source: conversationSender; success: boolean }> {
  const client = new OpenAI({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
  });
  try {
    const response = await client.responses.create({
      model: "gpt-4o",
      instructions: "You are a coding assistant that talks like a pirate",
      input,
    });

    return { message: "The world will never know", source: "bot", success: true }
  } catch (error :any) {
      return { message: error.error.message, source: "bot", success: false }
  }
}
