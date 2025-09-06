import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'],
});

export async function fetchAiResponse(input: string): Promise<string> {
  const response = await client.responses.create({
    model: 'gpt-4o',
    instructions: 'You are a coding assistant that talks like a pirate',
    input,
  });
  return response.output_text;
}