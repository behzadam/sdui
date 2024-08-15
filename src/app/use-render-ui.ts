import { useEffect, useMemo, useState } from "react";
import { fieldMeetsCondition, normalizeData } from "../core/filter";
import { FieldType } from "../core/types";

export function useRenderUI(formData: any[]) {
  // We need to keep track of the form values specially for Form Libraries
  // like Formik or React Hook Form.
  const [formValues, setFormValues] = useState<Record<string, any>>({});

  // We generate the UI by filtering the fields.
  const memoizedFields = useMemo(
    () => formData.filter(fieldMeetsCondition(formValues)),
    [formData, formValues]
  );

  useEffect(() => {
    // We need to normalize the form data to make it easier to work with.
    // It would be a key value pair of filed UUID and value.
    // For example: { "1ed23456-7890-1234-5678-90abcdef1234": "John Doe", ... }
    setFormValues(() => normalizeData(formData));
  }, [formData]);

  const fieldChanged = (field: FieldType, newValue: string) => {
    console.log("Field changed:", newValue);
    setFormValues(() => {
      return { ...formValues, [field.uid]: newValue };
    });
  };

  return {
    formValues,
    fields: memoizedFields,
    fieldChanged,
  };
}
