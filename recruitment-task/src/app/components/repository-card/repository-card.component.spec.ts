import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepositoryCardComponent } from './repository-card.component';
import { DatePipe } from '@angular/common';
import { By } from '@angular/platform-browser';

describe('RepositoryCardComponent', () => {
  let component: RepositoryCardComponent;
  let fixture: ComponentFixture<RepositoryCardComponent>;

  const mockRepo = {
    html_url: 'https://github.com/test/repo',
    name: 'Test Repo',
    archived: true,
    description: 'A test repository',
    topics: ['angular', 'testing'],
    stargazers_count: 5,
    forks_count: 3,
    watchers_count: 2,
    open_issues_count: 1,
    pushed_at: '2024-05-10T00:00:00Z',
    created_at: '2023-01-01T00:00:00Z',
    updated_at: '2024-05-12T00:00:00Z',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RepositoryCardComponent, DatePipe],
    }).compileComponents();

    fixture = TestBed.createComponent(RepositoryCardComponent);
    component = fixture.componentInstance;
    component.repo = mockRepo;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render repository name and link', () => {
    const link = fixture.debugElement.query(By.css('a')).nativeElement as HTMLAnchorElement;
    expect(link.textContent).toContain('Test Repo');
    expect(link.href).toBe(mockRepo.html_url);
  });

  it('should render description and topics', () => {
    const desc = fixture.debugElement.query(By.css('p')).nativeElement;
    const topics = fixture.debugElement.query(By.css('.text-sm.text-gray-700')).nativeElement;
    expect(desc.textContent).toContain('A test repository');
    expect(topics.textContent).toContain('angular');
  });

  it('should show "Archived" badge when repo is archived', () => {
    const badge = fixture.debugElement.query(By.css('.badge'));
    expect(badge.nativeElement.textContent).toContain('Archived');
  });

  it('should toggle dropdown when button is clicked', () => {
    const button = fixture.debugElement.query(By.css('button')).nativeElement;

    expect(component.dropdownOpen).toBeFalse();

    button.click();
    fixture.detectChanges();
    expect(component.dropdownOpen).toBeTrue();

    button.click();
    fixture.detectChanges();
    expect(component.dropdownOpen).toBeFalse();
  });

  it('should show dropdown with formatted dates when dropdownOpen is true', () => {
    component.dropdownOpen = true;
    fixture.detectChanges();

    const dropdown = fixture.debugElement.query(By.css('.absolute'));
    expect(dropdown).toBeTruthy();

    const items = dropdown.nativeElement.textContent;
    expect(items).toContain('Created');
    expect(items).toContain('Updated');
  });

  it('should close dropdown when clicking outside card', () => {
    component.dropdownOpen = true;
    fixture.detectChanges();

    const outsideDiv = document.createElement('div');
    document.body.appendChild(outsideDiv);

    outsideDiv.click();
    fixture.detectChanges();

    expect(component.dropdownOpen).toBeFalse();
  });
});
