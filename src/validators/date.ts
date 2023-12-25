import * as yup from 'yup';
import ValidationResult from '../results';
import { IValidationResult } from '../types/input-validation';
import { DateValidationConstrains } from '../types/input-validation-date';

/**
 * ### Yup Date Base Schema Validator
 * Given an date schema validation check its validity
 * @author <pino0071@gmail.com> Jose Aburto
 */
export default function DateSchemaValidator(
  constrains: DateValidationConstrains[],
  value: any
): IValidationResult {
  let DateValidationSchema = yup.date();
  for (const constrain of constrains) {
    const { method } = constrain;
    switch (method) {
      case 'required':
        DateValidationSchema = DateValidationSchema.required(
          constrain.params.message
        );
        break;
      case 'min':
        DateValidationSchema = DateValidationSchema.min(
          constrain.params.value,
          constrain.params.message
        );
        break;
      case 'max':
        DateValidationSchema = DateValidationSchema.max(
          constrain.params.value,
          constrain.params.message
        );
        break;
    }
  }

  try {
    return ValidationResult.ok(
      DateValidationSchema.validateSync(value, { abortEarly: false })
    );
  } catch (error) {
    const error_ = error as yup.ValidationError;
    const errors = error_?.errors ?? [];
    return ValidationResult.fail(value, errors);
  }
}
