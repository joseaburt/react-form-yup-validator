import DateSchemaValidator from './date';
import ArraySchemaValidator from './array';
import MixedSchemaValidator from './mixed';
import NumberSchemaValidator from './number';
import StringSchemaValidator from './string';
import {
  IValidationResult,
  ValidationRulesTypes,
} from '../types/input-validation';

/**
 * ### Yup Rule Base Schema Validator
 * Validate any Rule Schema
 * @author <pino0071@gmail.com> Jose Aburto
 */
export default function RuleSchemaValidator(
  value: any,
  rules: ValidationRulesTypes
): IValidationResult {
  if (rules.type === 'array')
    return ArraySchemaValidator(rules.constrains, value);
  if (rules.type === 'date')
    return DateSchemaValidator(rules.constrains, value);
  if (rules.type === 'string')
    return StringSchemaValidator(rules.constrains, value);
  if (rules.type === 'number')
    return NumberSchemaValidator(rules.constrains, value);
  return MixedSchemaValidator(rules.constrains, value);
}
