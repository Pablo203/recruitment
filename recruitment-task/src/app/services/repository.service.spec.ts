import { TestBed } from '@angular/core/testing';

import { RepositoryService } from './repository.service';
import { HttpClientTestingModule, HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TRepository } from '../models/repository.model';
import { provideHttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

describe('RepositoryService', () => {
  let service: RepositoryService;
  let httpMock: HttpTestingController;

  const mockRepositories: TRepository[] = [
    {
      archived: false,
      created_at: '2023-01-01T00:00:00Z',
      description: 'Test repo',
      forks_count: 10,
      html_url: 'https://github.com/test/repo',
      language: 'TypeScript',
      name: 'repo',
      open_issues_count: 2,
      pushed_at: '2023-02-01T00:00:00Z',
      stargazers_count: 100,
      topics: ['angular', 'test'],
      updated_at: '2023-03-01T00:00:00Z',
      watchers_count: 50,
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RepositoryService, provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(RepositoryService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return repositories for a given user', () => {
    service.getRepositoriesForUser('john').subscribe(repos => {
      expect(repos.length).toBe(1);
      expect(repos[0].name).toBe('repo');
    });

    const req = httpMock.expectOne('https://api.github.com/users/john/repos');
    expect(req.request.method).toBe('GET');
    req.flush(mockRepositories, { status: 200, statusText: 'OK' });
  });

  it('should return an empty array when response is not OK', async () => {
    const promise = firstValueFrom(service.getRepositoriesForUser('john'));

    const req = httpMock.expectOne('https://api.github.com/users/john/repos');
    req.flush(null, { status: 500, statusText: 'Internal Server Error' });

    const repos = await promise;
    expect(repos).toEqual([]);
  });
});
