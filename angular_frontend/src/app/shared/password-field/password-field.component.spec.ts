import { TestBed } from '@angular/core/testing';
import { PasswordFieldComponent } from './password-field.component';

describe('PasswordFieldComponent', () => {
  it('should render and toggle', async () => {
    await TestBed.configureTestingModule({ imports: [PasswordFieldComponent] }).compileComponents();
    const fixture = TestBed.createComponent(PasswordFieldComponent);
    const comp = fixture.componentInstance;
    comp.label = 'Password';
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Password');
  });
});
