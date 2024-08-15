import { useEffect, useState } from "react";
import { fieldMeetsCondition, normalizeData } from "./filter";
import { FieldType } from "./types";

export function useRenderUI(formData: any[]) {
  const [fields, setFields] = useState<FieldType[]>(formData);
  const [formValues, setFormValues] = useState<Record<string, any>>({});

  useEffect(() => {
    setFormValues(() => normalizeData(formData));
    console.log("formValues", formValues);
  }, [formData]);

  useEffect(() => {
    setFields(formData.filter(fieldMeetsCondition(formValues)));
  }, [formData, formValues]);

  const fieldChanged = (field: FieldType, newValue: FieldType) => {
    console.log("field", field, newValue);
    setFormValues(() => {
      return { ...formValues, [field.uid]: newValue };
    });
  };

  return {
    formValues,
    fields,
    fieldChanged,
  };
}
