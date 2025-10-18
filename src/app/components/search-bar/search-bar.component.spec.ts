import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchBarComponent } from './search-bar.component';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('SearchBarComponent', () => {
  let component: SearchBarComponent;
  let fixture: ComponentFixture<SearchBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchBarComponent, FormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update username when typing in input', async () => {
    const input = fixture.debugElement.query(By.css('input')).nativeElement as HTMLInputElement;

    input.value = 'test';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(component.username).toBe('test');
  });

  it('should emit search event when button clicked with non-empty username', () => {
    spyOn(component.search, 'emit');
    component.username = 'test';
    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('button')).nativeElement;
    button.click();

    expect(component.search.emit).toHaveBeenCalledOnceWith('test');
  });

  it('should emit trimmed username', () => {
    spyOn(component.search, 'emit');
    component.username = '   test   ';
    fixture.detectChanges();

    component.onSearch();
    expect(component.search.emit).toHaveBeenCalledOnceWith('test');
  });

  it('should NOT emit event if username is empty', () => {
    spyOn(component.search, 'emit');
    component.username = '  ';
    fixture.detectChanges();

    component.onSearch();
    expect(component.search.emit).not.toHaveBeenCalled();
  });

  it('should emit event when pressing Enter in input', () => {
    spyOn(component.search, 'emit');

    const input = fixture.debugElement.query(By.css('input')).nativeElement as HTMLInputElement;
    input.value = 'test';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    const keyEvent = new KeyboardEvent('keyup', { key: 'Enter' });
    input.dispatchEvent(keyEvent);
    fixture.detectChanges();

    expect(component.search.emit).toHaveBeenCalledOnceWith('test');
  });
});
