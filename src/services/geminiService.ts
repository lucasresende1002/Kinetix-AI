import { GoogleGenAI, Type } from "@google/genai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY?.trim();
let aiClient: GoogleGenAI | null = null;

function getAiClient(): GoogleGenAI {
  if (!apiKey) {
    throw new Error(
      "A chave Gemini nao foi configurada. Defina VITE_GEMINI_API_KEY no .env.local e reinicie o servidor.",
    );
  }

  if (!aiClient) {
    aiClient = new GoogleGenAI({ apiKey });
  }

  return aiClient;
}

export interface AthleteData {
  age: number;
  sport: string;
  daysSinceLastInjury: number;
  bpm: number;
  pse: number; // 1-10 (Percepção Subjetiva de Esforço)
  distanceKm: number;
  sleepHours: number;
  stressLevel: number; // 1-10
  currentPainLevel: number; // 0-10
  currentPainLocation: string;
  isRecurrence: boolean;
  isCompensatory: boolean;
  injuryType: string;
  rehabStatus: string;
}

export interface AssessmentResult {
  riskLevel: "Baixo" | "Moderado" | "Alto";
  riskScore: number; // 0-100
  analysis: string;
  recommendations: string[];
  keyFactors: {
    factor: string;
    impact: "Positivo" | "Negativo" | "Neutro";
  }[];
}

export async function assessAthleteRisk(data: AthleteData): Promise<AssessmentResult> {
  const ai = getAiClient();
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Avalie o risco de lesão para este atleta com base nos seguintes dados:
    Idade: ${data.age}
    Esporte: ${data.sport}
    Dias desde a última lesão: ${data.daysSinceLastInjury}
    Tipo da última lesão: ${data.injuryType}
    Status da reabilitação: ${data.rehabStatus}
    É reincidência no mesmo local? ${data.isRecurrence ? "Sim" : "Não"}
    É uma lesão compensatória (efeito cadeia)? ${data.isCompensatory ? "Sim" : "Não"}
    BPM Médio/Máximo: ${data.bpm}
    PSE (Percepção Subjetiva de Esforço): ${data.pse}/10
    Distância Percorrida: ${data.distanceKm} km
    Horas de Sono: ${data.sleepHours}
    Nível de Estresse: ${data.stressLevel}/10
    Nível de Dor Atual: ${data.currentPainLevel}/10 em ${data.currentPainLocation || "N/A"}`,
    config: {
      systemInstruction: "Você é um especialista em medicina esportiva e fisiologia do exercício. Analise os dados do atleta para prever o risco de lesão e fornecer conselhos de recuperação e treino. Considere que reincidência no mesmo local, lesões compensatórias, tipo de lesão (muscular, ligamentar, tendínea) e tempo desde a última lesão são fatores críticos. Responda SEMPRE em Português do Brasil (pt-BR). Seja preciso, científico e direto.",
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          riskLevel: { type: Type.STRING, enum: ["Baixo", "Moderado", "Alto"] },
          riskScore: { type: Type.NUMBER },
          analysis: { type: Type.STRING },
          recommendations: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          },
          keyFactors: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                factor: { type: Type.STRING },
                impact: { type: Type.STRING, enum: ["Positivo", "Negativo", "Neutro"] }
              },
              required: ["factor", "impact"]
            }
          }
        },
        required: ["riskLevel", "riskScore", "analysis", "recommendations", "keyFactors"]
      }
    }
  });

  return JSON.parse(response.text || "{}");
}
