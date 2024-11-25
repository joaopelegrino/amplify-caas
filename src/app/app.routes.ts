import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./content/content-input.component')
      .then(m => m.ContentInputComponent)
  },
  {
    path: 'analysis',
    loadComponent: () => import('./content/content-analysis.component')
      .then(m => m.ContentAnalysisComponent)
  },
  {
    path: 'references',
    loadComponent: () => import('./content/references.component')
      .then(m => m.ReferencesComponent)
  },
  {
    path: 'final',
    loadComponent: () => import('./content/article.component')
      .then(m => m.ArticleComponent)
  }
];
