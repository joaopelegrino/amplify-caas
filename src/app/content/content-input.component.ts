import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AIService } from '../services/ai.service';
import { StateService } from '../services/state.service';
import { LoadingComponent } from '../components/loading.component';

@Component({
  selector: 'app-content-input',
  standalone: true,
  imports: [CommonModule, FormsModule, LoadingComponent],
  template: `
    <div class="content-input-container">
      <div class="progress-bar">
        <div class="progress-step active">Entrada de Conteúdo</div>
        <div class="progress-indicator">Etapa 1 de 4</div>
      </div>

      <div class="input-section">
        <h2>Entrada de Conteúdo</h2>
        
        <div class="input-options">
          <div class="option active">
            <div class="icon-container">
              <i class="fas fa-file-alt"></i>
            </div>
            <span>Texto</span>
          </div>
          <div class="option disabled">
            <div class="icon-container">
              <i class="fas fa-video"></i>
            </div>
            <span>Vídeo</span>
            <span class="pro-badge">PRO</span>
          </div>
          <div class="option disabled">
            <div class="icon-container">
              <i class="fas fa-microphone"></i>
            </div>
            <span>Áudio</span>
            <span class="pro-badge">PRO</span>
          </div>
        </div>

        <div class="text-input-area">
          <label>Digite ou cole o texto</label>
          <textarea 
            [(ngModel)]="content"
            placeholder="Cole aqui o conteúdo que deseja transformar em artigo..."
            rows="8"
            [disabled]="isAnalyzing"
          ></textarea>
          
          <div class="error-message" *ngIf="error">
            {{ error }}
          </div>
        </div>

        <div class="info-box">
          <i class="fas fa-info-circle"></i>
          <p>Para melhores resultados, certifique-se que o conteúdo seja relacionado à área da saúde.</p>
          <p class="note">As funcionalidades de vídeo e áudio estão disponíveis apenas na versão PRO.</p>
        </div>

        <button 
          class="submit-button" 
          (click)="onSubmit()"
          [disabled]="isAnalyzing || !content.trim()"
        >
          {{ isAnalyzing ? 'Processando...' : 'Gerar Artigo' }}
        </button>
      </div>

      <app-loading *ngIf="showLoading"></app-loading>
    </div>
  `,
  styles: [`
    .content-input-container {
      background: white;
      border-radius: 8px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    }
    .progress-bar {
      padding: 1rem;
      border-bottom: 1px solid #e2e8f0;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .progress-step {
      color: #4299e1;
      font-weight: 500;
    }
    .progress-indicator {
      color: #718096;
      font-size: 0.875rem;
    }
    .input-section {
      padding: 2rem;
    }
    h2 {
      margin-bottom: 1.5rem;
      font-size: 1.25rem;
      color: #2d3748;
    }
    .input-options {
      display: flex;
      gap: 1rem;
      margin-bottom: 2rem;
    }
    .option {
      flex: 1;
      padding: 1rem;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      text-align: center;
      cursor: pointer;
    }
    .option.active {
      border-color: #4299e1;
      background-color: #ebf8ff;
    }
    .option.disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
    .icon-container {
      margin-bottom: 0.5rem;
      color: #4299e1;
    }
    .pro-badge {
      background: #805ad5;
      color: white;
      padding: 0.125rem 0.375rem;
      border-radius: 9999px;
      font-size: 0.75rem;
      margin-left: 0.5rem;
    }
    .text-input-area {
      margin-bottom: 1.5rem;
    }
    textarea {
      width: 100%;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      padding: 0.75rem;
      font-size: 1rem;
      resize: vertical;
    }
    .info-box {
      background: #ebf8ff;
      border-radius: 8px;
      padding: 1rem;
      margin-bottom: 1.5rem;
      font-size: 0.875rem;
      color: #2c5282;
    }
    .note {
      color: #718096;
      font-size: 0.75rem;
      margin-top: 0.5rem;
    }
    .submit-button {
      width: 100%;
      background: #4299e1;
      color: white;
      padding: 0.75rem;
      border-radius: 8px;
      border: none;
      font-weight: 500;
      cursor: pointer;
      transition: background-color 0.2s;
    }
    .submit-button:hover {
      background: #3182ce;
    }
    @media (max-width: 640px) {
      .input-options {
        flex-direction: column;
      }
      .input-section {
        padding: 1rem;
      }
    }
    .error-message {
      color: #e53e3e;
      font-size: 0.875rem;
      margin-top: 0.5rem;
    }
    .submit-button:disabled {
      background-color: #a0aec0;
      cursor: not-allowed;
    }
  `]
})
export class ContentInputComponent {
  content: string = '';
  isAnalyzing = false;
  error: string | null = null;
  showLoading = false;

  constructor(
    private aiService: AIService,
    private router: Router,
    private stateService: StateService
  ) {}

  async onSubmit() {
    if (!this.content.trim()) {
      this.error = 'Por favor, insira algum conteúdo para análise.';
      return;
    }

    try {
      this.isAnalyzing = true;
      this.showLoading = true;
      this.error = null;

      console.log('Iniciando análise do conteúdo:', this.content);
      
      const analysis = await this.aiService.analyzeContent(this.content);
      console.log('Análise concluída:', analysis);
      
      this.stateService.setContent(this.content);
      this.stateService.setAnalysis(analysis);
      
      await this.router.navigate(['/analysis']);
      
    } catch (error) {
      console.error('Erro durante análise:', error);
      this.error = 'Erro ao processar o conteúdo. Por favor, tente novamente.';
    } finally {
      this.isAnalyzing = false;
      this.showLoading = false;
    }
  }
} 