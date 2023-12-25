import * as yup from 'yup';
import ValidationResult from '../results';
import { IValidationResult } from '../types/input-validation';
import { NumberValidationConstrains } from '../types/input-validation-number';

/**
 * ### Yup Number Base Schema Validator
 * Given an number schema valition check its validaty
 * @author <pino0071@gmail.com> Jose Aburto
 */
export default function NumberSchemaValidator(
  constrains: NumberValidationConstrains[],
  value: any
): IValidationResult {
  let NumberValidationSchema = yup.number();
  for (const constrain of constrains) {
    const { method } = constrain;
    switch (method) {
      case 'required':
        NumberValidationSchema = NumberValidationSchema.required(
          constrain.params.message
        );
        break;
      case 'min':
        NumberValidationSchema = NumberValidationSchema.min(
          constrain.params.value,
          constrain.params.message
        );
        break;
      case 'max':
        NumberValidationSchema = NumberValidationSchema.max(
          constrain.params.value,
          constrain.params.message
        );
        break;
      case 'positive':
        NumberValidationSchema = NumberValidationSchema.positive(
          constrain.params.message
        );
        break;
      case 'negative':
        NumberValidationSchema = NumberValidationSchema.negative(
          constrain.params.message
        );
        break;
      case 'lessThan':
        NumberValidationSchema = NumberValidationSchema.lessThan(
          constrain.params.value,
          constrain.params.message
        );
        break;
      case 'moreThan':
        NumberValidationSchema = NumberValidationSchema.moreThan(
          constrain.params.value,
          constrain.params.message
        );
        break;
    }
  }

  try {
    return ValidationResult.ok(
      NumberValidationSchema.validateSync(value, { abortEarly: false })
    );
  } catch (error) {
    const error_ = error as yup.ValidationError;
    const errors = error_?.errors ?? [];
    return ValidationResult.fail(value, errors);
  }
}
