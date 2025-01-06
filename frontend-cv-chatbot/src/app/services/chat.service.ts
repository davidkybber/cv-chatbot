import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private apiUrl = 'https://func-cv-chatbot.azurewebsites.net/api/cv-chatbot-backend';
  private loadingSubject = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSubject.asObservable();

  constructor(private http: HttpClient) {}

  sendMessage(query: string): Observable<any> {
    this.loadingSubject.next(true);
    return this.http.post(this.apiUrl, { query })
      .pipe(
        finalize(() => this.loadingSubject.next(false))
      );
  }
} 