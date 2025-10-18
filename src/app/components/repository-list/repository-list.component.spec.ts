import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepositoryListComponent } from './repository-list.component';
import { RepositoryCardComponent } from '../repository-card/repository-card.component';
import { TRepository } from '../../models/repository.model';
import { By } from '@angular/platform-browser';

describe('RepositoryListComponent', () => {
  let component: RepositoryListComponent;
  let fixture: ComponentFixture<RepositoryListComponent>;

  const mockRepos: TRepository[] = [
    {
      html_url: 'https://github.com/test/repo1',
      language: 'dart',
      name: 'Repo 1',
      archived: false,
      description: 'First repo',
      topics: ['angular'],
      stargazers_count: 10,
      forks_count: 2,
      watchers_count: 5,
      open_issues_count: 1,
      pushed_at: '2024-01-01T00:00:00Z',
      created_at: '2023-01-01T00:00:00Z',
      updated_at: '2024-02-01T00:00:00Z',
    },
    {
      html_url: 'https://github.com/test/repo2',
      language: 'python',
      name: 'Repo 2',
      archived: true,
      description: 'Second repo',
      topics: ['typescript'],
      stargazers_count: 20,
      forks_count: 3,
      watchers_count: 8,
      open_issues_count: 0,
      pushed_at: '2024-01-10T00:00:00Z',
      created_at: '2023-02-01T00:00:00Z',
      updated_at: '2024-02-02T00:00:00Z',
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RepositoryListComponent, RepositoryCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RepositoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render a RepositoryCardComponent for each repo', () => {
    component.repos = mockRepos;
    fixture.detectChanges();

    const cards = fixture.debugElement.queryAll(By.directive(RepositoryCardComponent));
    expect(cards.length).toBe(2);
  });

  it('should pass each repo to RepositoryCardComponent correctly', () => {
    component.repos = mockRepos;
    fixture.detectChanges();

    const cards = fixture.debugElement.queryAll(By.directive(RepositoryCardComponent));
    const firstCard = cards[0].componentInstance as RepositoryCardComponent;

    expect(firstCard.repo.name).toBe('Repo 1');
  });

  it('should show "No repositories found." when repos is empty', () => {
    component.repos = [];
    fixture.detectChanges();

    const message = fixture.debugElement.query(By.css('h5.card-title'));
    expect(message).toBeTruthy();
    expect(message.nativeElement.textContent.trim()).toBe('No repositories found.');
  });

  it('should not show "No repositories found." when repos exist', () => {
    component.repos = mockRepos;
    fixture.detectChanges();

    const message = fixture.debugElement.query(By.css('h5.card-title'));
    expect(message).toBeFalsy();
  });
});
