import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay, map } from 'rxjs/operators';

export interface LoginPayload {
  email: string;
  password: string;
}

export interface AuthResult {
  success: boolean;
  token?: string;
  error?: string;
}

/**
 * PUBLIC_INTERFACE
 * AuthService provides a mock login method that simulates network latency and basic auth validation.
 * Accepts any email with password 'password123' as success; otherwise returns an error.
 */
@Injectable({ providedIn: 'root' })
export class AuthService {
  // PUBLIC_INTERFACE
  login(payload: LoginPayload): Observable<AuthResult> {
    /** Simulates network latency and validates credentials in a mock manner. */
    const { email, password } = payload;

    const isValidEmail = /^\S+@\S+\.\S+$/.test(email);
    if (!isValidEmail) {
      return throwError(() => ({ success: false, error: 'Invalid email format' } as AuthResult)).pipe(delay(400));
    }

    const simulate = of(null).pipe(delay(800));
    return simulate.pipe(
      map(() => {
        if (password === 'password123') {
          return { success: true, token: 'mock-jwt-token' } as AuthResult;
        }
        return { success: false, error: 'Invalid credentials' } as AuthResult;
      })
    );
  }
}
