import RuleSchemaValidator from './validators/rules';
import { IValidator, ValidationRulesTypes } from './types/input-validation';

export class ValidatorAdapter implements IValidator {
  constructor() {
    this.execute = this.execute.bind(this);
  }

  public execute<T>({
    value,
    rules,
  }: {
    name: keyof T;
    value: any;
    rules: ValidationRulesTypes;
  }): { message: string; isValid: () => boolean } {
    const result = RuleSchemaValidator(value, rules);
    let message = !result.isValid() ? result.getErrors()[0] : '';

    return { message, isValid: result.isValid };
  }
}
