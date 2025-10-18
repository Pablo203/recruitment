import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

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

  onSearch(): void {
    if (!this.username.trim()) return;
    this.search.emit(this.username.trim());
  }
}
