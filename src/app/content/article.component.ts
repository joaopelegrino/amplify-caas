import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-article',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="article-container">
      <div class="progress-bar">
        <div class="progress-step">Artigo Final</div>
        <div class="progress-indicator">Etapa 4 de 4</div>
      </div>

      <div class="article-section">
        <h2>Artigo Final</h2>
        <a class="back-link" (click)="goBack()">← Voltar</a>

        <div class="article-content">
          <div class="editor-toolbar">
            <button>Normal</button>
            <button>B</button>
            <button>I</button>
            <button>U</button>
            <button>≡</button>
            <button>≡</button>
            <button>≡</button>
            <button>%</button>
          </div>

          <div class="article-text">
            <h1>Título do Artigo</h1>
            <p>Conteúdo do artigo...</p>
          </div>

          <div class="references">
            <h3>Referências</h3>
            <ol>
              <li>Referência 1</li>
              <li>Referência 2</li>
            </ol>
          </div>

          <div class="author-info">
            <h3>Sobre o Autor</h3>
            <p>Nome: Dr. Exemplo</p>
            <p>Registro: CRM/XX 12345</p>
            <p>Especialidade: Especialidade</p>
          </div>
        </div>

        <div class="action-buttons">
          <button class="secondary-button" (click)="onNewArticle()">
            Novo Artigo
          </button>
          <button class="primary-button" (click)="onDownload()">
            Baixar Artigo
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .article-container {
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
    .article-section {
      padding: 2rem;
    }
    .back-link {
      color: #4a5568;
      cursor: pointer;
      text-decoration: none;
      display: inline-block;
      margin-bottom: 1rem;
    }
    .editor-toolbar {
      display: flex;
      gap: 0.5rem;
      padding: 0.5rem;
      border: 1px solid #e2e8f0;
      border-bottom: none;
      border-radius: 8px 8px 0 0;
    }
    .editor-toolbar button {
      padding: 0.25rem 0.5rem;
      border: 1px solid #e2e8f0;
      background: white;
      border-radius: 4px;
      cursor: pointer;
    }
    .article-text {
      padding: 1rem;
      border: 1px solid #e2e8f0;
      border-radius: 0 0 8px 8px;
      min-height: 400px;
    }
    .action-buttons {
      display: flex;
      gap: 1rem;
      margin-top: 2rem;
    }
    .primary-button, .secondary-button {
      flex: 1;
      padding: 0.75rem;
      border: none;
      border-radius: 8px;
      cursor: pointer;
    }
    .primary-button {
      background: #4299e1;
      color: white;
    }
    .secondary-button {
      background: #718096;
      color: white;
    }
  `]
})
export class ArticleComponent {
  constructor(private router: Router) {}

  goBack() {
    this.router.navigate(['/references']);
  }

  onNewArticle() {
    this.router.navigate(['/']);
  }

  onDownload() {
    // Implementar lógica de download
    console.log('Download iniciado');
  }
} 