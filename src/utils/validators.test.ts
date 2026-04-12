import { describe, it, expect } from 'vitest';
import {
  validateEmail,
  validatePassword,
  validateRequired,
  validateConfirmPassword,
} from './validators';

describe('validateEmail', () => {
  it('returns error for empty value', () => {
    expect(validateEmail('')).toMatch(/requerido/i);
  });
  it('returns error for invalid email', () => {
    expect(validateEmail('bad-email')).toMatch(/válido/i);
  });
  it('returns undefined for valid email', () => {
    expect(validateEmail('user@example.com')).toBeUndefined();
  });
});

describe('validatePassword', () => {
  it('returns error for empty value', () => {
    expect(validatePassword('')).toMatch(/requerida/i);
  });
  it('returns error for short password', () => {
    expect(validatePassword('abc')).toMatch(/8 caracteres/i);
  });
  it('returns undefined for valid password', () => {
    expect(validatePassword('validPass1')).toBeUndefined();
  });
});

describe('validateRequired', () => {
  it('returns error for blank string', () => {
    expect(validateRequired('  ')).toBeDefined();
  });
  it('returns undefined for non-empty string', () => {
    expect(validateRequired('Juan')).toBeUndefined();
  });
});

describe('validateConfirmPassword', () => {
  it('returns error when passwords do not match', () => {
    expect(validateConfirmPassword('pass1', 'pass2')).toMatch(/no coinciden/i);
  });
  it('returns undefined when passwords match', () => {
    expect(validateConfirmPassword('pass1', 'pass1')).toBeUndefined();
  });
});
