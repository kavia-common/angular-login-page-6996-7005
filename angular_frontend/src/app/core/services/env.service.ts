import { Injectable } from '@angular/core';

// Avoid referencing the global Window type directly for environments where DOM lib isn't present.
type EnvWindow = any & { __env?: Record<string, string> };

/**
 * PUBLIC_INTERFACE
 * EnvService provides application environment configuration values.
 * It safely reads from window.__env (for client builds) and falls back to process.env (for SSR),
 * exposing only NG_APP_* variables with sensible defaults.
 */
@Injectable({ providedIn: 'root' })
export class EnvService {
  private readonly cache: Record<string, string | undefined>;

  constructor() {
    const w = (globalThis as unknown as { window?: EnvWindow }).window as EnvWindow | undefined;
    const winVars = (w && w.__env) || {};
    // SSR-safe process.env access
    const procEnv = (typeof process !== 'undefined' && (process as any).env) ? (process as any).env as Record<string, string> : {};

    // Only expose NG_APP_* variables, or set defaults.
    const read = (key: string, fallback?: string) =>
      (winVars[key] ?? procEnv[key] ?? fallback);

    this.cache = {
      NG_APP_API_BASE: read('NG_APP_API_BASE', '/api'),
      NG_APP_BACKEND_URL: read('NG_APP_BACKEND_URL', 'http://localhost:4000'),
      NG_APP_FRONTEND_URL: read('NG_APP_FRONTEND_URL', 'http://localhost:3000'),
      NG_APP_WS_URL: read('NG_APP_WS_URL', 'ws://localhost:4000'),
      NG_APP_NODE_ENV: read('NG_APP_NODE_ENV', 'development'),
      NG_APP_NEXT_TELEMETRY_DISABLED: read('NG_APP_NEXT_TELEMETRY_DISABLED', '1'),
      NG_APP_ENABLE_SOURCE_MAPS: read('NG_APP_ENABLE_SOURCE_MAPS', 'true'),
      NG_APP_PORT: read('NG_APP_PORT', '3000'),
      NG_APP_TRUST_PROXY: read('NG_APP_TRUST_PROXY', 'false'),
      NG_APP_LOG_LEVEL: read('NG_APP_LOG_LEVEL', 'info'),
      NG_APP_HEALTHCHECK_PATH: read('NG_APP_HEALTHCHECK_PATH', '/healthz'),
      NG_APP_FEATURE_FLAGS: read('NG_APP_FEATURE_FLAGS', ''),
      NG_APP_EXPERIMENTS_ENABLED: read('NG_APP_EXPERIMENTS_ENABLED', 'false'),
    };
  }

  // PUBLIC_INTERFACE
  get(key: keyof EnvService['cache']): string | undefined {
    /** Returns an NG_APP_* env value, or undefined if not set and no default existed. */
    return this.cache[key];
  }

  // PUBLIC_INTERFACE
  getAll(): Record<string, string | undefined> {
    /** Returns all the NG_APP_* config values as a read-only snapshot. */
    return { ...this.cache };
  }

  // Convenience getters
  // PUBLIC_INTERFACE
  apiBase(): string {
    /** Returns the API base path used by the app. */
    return this.cache.NG_APP_API_BASE || '/api';
  }

  // PUBLIC_INTERFACE
  backendUrl(): string {
    /** Returns the backend URL used by the app. */
    return this.cache.NG_APP_BACKEND_URL || 'http://localhost:4000';
  }
}
