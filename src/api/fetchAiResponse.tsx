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
    return response.output_text;
  } catch (error) {
    console.log(error);
    return "Stop wil done show?";
  } finally {
    console.log("Done~~~~");
  }
}
