import { DatePipe } from '@angular/common';
import { Component, HostListener, Input } from '@angular/core';

@Component({
  standalone: true,
  imports: [DatePipe],
  selector: 'app-repository-card',
  templateUrl: './repository-card.component.html',
  styleUrl: './repository-card.component.css',
})
export class RepositoryCardComponent {
  @Input() repo!: any;

  dropdownOpen = false;

  toggleDropdown(event: MouseEvent) {
    event.stopPropagation();
    this.dropdownOpen = !this.dropdownOpen;
  }

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.closest('.card')) this.dropdownOpen = false;
  }
}
