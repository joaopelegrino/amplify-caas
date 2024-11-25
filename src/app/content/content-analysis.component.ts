import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ContentAnalysis } from '../models/content.model';
import { Router } from '@angular/router';
import { StateService } from '../services/state.service';

@Component({
  selector: 'app-content-analysis',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="analysis-container">
      <div class="progress-bar">
        <div class="progress-step">Análise do Conteúdo</div>
        <div class="progress-indicator">Etapa 2 de 4</div>
      </div>

      <div class="analysis-section">
        <h2>Análise do Conteúdo</h2>
        <a class="back-link" (click)="goBack()">← Voltar</a>

        <div class="info-found">
          <h3>Informações Encontradas</h3>
          <div class="professional-info">
            <h4>Sobre o Profissional</h4>
            <ul>
              <li>Nome: {{ analysis?.professionalInfo?.name || 'Não identificado' }}</li>
              <li>Especialidade: {{ analysis?.professionalInfo?.specialty || 'Não identificada' }}</li>
            </ul>
          </div>

          <div class="technical-details" *ngIf="hasTechnicalDetails()">
            <h4>Detalhes Técnicos</h4>
            
            <div *ngIf="analysis?.technicalDetails?.medications?.length">
              <h5>Medicamentos Mencionados:</h5>
              <ul>
                <li *ngFor="let med of analysis?.technicalDetails?.medications">{{ med }}</li>
              </ul>
            </div>

            <div *ngIf="analysis?.technicalDetails?.treatments?.length">
              <h5>Tratamentos Mencionados:</h5>
              <ul>
                <li *ngFor="let treatment of analysis?.technicalDetails?.treatments">{{ treatment }}</li>
              </ul>
            </div>

            <div *ngIf="analysis?.technicalDetails?.claims?.length">
              <h5>Afirmações Científicas:</h5>
              <ul>
                <li *ngFor="let claim of analysis?.technicalDetails?.claims">{{ claim }}</li>
              </ul>
            </div>
          </div>
        </div>

        <div class="required-info">
          <h3>Informações Necessárias</h3>
          <p>Para garantir a credibilidade e segurança do artigo, precisamos das seguintes informações:</p>
          
          <form (ngSubmit)="onSubmit()" #form="ngForm">
            <div class="form-group">
              <label for="name">Nome completo *</label>
              <input 
                type="text" 
                id="name"
                [(ngModel)]="formData.name"
                name="name"
                required
                [placeholder]="analysis?.professionalInfo?.name || 'Ex: Dr. João Silva'"
                [class.invalid]="submitted && !formData.name"
              >
              <span class="error-message" *ngIf="submitted && !formData.name">
                Nome é obrigatório
              </span>
            </div>

            <div class="form-group">
              <label for="registration">Registro profissional (CRM) *</label>
              <input 
                type="text" 
                id="registration"
                [(ngModel)]="formData.registration"
                name="registration"
                required
                placeholder="Ex: CRM/SP 123456"
                pattern="^CRM\/[A-Z]{2}\s*\d{4,6}$"
                [class.invalid]="submitted && !isValidCRM(formData.registration)"
              >
              <span class="error-message" *ngIf="submitted && !isValidCRM(formData.registration)">
                CRM inválido. Use o formato: CRM/UF 123456
              </span>
            </div>

            <div class="form-group">
              <label for="specialty">Especialidade *</label>
              <input 
                type="text" 
                id="specialty"
                [(ngModel)]="formData.specialty"
                name="specialty"
                required
                [placeholder]="analysis?.professionalInfo?.specialty || 'Ex: Cardiologia'"
                [class.invalid]="submitted && !formData.specialty"
              >
              <span class="error-message" *ngIf="submitted && !formData.specialty">
                Especialidade é obrigatória
              </span>
            </div>

            <div class="form-group">
              <label for="address">Endereço de atendimento *</label>
              <input 
                type="text" 
                id="address"
                [(ngModel)]="formData.address"
                name="address"
                required
                placeholder="Ex: Av. Paulista, 1000 - São Paulo/SP"
                [class.invalid]="submitted && !formData.address"
              >
              <span class="error-message" *ngIf="submitted && !formData.address">
                Endereço é obrigatório
              </span>
            </div>

            <div class="form-group">
              <label for="phone">Telefone de contato *</label>
              <input 
                type="tel" 
                id="phone"
                [(ngModel)]="formData.phone"
                name="phone"
                required
                placeholder="(11) 99999-9999"
                pattern="^\(\d{2}\)\s?\d{4,5}-\d{4}$"
                [class.invalid]="submitted && !isValidPhone(formData.phone)"
              >
              <span class="error-message" *ngIf="submitted && !isValidPhone(formData.phone)">
                Telefone inválido. Use o formato: (11) 99999-9999
              </span>
            </div>

            <div class="form-group">
              <label for="email">Email de contato *</label>
              <input 
                type="email" 
                id="email"
                [(ngModel)]="formData.email"
                name="email"
                required
                placeholder="exemplo@email.com"
                pattern="^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$"
                [class.invalid]="submitted && !isValidEmail(formData.email)"
              >
              <span class="error-message" *ngIf="submitted && !isValidEmail(formData.email)">
                Email inválido
              </span>
            </div>

            <button type="submit" class="next-button" [disabled]="isSubmitting">
              {{ isSubmitting ? 'Processando...' : 'Prosseguir para Próxima Etapa' }}
            </button>
          </form>
        </div>

        <div class="warnings">
          <h4>Avisos Importantes que serão adicionados no texto final</h4>
          <ul>
            <li>Este conteúdo é apenas para fins informativos e não substitui a consulta com um profissional de saúde</li>
            <li>Os resultados individuais podem variar</li>
            <li>É importante buscar ajuda profissional se você estiver enfrentando problemas de saúde</li>
            <li>Não use produtos sem orientação médica</li>
          </ul>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .analysis-container {
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
    .back-link {
      color: #4a5568;
      cursor: pointer;
      text-decoration: none;
      display: inline-block;
      margin-bottom: 1rem;
    }
    .analysis-section {
      padding: 2rem;
    }
    .info-found {
      background: #f0fff4;
      padding: 1rem;
      border-radius: 8px;
      margin-bottom: 2rem;
    }
    .form-group {
      margin-bottom: 1.5rem;
    }
    label {
      display: block;
      margin-bottom: 0.5rem;
      color: #4a5568;
      font-weight: 500;
    }
    input {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid #e2e8f0;
      border-radius: 4px;
      font-size: 1rem;
      transition: border-color 0.2s;
    }
    input:focus {
      outline: none;
      border-color: #4299e1;
      box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.1);
    }
    input.invalid {
      border-color: #e53e3e;
    }
    .error-message {
      color: #e53e3e;
      font-size: 0.875rem;
      margin-top: 0.25rem;
    }
    .next-button {
      width: 100%;
      padding: 0.75rem;
      background: #4299e1;
      color: white;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      font-weight: 500;
      transition: background-color 0.2s;
    }
    .next-button:hover {
      background: #3182ce;
    }
    .next-button:disabled {
      background: #a0aec0;
      cursor: not-allowed;
    }
    .warnings {
      margin-top: 2rem;
      padding: 1rem;
      background: #fff5f5;
      border-radius: 8px;
    }
    h4, h5 {
      color: #2d3748;
      margin-bottom: 0.5rem;
    }
    ul {
      list-style-type: none;
      padding-left: 0;
    }
    li {
      margin-bottom: 0.5rem;
      color: #4a5568;
    }
    .technical-details div {
      margin-bottom: 1rem;
    }
  `]
})
export class ContentAnalysisComponent implements OnInit {
  analysis?: ContentAnalysis;
  formData = {
    name: '',
    registration: '',
    specialty: '',
    address: '',
    phone: '',
    email: ''
  };
  submitted = false;
  isSubmitting = false;

  constructor(
    private router: Router,
    private stateService: StateService
  ) {}

  ngOnInit() {
    this.stateService.analysis$.subscribe(analysis => {
      if (analysis) {
        this.analysis = analysis;
        // Pré-preencher campos se houver informações
        if (analysis.professionalInfo) {
          this.formData.name = analysis.professionalInfo.name || '';
          this.formData.specialty = analysis.professionalInfo.specialty || '';
        }
      }
    });
  }

  goBack() {
    this.router.navigate(['/']);
  }

  isValidCRM(crm: string): boolean {
    if (!crm) return false;
    return /^CRM\/[A-Z]{2}\s*\d{4,6}$/.test(crm);
  }

  isValidPhone(phone: string): boolean {
    if (!phone) return false;
    return /^\(\d{2}\)\s?\d{4,5}-\d{4}$/.test(phone);
  }

  isValidEmail(email: string): boolean {
    if (!email) return false;
    return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email);
  }

  hasTechnicalDetails(): boolean {
    return !!(
      this.analysis?.technicalDetails &&
      (
        (this.analysis.technicalDetails.medications?.length > 0) ||
        (this.analysis.technicalDetails.treatments?.length > 0) ||
        (this.analysis.technicalDetails.claims?.length > 0)
      )
    );
  }

  async onSubmit() {
    this.submitted = true;

    if (!this.formData.name || 
        !this.isValidCRM(this.formData.registration) ||
        !this.formData.specialty ||
        !this.formData.address ||
        !this.isValidPhone(this.formData.phone) ||
        !this.isValidEmail(this.formData.email)) {
      return;
    }

    this.isSubmitting = true;

    try {
      // Salvar dados do formulário no estado
      this.stateService.setAuthorInfo({
        name: this.formData.name,
        registration: this.formData.registration,
        specialty: this.formData.specialty,
        address: this.formData.address,
        phone: this.formData.phone,
        email: this.formData.email
      });

      await this.router.navigate(['/references']);
    } catch (error) {
      console.error('Erro ao prosseguir:', error);
    } finally {
      this.isSubmitting = false;
    }
  }
} 