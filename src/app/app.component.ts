import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TodosComponent } from './todos/todos.component';
import { Amplify } from 'aws-amplify';

// Importação condicional do outputs
let outputs = {};
try {
  outputs = require('../../amplify_outputs.json');
} catch (e) {
  console.warn('Amplify outputs file not found. Make sure to run "amplify push" first.');
}

Amplify.configure(outputs);

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [RouterOutlet, TodosComponent],
})
export class AppComponent {
  title = 'amplify-angular-template';
}
