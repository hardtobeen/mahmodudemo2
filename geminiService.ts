
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

const getAI = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.warn("API_KEY is missing. AI features will be disabled.");
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

export const generateChatResponse = async (history: { role: 'user' | 'model', parts: { text: string }[] }[]) => {
  const ai = getAI();
  if (!ai) return "AI services are not configured. Please add an API Key to your environment.";

  try {
    const chat = ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: history.map(h => ({ role: h.role, parts: h.parts })),
      config: {
        systemInstruction: "You are a helpful Assistant. You help users manage their projects and provide technical support. Keep answers concise and professional.",
      }
    });

    const response = await chat;
    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "There was an error communicating with the AI service.";
  }
};

export const summarizeRequests = async (requests: any[]) => {
  const ai = getAI();
  if (!ai) return "AI services are not configured.";

  const prompt = `Summarize these requests and provide actionable advice: ${JSON.stringify(requests)}`;
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [{ parts: [{ text: prompt }] }]
    });
    return response.text;
  } catch (error) {
    return "Error generating summary.";
  }
};
