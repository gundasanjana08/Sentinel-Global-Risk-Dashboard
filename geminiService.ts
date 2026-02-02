
import { GoogleGenAI, Type } from "@google/genai";
import { RiskAnalysis, SecurityIncident } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const analyzeRiskIncident = async (incident: SecurityIncident): Promise<RiskAnalysis> => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Analyze the following security incident and provide a risk assessment in JSON format:
    Incident: ${incident.title}
    Location: ${incident.location}
    Details: ${incident.description}
    
    The response must follow this schema:
    - overallScore: number (0-100)
    - geopoliticalFactor: number (0-100)
    - infrastructureVulnerability: number (0-100)
    - economicStability: number (0-100)
    - summary: string
    - recommendations: array of strings`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          overallScore: { type: Type.NUMBER },
          geopoliticalFactor: { type: Type.NUMBER },
          infrastructureVulnerability: { type: Type.NUMBER },
          economicStability: { type: Type.NUMBER },
          summary: { type: Type.STRING },
          recommendations: { type: Type.ARRAY, items: { type: Type.STRING } }
        },
        required: ["overallScore", "geopoliticalFactor", "infrastructureVulnerability", "economicStability", "summary", "recommendations"]
      }
    }
  });

  return JSON.parse(response.text);
};

export const generateDailyBriefing = async (incidents: SecurityIncident[]): Promise<string> => {
  const incidentList = incidents.map(i => `- [${i.category}] ${i.title} in ${i.location}`).join('\n');
  
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Generate a high-level executive geopolitical brief based on these recent events:
    ${incidentList}
    
    Focus on:
    1. Cross-border implications.
    2. Supply chain impact.
    3. Resilience recommendations for global enterprises.
    
    Keep it professional, concise, and formatted in Markdown.`,
  });

  return response.text || "Unable to generate brief at this time.";
};
