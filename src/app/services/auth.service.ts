import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { getCurrentUser, signOut } from 'aws-amplify/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject = new BehaviorSubject<any>(null);
  public user$ = this.userSubject.asObservable();

  constructor(private router: Router) {
    this.checkAuth();
  }

  async checkAuth() {
    try {
      const user = await getCurrentUser();
      this.userSubject.next(user);
    } catch (error) {
      this.userSubject.next(null);
    }
  }

  async logout() {
    try {
      await signOut();
      this.userSubject.next(null);
      this.router.navigate(['/auth']);
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  }

  isAuthenticated(): Observable<boolean> {
    return new Observable((subscriber) => {
      this.user$.subscribe(user => {
        subscriber.next(!!user);
      });
    });
  }
} 