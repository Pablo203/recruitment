import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { TRepository } from '../models/repository.model';

@Injectable({
  providedIn: 'root',
})
export class RepositoryService {
  private http = inject(HttpClient);

  getRepositoriesForUser(username: string): Observable<TRepository[]> {
    return this.http.get(`https://api.github.com/users/${username}/repos`, { observe: 'response' }).pipe(
      map(response => {
        if (!response.ok || response.status !== 200 || response.body === null) return [];
        return response.body as TRepository[];
      }),
      catchError(() => of([]))
    );
  }
}
