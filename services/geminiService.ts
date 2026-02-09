
import { GoogleGenAI, Type } from "@google/genai";

/**
 * Expert Solana ecosystem analyst. Summarizes project intention and innovation.
 * Uses gemini-3-flash-preview for efficiency.
 */
export async function analyzeProjectIntent(prompt: string) {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `You are an expert Solana ecosystem analyst. Summarize the following project intention and explain why it is innovative: ${prompt}`,
      config: {
        thinkingConfig: { thinkingBudget: 0 }
      }
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "The project aims to revolutionize digital asset ownership on Solana through seamless integration and AI-driven insights.";
  }
}

/**
 * Generates short, punchy lore for NFTs using structured JSON response.
 */
export async function generateNFTLore(id: number, rarity: string) {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Generate a short, cool 2-sentence lore for an NFT with ID #${id} and rarity: ${rarity}. The theme is cyberpunk-neon-solana.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            lore: {
              type: Type.STRING,
              description: "The generated lore text."
            }
          },
          required: ["lore"]
        }
      }
    });
    
    // Direct access to .text property as per guidelines
    const jsonStr = response.text.trim();
    const data = JSON.parse(jsonStr || '{"lore": "A mysterious fragment of the digital void."}');
    return data.lore;
  } catch (error) {
    console.error("Lore Generation Error:", error);
    return "A digital relic forged in the fires of the blockchain.";
  }
}
