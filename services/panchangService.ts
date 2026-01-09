
import { GoogleGenAI, Type } from "@google/genai";
import { PanchangData } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function fetchDailyPanchang(date: string, location?: string): Promise<PanchangData> {
  const prompt = `
    Generate the Hindu Panchang (Lunisolar Calendar) details for the following date: ${date}.
    Location Context: ${location || 'Varanasi, India'}.
    
    You MUST provide every field in both English (en) and Devanagari/Hindi (hi).
    Terminologies like Tithi, Nakshatra, Yoga, Karana, Paksha, Maas, and Ritu should be accurate spiritual terms.
    
    Include:
    - Shaka Samvat (Year and Name)
    - Vikram Samvat
    - Any Hindu festivals occurring on this day.
    - A spiritual quote from the Bhagavad Gita or Upanishads (accurate Sanskrit-to-Hindi and English).
    - Indicate if it's an Adhik Maas (Intercalary Month).
  `;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          tithi: { 
            type: Type.OBJECT, 
            properties: { en: { type: Type.STRING }, hi: { type: Type.STRING } },
            required: ["en", "hi"]
          },
          vara: { 
            type: Type.OBJECT, 
            properties: { en: { type: Type.STRING }, hi: { type: Type.STRING } },
            required: ["en", "hi"]
          },
          nakshatra: { 
            type: Type.OBJECT, 
            properties: { en: { type: Type.STRING }, hi: { type: Type.STRING } },
            required: ["en", "hi"]
          },
          yoga: { 
            type: Type.OBJECT, 
            properties: { en: { type: Type.STRING }, hi: { type: Type.STRING } },
            required: ["en", "hi"]
          },
          karana: { 
            type: Type.OBJECT, 
            properties: { en: { type: Type.STRING }, hi: { type: Type.STRING } },
            required: ["en", "hi"]
          },
          paksha: { 
            type: Type.OBJECT, 
            properties: { en: { type: Type.STRING }, hi: { type: Type.STRING } },
            required: ["en", "hi"]
          },
          maas: { 
            type: Type.OBJECT, 
            properties: { en: { type: Type.STRING }, hi: { type: Type.STRING } },
            required: ["en", "hi"]
          },
          ritu: { 
            type: Type.OBJECT, 
            properties: { en: { type: Type.STRING }, hi: { type: Type.STRING } },
            required: ["en", "hi"]
          },
          adhikMaas: { type: Type.BOOLEAN },
          shakaSamvat: { type: Type.STRING },
          vikramSamvat: { type: Type.STRING },
          festivals: { 
            type: Type.ARRAY,
            items: { 
              type: Type.OBJECT,
              properties: { en: { type: Type.STRING }, hi: { type: Type.STRING } },
              required: ["en", "hi"]
            }
          },
          spiritualQuote: { 
            type: Type.OBJECT, 
            properties: { en: { type: Type.STRING }, hi: { type: Type.STRING } },
            required: ["en", "hi"]
          }
        },
        required: ["tithi", "vara", "nakshatra", "yoga", "karana", "paksha", "maas", "ritu", "shakaSamvat", "festivals", "spiritualQuote"]
      }
    }
  });

  const result = JSON.parse(response.text.trim());
  return result as PanchangData;
}
