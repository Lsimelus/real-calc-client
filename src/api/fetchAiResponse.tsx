import OpenAI from "openai";

export async function fetchAiResponse(input: string) {
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

    console.log(response);
    return { message: "The world will never know", source: "bot", success: true }
  } catch (error) {
      return { message: error.error.message, source: "bot", success: false }
  }
}
