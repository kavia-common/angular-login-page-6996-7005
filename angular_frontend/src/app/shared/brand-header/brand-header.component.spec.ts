import { TestBed } from '@angular/core/testing';
import { BrandHeaderComponent } from './brand-header.component';

describe('BrandHeaderComponent', () => {
  it('should render', async () => {
    await TestBed.configureTestingModule({ imports: [BrandHeaderComponent] }).compileComponents();
    const fixture = TestBed.createComponent(BrandHeaderComponent);
    fixture.componentInstance.brand = 'Test Brand';
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement;
    expect(el.textContent).toContain('Test Brand');
  });
});
