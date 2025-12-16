import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-brand-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header class="brand-header" role="banner" aria-label="Application header">
      <div class="logo" aria-hidden="true">🌊</div>
      <div class="titles">
        <h1 class="brand">{{ brand }}</h1>
        <p class="tagline" *ngIf="tagline">{{ tagline }}</p>
      </div>
    </header>
  `,
  styles: [`
    .brand-header {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.5rem 0;
      color: var(--text);
      animation: fadeIn 500ms ease-in-out both;
    }
    .logo {
      font-size: 1.6rem;
      filter: drop-shadow(0 1px 1px rgba(0,0,0,.05));
    }
    .brand {
      font-size: 1.25rem;
      line-height: 1.2;
      margin: 0;
      color: var(--primary-600);
      letter-spacing: .2px;
    }
    .tagline {
      margin: 0;
      color: var(--muted-600);
      font-size: .875rem;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(4px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `]
})
export class BrandHeaderComponent {
  @Input() brand = 'Ocean Pro';
  @Input() tagline?: string;
}
