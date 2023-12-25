import { IValidationResult } from '../types/input-validation';

export default class ValidationResult implements IValidationResult {
  private value: any;
  private errors: string[];
  private isResultValid: boolean;

  private constructor(isValid: boolean, value: any, errors: string[]) {
    this.isResultValid = isValid;
    this.value = value;
    this.errors = errors;
    this.isValid = this.isValid.bind(this);
    this.getValue = this.getValue.bind(this);
    this.getErrors = this.getErrors.bind(this);
  }

  public isValid(): boolean {
    return this.isResultValid;
  }

  public getValue() {
    return this.value;
  }

  public getErrors(): string[] {
    return this.errors;
  }

  public static fail(value: any, errors: string[]): IValidationResult {
    return new ValidationResult(false, value, errors);
  }

  public static ok(value: any): IValidationResult {
    return new ValidationResult(true, value, []);
  }
}
