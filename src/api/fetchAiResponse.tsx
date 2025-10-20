import { conversationSender } from "@/constants/misc";
import { GoogleGenAI } from "@google/genai";

export async function fetchAiResponse(
  input: string,
): Promise<{ message: string; source: conversationSender; success: boolean }> {
  try {
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    const ai = new GoogleGenAI({ apiKey });

    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: input,
      });
      console.log("AI response:", response.text);

      return { message: response.text ?? "", source: "bot", success: true };
    } catch (error: any) {
      console.log("AI1 error:", error);
      return { message: error.error.message, source: "bot", success: false };
    }
  } catch (error: any) {
    console.log("AI2 error:", error);
    return { message: "Secrets failed to load", source: "bot", success: false };
  }
}
