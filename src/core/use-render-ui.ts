import { useEffect, useState } from "react";
import { generateFormValues, renderUI } from "./render-ui";
import { FieldType } from "./types";

export function useRenderUI(formData: any[]) {
  const [fields, setFields] = useState<FieldType[]>(formData);
  const [formValues, setFormValues] = useState<Record<string, any>>({});

  useEffect(() => {
    setFormValues(() => generateFormValues(formData));
  }, [formData]);

  useEffect(() => {
    setFields(formData.filter(renderUI(formValues)));
  }, [formData, formValues]);

  const fieldChanged = (field: FieldType, newValue: any) => {
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
