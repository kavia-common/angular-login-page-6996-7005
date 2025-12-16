import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { BrandHeaderComponent } from '../../shared/brand-header/brand-header.component';
import { InputFieldComponent } from '../../shared/input-field/input-field.component';
import { PasswordFieldComponent } from '../../shared/password-field/password-field.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, BrandHeaderComponent, InputFieldComponent, PasswordFieldComponent],
  template: `
    <div class="page">
      <div class="card" role="main" aria-label="Login form">
        <app-brand-header brand="Ocean Professional" tagline="Secure access to your account"></app-brand-header>

        <form [formGroup]="form" (ngSubmit)="submit()" novalidate class="form">
          <app-input-field
            label="Email"
            name="email"
            type="email"
            placeholder="you@example.com"
            autocomplete="email"
            [error]="emailError()"
            [ariaInvalid]="emailInvalid()"
            formControlName="email">
          </app-input-field>

          <app-password-field
            label="Password"
            name="password"
            placeholder="Enter your password"
            [error]="passwordError()"
            [ariaInvalid]="passwordInvalid()"
            formControlName="password">
          </app-password-field>

          <button class="btn" type="submit" [disabled]="loading() || form.invalid" [attr.aria-busy]="loading()">
            <span class="spinner" *ngIf="loading()" aria-hidden="true"></span>
            <span>{{ loading() ? 'Signing in…' : 'Sign in' }}</span>
          </button>

          <div class="alert error" *ngIf="errorMsg()">
            {{ errorMsg() }}
          </div>
          <p class="footnote">Tip: use password "password123" to succeed.</p>
        </form>
      </div>
      <footer class="footer" aria-label="Footer">© {{ year }} Ocean Pro</footer>
    </div>
  `,
  styles: [`
    .page {
      min-height: 100vh;
      display: grid;
      place-items: center;
      background: radial-gradient(1200px 600px at 20% -10%, var(--primary-25), transparent),
                  radial-gradient(1000px 500px at 100% 0%, var(--secondary-25), transparent),
                  var(--background);
      padding: 1rem;
    }
    .card {
      width: 100%;
      max-width: 440px;
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 1rem;
      box-shadow: 0 10px 25px rgba(0,0,0,.05), 0 2px 8px rgba(0,0,0,.04);
      padding: 1.25rem 1.25rem 1.5rem;
      animation: cardIn 420ms ease both;
    }
    .form { display: grid; gap: 1rem; margin-top: .5rem; }

    .btn {
      margin-top: .5rem;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: .5rem;
      width: 100%;
      padding: .85rem 1rem;
      border-radius: .9rem;
      border: 1px solid var(--primary-600);
      color: white;
      background: linear-gradient(180deg, var(--primary-500), var(--primary-600));
      box-shadow: 0 6px 16px rgba(37,99,235,.25), inset 0 1px 0 rgba(255,255,255,.15);
      cursor: pointer;
      transition: transform .06s ease, filter .2s ease, box-shadow .2s ease;
    }
    .btn:hover {
      filter: brightness(1.02) saturate(1.02);
      box-shadow: 0 8px 20px rgba(37,99,235,.28), inset 0 1px 0 rgba(255,255,255,.18);
    }
    .btn:active { transform: translateY(1px); }
    .btn[disabled] {
      opacity: .75;
      cursor: not-allowed;
      filter: grayscale(.15) saturate(.9);
    }
    .spinner {
      width: 16px; height: 16px; border-radius: 999px;
      border: 2px solid rgba(255,255,255,.6);
      border-top-color: rgba(255,255,255,1);
      animation: spin 800ms linear infinite;
    }

    .alert.error {
      border: 1px solid var(--error-200);
      color: var(--error-700);
      background: var(--error-50);
      padding: .75rem .9rem;
      border-radius: .75rem;
      font-size: .9rem;
      animation: fadeIn 300ms ease both;
    }
    .footnote {
      color: var(--muted-600);
      font-size: .8rem;
      text-align: center;
    }
    .footer {
      position: fixed;
      bottom: .75rem;
      color: var(--muted-600);
      font-size: .8rem;
    }

    @keyframes cardIn {
      from { opacity: 0; transform: translateY(8px) scale(.98); }
      to { opacity: 1; transform: translateY(0) scale(1); }
    }
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(4px); }
      to { opacity: 1; transform: translateY(0); }
    }

    @media (max-width: 480px) {
      .card { padding: 1rem; border-radius: .9rem; }
    }
  `]
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  loading = signal(false);
  errorMsg = signal<string | null>(null);
  year = new Date().getFullYear();

  emailInvalid(): 'true' | 'false' {
    const c = this.form.controls.email;
    return (c.touched || c.dirty) && c.invalid ? 'true' : 'false';
    }
  passwordInvalid(): 'true' | 'false' {
    const c = this.form.controls.password;
    return (c.touched || c.dirty) && c.invalid ? 'true' : 'false';
  }
  emailError(): string | null {
    const c = this.form.controls.email;
    if (!(c.touched || c.dirty)) return null;
    if (c.hasError('required')) return 'Email is required';
    if (c.hasError('email')) return 'Enter a valid email address';
    return null;
  }
  passwordError(): string | null {
    const c = this.form.controls.password;
    if (!(c.touched || c.dirty)) return null;
    if (c.hasError('required')) return 'Password is required';
    if (c.hasError('minlength')) return 'Password must be at least 8 characters';
    return null;
  }

  submit() {
    this.errorMsg.set(null);
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.loading.set(true);
    const { email, password } = this.form.getRawValue();
    this.auth.login({ email: email!, password: password! }).subscribe({
      next: (res) => {
        this.loading.set(false);
        if (res.success) {
          // For this demo, just reset form and show a friendly message or navigate.
          // Navigate to root which will redirect to login (no other routes yet).
          this.router.navigateByUrl('/');
        } else {
          this.errorMsg.set(res.error || 'Login failed');
        }
      },
      error: (err) => {
        this.loading.set(false);
        this.errorMsg.set(err?.error ?? 'Something went wrong. Try again.');
      }
    });
  }
}
