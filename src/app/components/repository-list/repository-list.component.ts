import { Component, Input } from '@angular/core';
import { RepositoryCardComponent } from '../repository-card/repository-card.component';
import { TRepository } from '../../models/repository.model';

@Component({
  standalone: true,
  imports: [RepositoryCardComponent],
  selector: 'app-repository-list',
  templateUrl: './repository-list.component.html',
  styleUrl: './repository-list.component.css',
})
export class RepositoryListComponent {
  @Input() repos: TRepository[] = [];
}
