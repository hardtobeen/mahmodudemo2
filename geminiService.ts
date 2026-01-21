
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateChatResponse = async (history: { role: 'user' | 'model', parts: { text: string }[] }[]) => {
  const ai = getAI();
  const chat = ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: history.map(h => ({ role: h.role, parts: h.parts })),
    config: {
      systemInstruction: "You are a helpful Assistant. You help users manage their projects and provide technical support. Keep answers concise and professional.",
    }
  });

  const response = await chat;
  return response.text;
};

export const summarizeRequests = async (requests: any[]) => {
  const ai = getAI();
  const prompt = `Summarize these requests and provide actionable advice: ${JSON.stringify(requests)}`;
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: [{ parts: [{ text: prompt }] }]
  });
  return response.text;
};
