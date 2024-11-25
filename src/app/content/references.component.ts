import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-references',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="references-container">
      <div class="progress-bar">
        <div class="progress-step">Referências</div>
        <div class="progress-indicator">Etapa 3 de 4</div>
      </div>

      <div class="references-section">
        <h2>Referências</h2>
        <a class="back-link" (click)="goBack()">← Voltar</a>

        <div class="manual-input">
          <h3>Adicionar Referências Manualmente</h3>
          <div class="search-box">
            <input 
              type="text" 
              placeholder="Cole o link ou DOI da referência (SciELO, PubMed, etc)"
            >
            <button class="add-button">Adicionar</button>
          </div>
        </div>

        <div class="suggestions">
          <h3>Sugestões do sistema</h3>
          <p>Com base no seu conteúdo, vamos sugerir referências científicas dos principais bancos de dados acadêmicos. Você pode aceitá-las ou não para a produção do seu artigo final.</p>
          
          <button class="search-button">
            Buscar Sugestões de Referências
          </button>
        </div>

        <div class="databases">
          <h4>Bases de Dados Recomendadas:</h4>
          <div class="database-list">
            <div class="database">PubMed</div>
            <div class="database">SciELO</div>
          </div>
          
          <div class="tip">
            💡 Dica: Priorize referências recentes e de alta qualidade que sejam relevantes para seu conteúdo.
          </div>
        </div>

        <button class="next-button" (click)="onNext()">
          Gerar Artigo com Referências Selecionadas
        </button>
      </div>
    </div>
  `,
  styles: [`
    .references-container {
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
    .references-section {
      padding: 2rem;
    }
    .back-link {
      color: #4a5568;
      cursor: pointer;
      text-decoration: none;
      display: inline-block;
      margin-bottom: 1rem;
    }
    .search-box {
      display: flex;
      gap: 1rem;
      margin-bottom: 2rem;
    }
    input {
      flex: 1;
      padding: 0.75rem;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
    }
    .add-button {
      padding: 0.75rem 1.5rem;
      background: #718096;
      color: white;
      border: none;
      border-radius: 8px;
      cursor: pointer;
    }
    .suggestions {
      background: #ebf8ff;
      padding: 1.5rem;
      border-radius: 8px;
      margin-bottom: 2rem;
    }
    .search-button {
      width: 100%;
      padding: 0.75rem;
      background: linear-gradient(to right, #6366f1, #8b5cf6);
      color: white;
      border: none;
      border-radius: 8px;
      margin-top: 1rem;
      cursor: pointer;
    }
    .databases {
      margin-bottom: 2rem;
    }
    .database-list {
      display: flex;
      gap: 1rem;
      margin: 1rem 0;
    }
    .database {
      padding: 0.5rem 1rem;
      background: #f7fafc;
      border: 1px solid #e2e8f0;
      border-radius: 4px;
    }
    .tip {
      font-size: 0.875rem;
      color: #4a5568;
      padding: 1rem;
      background: #f7fafc;
      border-radius: 8px;
    }
    .next-button {
      width: 100%;
      padding: 0.75rem;
      background: #4299e1;
      color: white;
      border: none;
      border-radius: 8px;
      cursor: pointer;
    }
  `]
})
export class ReferencesComponent {
  constructor(private router: Router) {}

  goBack() {
    this.router.navigate(['/analysis']);
  }

  onNext() {
    this.router.navigate(['/final']);
  }
} 