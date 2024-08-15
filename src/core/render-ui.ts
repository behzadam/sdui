import { compare } from "./comparetor";
import { FieldType, FieldValues, If } from "./types";

function getDefaultValue(field: FieldType): string | string[] {
  // checkboxes
  const defaultSelectedList: string[] = [];
  // input, select, options
  let defaultValue = field.value ?? null;
  field?.options?.forEach((option) => {
    if (option.checked) {
      if (field.type === "checkboxes") {
        defaultSelectedList.push(option.value);
      } else {
        defaultValue = option.value;
      }
    }
  });
  return defaultValue || defaultSelectedList;
}

function normalizeData(fields: any[]): Record<string, any> {
  return fields.reduce((result, field: FieldType) => {
    return {
      ...result,
      [field.uid]: getDefaultValue(field),
    };
  }, {} as Record<string, any>);
}

function fieldMeetsCondition(cond: If, states: boolean[]): boolean {
  if (cond === "All") return states.every((item) => item === true);
  if (cond === "Any") return states.some((item) => item === true);
  return false;
}

function renderUI(formValues: FieldValues) {
  return function loadWithCondition(field: FieldType): boolean {
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
      return fieldMeetsCondition(field.logic.if, states);
    }
    // Show field by default
    return true;
  };
}

export { normalizeData as generateFormValues, renderUI };
