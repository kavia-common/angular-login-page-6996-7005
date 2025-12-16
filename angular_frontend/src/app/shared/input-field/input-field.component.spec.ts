import { TestBed } from '@angular/core/testing';
import { InputFieldComponent } from './input-field.component';

describe('InputFieldComponent', () => {
  it('should render and accept value', async () => {
    await TestBed.configureTestingModule({ imports: [InputFieldComponent] }).compileComponents();
    const fixture = TestBed.createComponent(InputFieldComponent);
    const comp = fixture.componentInstance;
    comp.label = 'Email';
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Email');
  });
});
