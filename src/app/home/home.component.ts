import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="home-container">
      <section class="welcome-section">
        <h2>Bem-vindo ao Medical Content Generator</h2>
        <p>Gere conteúdo médico de alta qualidade com auxílio de IA</p>
      </section>
      
      <section class="features-section">
        <h3>Recursos Disponíveis</h3>
        <ul>
          <li>Geração de textos médicos</li>
          <li>Validação de termos técnicos</li>
          <li>Referências bibliográficas automáticas</li>
        </ul>
      </section>
    </div>
  `,
  styles: [`
    .home-container {
      padding: 2rem;
    }
    .welcome-section {
      text-align: center;
      margin-bottom: 3rem;
    }
    h2 {
      color: #2c5282;
      margin-bottom: 1rem;
    }
    .features-section {
      max-width: 600px;
      margin: 0 auto;
    }
    h3 {
      color: #4a5568;
      margin-bottom: 1rem;
    }
    ul {
      list-style-type: none;
      padding: 0;
    }
    li {
      padding: 0.5rem 0;
      color: #4a5568;
    }
  `]
})
export class HomeComponent {} 