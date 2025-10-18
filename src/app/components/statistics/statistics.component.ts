import { ChangeDetectorRef, Component, inject, Input, SimpleChanges } from '@angular/core';
import { TRepository } from '../../models/repository.model';
import { Chart, registerables } from 'chart.js';

@Component({
  standalone: true,
  selector: 'app-statistics',
  imports: [],
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.css',
})
export class StatisticsComponent {
  @Input() repos: TRepository[] = [];

  private cdr = inject(ChangeDetectorRef);

  private barChart: Chart | null = null;

  public totalRepositories = 0;
  public totalStars = 0;
  public totalForks = 0;
  public totalOpenIssues = 0;

  public showBarChart = false;
  private isInitialized = false;

  ngOnInit(): void {
    Chart.register(...registerables);

    this.countStatistics();
    this.isInitialized = true;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.isInitialized) return;

    if (changes['repos']) {
      this.countStatistics();
      this.cdr.detectChanges();
    }
  }

  countStatistics(): void {
    this.totalStars = 0;
    this.totalForks = 0;
    this.totalOpenIssues = 0;

    this.totalRepositories = this.repos.length;
    this.repos.forEach(repo => {
      this.totalStars += repo.stargazers_count ? repo.stargazers_count : 0;
      this.totalForks += repo.forks_count ? repo.forks_count : 0;
      this.totalOpenIssues += repo.open_issues_count ? repo.open_issues_count : 0;
    });

    this.drawBarChart();
  }

  drawBarChart(): void {
    if (this.barChart !== null) this.barChart.destroy();
    const chartElement = document.getElementById('myBarChart') as HTMLCanvasElement;
    this.barChart = new Chart(chartElement, {
      type: 'bar',
      data: {
        labels: this.repos.map(r => r.name),
        datasets: [
          {
            label: 'Stars',
            data: this.repos.map(r => r.stargazers_count),
            backgroundColor: 'rgba(255, 206, 86, 0.7)',
          },
          {
            label: 'Followers',
            data: this.repos.map(r => r.forks_count),
            backgroundColor: 'rgba(54, 162, 235, 0.7)',
          },
          {
            label: 'Open Issues',
            data: this.repos.map(r => r.open_issues_count),
            backgroundColor: 'rgba(255, 99, 132, 0.7)',
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: 'top' },
          tooltip: { mode: 'index', intersect: false },
        },
        scales: {
          x: { stacked: false },
          y: { stacked: false, beginAtZero: true },
        },
      },
    });
  }
}
