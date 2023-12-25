import * as yup from 'yup';
import ValidationResult from '../results';
import { IValidationResult } from '../types/input-validation';
import { StringValidationConstrains } from '../types/input-validation-string';

/**
 * ### Yup String Base Schema Validator
 * Given an string schema valition check its validaty
 * @author <pino0071@gmail.com> Jose Aburto
 */
export default function StringSchemaValidator(
  constrains: StringValidationConstrains[],
  value: any
): IValidationResult {
  let StringValidationSchema = yup.string();
  for (const constrain of constrains) {
    switch (constrain.method) {
      case 'email':
        StringValidationSchema = StringValidationSchema.email(
          constrain.params.message
        );
        break;
      case 'required':
        StringValidationSchema = StringValidationSchema.required(
          constrain.params.message
        );
        break;
      case 'min':
        StringValidationSchema = StringValidationSchema.min(
          constrain.params.value,
          constrain.params.message
        );
        break;
      case 'max':
        StringValidationSchema = StringValidationSchema.max(
          constrain.params.value,
          constrain.params.message
        );
        break;
      case 'lowercase':
        StringValidationSchema = StringValidationSchema.lowercase(
          constrain.params.message
        );
        break;
      case 'uppercase':
        StringValidationSchema = StringValidationSchema.uppercase(
          constrain.params.message
        );
        break;
      case 'matches':
        StringValidationSchema = StringValidationSchema.matches(
          constrain.params.value,
          constrain.params.message
        );
        break;
      case 'matches':
        StringValidationSchema = StringValidationSchema.matches(
          constrain.params.value,
          constrain.params.message
        );
        break;
      case 'length':
        StringValidationSchema = StringValidationSchema.length(
          constrain.params.value,
          constrain.params.message
        );
        break;
    }
  }

  try {
    return ValidationResult.ok(
      StringValidationSchema.validateSync(value, { abortEarly: false })
    );
  } catch (error) {
    const error_ = error as yup.ValidationError;
    const errors = error_?.errors ?? [];
    return ValidationResult.fail(value, errors);
  }
}
