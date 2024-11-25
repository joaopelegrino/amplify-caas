import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <main>
      <div class="container">
        <header>
          <h1>Gerador de Artigos para Área da Saúde</h1>
          <p class="subtitle">Transforme conteúdo de redes sociais em artigos com embasamento científico</p>
        </header>
        <router-outlet></router-outlet>
      </div>
    </main>
  `,
  styles: [`
    main {
      min-height: 100vh;
      background-color: #ffffff;
    }
    .container {
      max-width: 800px;
      margin: 0 auto;
      padding: 2rem 1rem;
    }
    header {
      margin-bottom: 2rem;
      text-align: left;
    }
    h1 {
      color: #1a202c;
      font-size: 1.5rem;
      font-weight: 600;
      margin-bottom: 0.5rem;
    }
    .subtitle {
      color: #4a5568;
      font-size: 0.875rem;
    }
    @media (max-width: 640px) {
      .container {
        padding: 1rem;
      }
      h1 {
        font-size: 1.25rem;
      }
    }
  `]
})
export class AppComponent {
  title = 'Medical Content Generator';
}
