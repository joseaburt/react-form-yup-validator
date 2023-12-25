import * as yup from 'yup';
import ValidationResult from '../results';
import { IValidationResult } from '../types/input-validation';
import { ArrayValidationConstrains } from '../types/input-validation-array';

/**
 * ### Yup Array Base Schema Validator
 * Given an array schema valition check its validaty
 * @author <pino0071@gmail.com> Jose Aburto
 */
export default function ArraySchemaValidator(
  constrains: ArrayValidationConstrains[],
  value: any
): IValidationResult {
  let ArrayValidationSchema = yup.array();
  for (const constrain of constrains) {
    const { method } = constrain;
    switch (method) {
      case 'required':
        ArrayValidationSchema = ArrayValidationSchema.required(
          constrain.params.message
        );
        break;
      case 'length':
        ArrayValidationSchema = ArrayValidationSchema.length(
          constrain.params.value,
          constrain.params.message
        );
        break;
      case 'min':
        ArrayValidationSchema = ArrayValidationSchema.min(
          constrain.params.value,
          constrain.params.message
        );
        break;
      case 'max':
        ArrayValidationSchema = ArrayValidationSchema.max(
          constrain.params.value,
          constrain.params.message
        );
        break;
    }
  }
  try {
    return ValidationResult.ok(
      ArrayValidationSchema.validateSync(value, value)
    );
  } catch (error) {
    const error_ = error as yup.ValidationError;
    const errors = error_?.errors ?? [];
    return ValidationResult.fail(value, errors);
  }
}
