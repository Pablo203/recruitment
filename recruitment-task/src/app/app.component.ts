import { Component, inject } from '@angular/core';
import { RepositoryListComponent, SearchBarComponent, StatisticsComponent } from './components';
import { RepositoryService } from './services/repository.service';
import { tap } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [SearchBarComponent, RepositoryListComponent, StatisticsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'recruitment-task';
  repos: any[] = [];

  private repositoryService = inject(RepositoryService);

  onSearch(username: string) {
    this.repositoryService
      .getRepositoriesForUser(username)
      .pipe(
        tap(repositories => {
          this.repos = repositories;
        })
      )
      .subscribe();
  }
}
