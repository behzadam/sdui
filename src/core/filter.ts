import { compare } from "./comparator";
import { FieldType, FieldValues, If } from "./types";

/**
 * Gets the default value for a given field.
 *
 * For checkboxes, it returns an array of selected option values.
 * For other field types (input, select, etc.), it returns the value of the first checked option.
 *
 * @param field - The field object containing the options and type information.
 * @returns The default value for the field, either a string or an array of strings.
 */
function getDefaultValue(field: FieldType): string | string[] {
  // input, select, options
  let defaultValue = field.value ?? "";
  if (!field.options) return defaultValue;

  // checkboxes
  const defaultSelectedList: string[] = [];
  field?.options?.forEach((option) => {
    console.log("Opt:", { option });
    if (option.checked) {
      defaultSelectedList.push(option.value);
    }
  });
  return defaultSelectedList;
}

/**
 * Normalizes the data for a set of fields by extracting the default values for each field.
 *
 * @param fields - An array of `FieldType` objects representing the fields to normalize.
 * @returns An object where the keys are the field UIDs and the values are the default values for each field.
 */
function normalizeData(fields: any[]): Record<string, any> {
  return fields.reduce((result, field: FieldType) => {
    return {
      ...result,
      [field.uid]: getDefaultValue(field),
    };
  }, {} as Record<string, any>);
}

/**
 * Checks if a set of conditions defined in a field's logic are satisfied.
 *
 * @param cond - The logical condition to check, either "All" or "Any".
 * @param states - An array of boolean values representing the results of the individual conditions.
 * @returns `true` if the logical condition is satisfied, `false` otherwise.
 */
function satisfiesCondition(cond: If, states: boolean[]): boolean {
  if (cond === "All") return states.every((item) => item === true);
  if (cond === "Any") return states.some((item) => item === true);
  return false;
}

/**
 * Checks if a field meets the specified conditions defined in its logic.
 *
 * @param formValues - An object containing the current form values.
 * @returns A function that takes a `FieldType` and returns a boolean indicating whether the field meets the conditions.
 */
function fieldMeetsCondition(formValues: FieldValues) {
  return function filter(field: FieldType): boolean {
    if (field.logic) {
      const states = field.logic.conditions.reduce<boolean[]>((acc, cond) => {
        // Get target value (by uid key)
        const targetValue = formValues[cond.when];
        // Gte field value from API
        const fieldValue = cond.value;
        // Generate an array of boolean: [true, false, ...]
        return [...acc, compare(cond.is, targetValue, fieldValue) || false];
      }, []);

      // Check if fields meet logic: All, Any
      return satisfiesCondition(field.logic.if, states);
    }
    // Show field by default
    return true;
  };
}

export { fieldMeetsCondition, normalizeData };
