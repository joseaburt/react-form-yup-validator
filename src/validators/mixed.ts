import * as yup from 'yup';
import ValidationResult from '../results';
import { IValidationResult } from '../types/input-validation';
import { MixedValidationConstrains } from '../types/input-validation-mixed';

/**
 * ### Yup Mixed Base Schema Validator
 * Given an mixed schema valition check its validaty
 * @author <pino0071@gmail.com> Jose Aburto
 */
export default function MixedSchemaValidator(
  constrains: MixedValidationConstrains[],
  value: any
): IValidationResult {
  let MixedValidationSchema = yup.mixed();
  for (const constrain of constrains) {
    const { method } = constrain;
    switch (method) {
      case 'required':
        MixedValidationSchema = MixedValidationSchema.required(
          constrain.params.message
        );
        break;
      case 'oneOf':
        MixedValidationSchema = MixedValidationSchema.oneOf(
          constrain.params.value,
          constrain.params.message
        );
        break;
      case 'notOneOf':
        MixedValidationSchema = MixedValidationSchema.notOneOf(
          constrain.params.value,
          constrain.params.message
        );
        break;
    }
  }

  try {
    return ValidationResult.ok(
      MixedValidationSchema.validateSync(value, { abortEarly: false })
    );
  } catch (error) {
    const error_ = error as yup.ValidationError;
    const errors = error_?.errors ?? [];
    return ValidationResult.fail(value, errors);
  }
}
