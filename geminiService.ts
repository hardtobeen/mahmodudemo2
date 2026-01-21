
import { GoogleGenAI } from "@google/genai";

/* 
 * Gemini Service using @google/genai
 * Always creates a new GoogleGenAI instance with { apiKey: process.env.API_KEY } 
 * right before making API calls as per the latest SDK guidelines.
 */

export const generateChatResponse = async (history: { role: 'user' | 'model', parts: { text: string }[] }[]) => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    return "AI services are not configured. Please add an API Key to your environment.";
  }

  /* Create instance inside the function as recommended to ensure fresh environment config */
  const ai = new GoogleGenAI({ apiKey });

  try {
    /* Use gemini-3-flash-preview for general text/chat tasks */
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: history.map(h => ({ role: h.role, parts: h.parts })),
      config: {
        systemInstruction: "You are a helpful Assistant. You help users manage their projects and provide technical support. Keep answers concise and professional.",
      }
    });

    /* Correct property access: .text (not .text()) as per SDK rules */
    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "There was an error communicating with the AI service.";
  }
};

export const summarizeRequests = async (requests: any[]) => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) return "AI services are not configured.";

  const ai = new GoogleGenAI({ apiKey });
  const prompt = `Summarize these requests and provide actionable advice: ${JSON.stringify(requests)}`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt
    });
    
    /* Correct property access: .text */
    return response.text;
  } catch (error) {
    console.error("Gemini Summarization Error:", error);
    return "Error generating summary.";
  }
};
