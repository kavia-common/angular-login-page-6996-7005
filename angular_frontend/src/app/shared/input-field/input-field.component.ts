import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-input-field',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => InputFieldComponent),
    multi: true
  }],
  template: `
    <div class="field">
      <label *ngIf="label" [for]="id" class="label">{{ label }}</label>
      <input
        [id]="id"
        class="input"
        [attr.type]="type"
        [attr.name]="name"
        [attr.placeholder]="placeholder"
        [attr.autocomplete]="autocomplete"
        [disabled]="disabled"
        [value]="value"
        (input)="onInput($event)"
        (blur)="onTouched()"
        [attr.aria-invalid]="ariaInvalid"
        [attr.aria-describedby]="hint ? id + '-hint' : null"
      />
      <div class="hint" *ngIf="hint" [id]="id + '-hint'">{{ hint }}</div>
      <div class="error" *ngIf="error">{{ error }}</div>
    </div>
  `,
  styles: [`
    .field { display: grid; gap: .375rem; }
    .label {
      color: var(--muted-700);
      font-weight: 600;
      font-size: .9rem;
    }
    .input {
      appearance: none;
      width: 100%;
      padding: .75rem .85rem;
      border-radius: .75rem;
      border: 1px solid var(--border);
      background: var(--surface);
      color: var(--text);
      outline: none;
      box-shadow: 0 0 0 0 rgba(37,99,235,0);
      transition: border-color .15s ease, box-shadow .2s ease, background .2s ease, transform .06s ease;
    }
    .input:focus {
      border-color: var(--primary-400);
      box-shadow: 0 0 0 4px var(--primary-50);
      background: var(--surface);
      transform: translateY(-1px);
    }
    .hint {
      color: var(--muted-600);
      font-size: .8rem;
    }
    .error {
      color: var(--error-600);
      font-size: .8rem;
      font-weight: 600;
    }
  `]
})
export class InputFieldComponent implements ControlValueAccessor {
  @Input() id = `input-${Math.random().toString(36).slice(2)}`;
  @Input() label?: string;
  @Input() placeholder?: string;
  @Input() hint?: string;
  @Input() name?: string;
  @Input() type: string = 'text';
  @Input() autocomplete?: string;
  @Input() error?: string | null;
  @Input() ariaInvalid: 'true' | 'false' | null = null;

  @Output() valueChange = new EventEmitter<string>();

  disabled = false;
  value = '';

  onChange: (val: string) => void = () => {};
  onTouched: () => void = () => {};

  writeValue(value: string): void {
    this.value = value ?? '';
  }
  registerOnChange(fn: (val: string) => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onInput(e: any) {
    const v = (e?.target as any)?.value ?? '';
    this.value = v;
    this.onChange(v);
    this.valueChange.emit(v);
  }
}
