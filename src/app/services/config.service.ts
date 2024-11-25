import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private apiKey: string;

  constructor() {
    this.apiKey = environment.geminiApiKey;
    this.validateApiKey();
  }

  private validateApiKey() {
    if (!this.apiKey || this.apiKey.length < 10) {
      console.error('API key não configurada corretamente');
      throw new Error('API key inválida');
    }
  }

  getGeminiApiKey(): string {
    if (!this.apiKey) {
      throw new Error('API key não disponível');
    }
    return this.apiKey;
  }
} 