import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  imports: [FormsModule],
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css',
})
export class SearchBarComponent {
  username: string = '';
  @Output() search = new EventEmitter<string>();

  private router = inject(Router);

  onSearch() {
    if (!this.username.trim()) return;
    this.search.emit(this.username.trim());
  }
}
