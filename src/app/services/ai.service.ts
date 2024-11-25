import { Injectable } from '@angular/core';
import { ContentAnalysis, GeneratedArticle } from '../models/content.model';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class AIService {
  private genAI!: GoogleGenerativeAI;
  private model: any;

  constructor(private config: ConfigService) {
    this.initializeAI();
  }

  private initializeAI() {
    try {
      const apiKey = this.config.getGeminiApiKey();
      if (!apiKey) {
        throw new Error('API key não encontrada');
      }
      
      this.genAI = new GoogleGenerativeAI(apiKey);
      this.model = this.genAI.getGenerativeModel({ model: 'gemini-pro' });
      
      console.log('Gemini AI inicializado com sucesso');
    } catch (error) {
      console.error('Erro ao inicializar Gemini AI:', error);
      throw new Error('Falha ao inicializar o serviço de IA');
    }
  }

  private cleanJsonResponse(text: string): string {
    // Remove markdown code blocks
    text = text.replace(/```json\n/g, '').replace(/```/g, '');
    // Remove possíveis espaços em branco no início e fim
    return text.trim();
  }

  async analyzeContent(content: string): Promise<ContentAnalysis> {
    if (!this.model) {
      throw new Error('Serviço de IA não inicializado');
    }

    const prompt = `
      Você é um assistente especializado em análise de conteúdo médico.
      Analise o seguinte texto e extraia as informações solicitadas.
      Retorne APENAS um objeto JSON válido com a seguinte estrutura, sem formatação markdown:
      {
        "professionalInfo": {
          "name": "nome do profissional mencionado ou null",
          "specialty": "especialidade mencionada ou null"
        },
        "technicalDetails": {
          "medications": ["lista de medicamentos mencionados"],
          "treatments": ["lista de tratamentos mencionados"],
          "claims": ["lista de afirmações científicas"]
        }
      }

      Texto para análise: "${content}"
    `;

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      try {
        const cleanedText = this.cleanJsonResponse(text);
        console.log('Resposta limpa:', cleanedText);
        return JSON.parse(cleanedText);
      } catch (parseError) {
        console.error('Erro ao fazer parse da resposta:', text);
        return {
          professionalInfo: {
            name: null,
            specialty: null
          },
          technicalDetails: {
            medications: [],
            treatments: [],
            claims: []
          }
        };
      }
    } catch (error) {
      console.error('Erro na análise de conteúdo:', error);
      throw new Error('Falha ao analisar o conteúdo');
    }
  }

  async findReferences(analysis: ContentAnalysis): Promise<string[]> {
    const prompt = `
      Encontre referências científicas relevantes para validar os seguintes pontos:
      - Medicamentos: ${analysis.technicalDetails?.medications.join(', ')}
      - Tratamentos: ${analysis.technicalDetails?.treatments.join(', ')}
      - Claims: ${analysis.technicalDetails?.claims.join(', ')}
      
      Priorize:
      1. Meta-análises e revisões sistemáticas
      2. Estudos dos últimos 5 anos
      3. Publicações em journals de alto impacto
      
      Retorne apenas os DOIs em formato JSON.
    `;

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      return JSON.parse(text);
    } catch (error) {
      console.error('Erro na busca de referências:', error);
      throw error;
    }
  }

  async generateArticle(
    content: string, 
    analysis: ContentAnalysis, 
    references: string[]
  ): Promise<GeneratedArticle> {
    const prompt = `
      Gere um artigo científico baseado no seguinte conteúdo e referências.
      Mantenha um tom profissional e inclua:
      1. Título claro e objetivo
      2. Introdução do tema
      3. Desenvolvimento com evidências científicas
      4. Conclusão
      5. Referências no formato Vancouver
      
      Conteúdo original: ${content}
      Referências disponíveis: ${references.join('\n')}
    `;

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      return JSON.parse(text);
    } catch (error) {
      console.error('Erro na geração do artigo:', error);
      throw error;
    }
  }
} 