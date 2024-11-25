import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ContentAnalysis, GeneratedArticle } from '../models/content.model';

interface AuthorInfo {
    name: string;
    registration: string;
    specialty: string;
    address: string;
    phone: string;
    email: string;
}

@Injectable({
    providedIn: 'root'
})
export class StateService {
    private contentSubject = new BehaviorSubject<string>('');
    private analysisSubject = new BehaviorSubject<ContentAnalysis | null>(null);
    private articleSubject = new BehaviorSubject<GeneratedArticle | null>(null);
    private authorInfoSubject = new BehaviorSubject<AuthorInfo | null>(null);

    content$ = this.contentSubject.asObservable();
    analysis$ = this.analysisSubject.asObservable();
    article$ = this.articleSubject.asObservable();
    authorInfo$ = this.authorInfoSubject.asObservable();

    setContent(content: string) {
        this.contentSubject.next(content);
    }

    setAnalysis(analysis: ContentAnalysis) {
        this.analysisSubject.next(analysis);
    }

    setArticle(article: GeneratedArticle) {
        this.articleSubject.next(article);
    }

    setAuthorInfo(authorInfo: AuthorInfo) {
        this.authorInfoSubject.next(authorInfo);
    }

    clear() {
        this.contentSubject.next('');
        this.analysisSubject.next(null);
        this.articleSubject.next(null);
        this.authorInfoSubject.next(null);
    }
}