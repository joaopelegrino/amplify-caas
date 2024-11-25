import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { signUp, signIn, getCurrentUser } from 'aws-amplify/auth';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="auth-container">
      <div class="auth-form">
        <h2>{{ isSignUp ? 'Cadastro' : 'Login' }}</h2>
        
        <form (ngSubmit)="onSubmit()">
          <div class="form-group">
            <label for="email">Email</label>
            <input 
              type="email" 
              id="email" 
              [(ngModel)]="formData.email" 
              name="email" 
              required>
          </div>

          <div class="form-group">
            <label for="password">Senha</label>
            <input 
              type="password" 
              id="password" 
              [(ngModel)]="formData.password" 
              name="password" 
              required>
          </div>

          <button type="submit">
            {{ isSignUp ? 'Cadastrar' : 'Entrar' }}
          </button>
        </form>

        <p>
          {{ isSignUp ? 'Já tem uma conta?' : 'Ainda não tem conta?' }}
          <a href="#" (click)="toggleAuthMode($event)">
            {{ isSignUp ? 'Faça login' : 'Cadastre-se' }}
          </a>
        </p>
      </div>
    </div>
  `,
  styles: [`
    .auth-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 80vh;
    }
    .auth-form {
      width: 100%;
      max-width: 400px;
      padding: 2rem;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .form-group {
      margin-bottom: 1rem;
    }
    input {
      width: 100%;
      padding: 0.5rem;
      margin-top: 0.25rem;
      border: 1px solid #ddd;
      border-radius: 4px;
    }
    button {
      width: 100%;
      padding: 0.75rem;
      background-color: #2c5282;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    button:hover {
      background-color: #2b4c7e;
    }
  `]
})
export class AuthComponent {
  isSignUp = false;
  formData = {
    email: '',
    password: ''
  };

  async onSubmit() {
    try {
      if (this.isSignUp) {
        await signUp({
          username: this.formData.email,
          password: this.formData.password,
          options: {
            userAttributes: {
              email: this.formData.email
            }
          }
        });
      } else {
        await signIn({
          username: this.formData.email,
          password: this.formData.password
        });
      }
    } catch (error) {
      console.error('Erro de autenticação:', error);
    }
  }

  toggleAuthMode(event: Event) {
    event.preventDefault();
    this.isSignUp = !this.isSignUp;
  }
} 