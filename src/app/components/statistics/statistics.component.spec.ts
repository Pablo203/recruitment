import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticsComponent } from './statistics.component';
import { TRepository } from '../../models/repository.model';
import { ChangeDetectorRef } from '@angular/core';
import { Chart } from 'chart.js';

describe('StatisticsComponent', () => {
  let component: StatisticsComponent;
  let fixture: ComponentFixture<StatisticsComponent>;

  const mockRepos: TRepository[] = [
    {
      name: 'Repo 1',
      language: 'dart',
      stargazers_count: 5,
      forks_count: 2,
      open_issues_count: 1,
      html_url: '',
      archived: false,
      description: '',
      topics: [],
      pushed_at: '',
      created_at: '',
      updated_at: '',
      watchers_count: 0,
    },
    {
      name: 'Repo 2',
      language: 'python',
      stargazers_count: 10,
      forks_count: 3,
      open_issues_count: 2,
      html_url: '',
      archived: false,
      description: '',
      topics: [],
      pushed_at: '',
      created_at: '',
      updated_at: '',
      watchers_count: 0,
    },
  ];

  beforeEach(async () => {
    spyOn(Chart.prototype, 'destroy').and.returnValue(undefined);
    (window as any).Chart = class {
      destroy() {}
      constructor(public config: any) {}
    };

    await TestBed.configureTestingModule({
      imports: [StatisticsComponent],
      providers: [ChangeDetectorRef],
    }).compileComponents();

    fixture = TestBed.createComponent(StatisticsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should correctly calculate totals after ngOnInit', () => {
    component.repos = mockRepos;
    component.ngOnInit();

    expect(component.totalRepositories).toBe(2);
    expect(component.totalStars).toBe(15);
    expect(component.totalForks).toBe(5);
    expect(component.totalOpenIssues).toBe(3);
  });

  it('should not recalculate totals on ngOnChanges if not initialized', () => {
    component.repos = mockRepos;
    component.ngOnChanges({
      repos: { currentValue: mockRepos, previousValue: [], firstChange: true, isFirstChange: () => true },
    });

    expect(component.totalRepositories).toBe(0);
    expect(component.totalStars).toBe(0);
    expect(component.totalForks).toBe(0);
    expect(component.totalOpenIssues).toBe(0);
  });

  it('should call drawBarChart when counting statistics', () => {
    const drawSpy = spyOn(component, 'drawBarChart');
    component.repos = mockRepos;
    component.countStatistics();

    expect(drawSpy).toHaveBeenCalled();
  });
});
