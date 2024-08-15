"use client";

// Fetch from API
import { OptionType } from "@/core/types";
import { useEffect } from "react";

// It may be fetch from API
import formData from "../core/data.json";

import { useRenderUI } from "./use-render-ui";

export default function Home() {
  const { formValues, fields, fieldChanged } = useRenderUI(formData);

  useEffect(() => {
    console.log({ formValues, fields });
  }, [fields, formValues]);

  return (
    <main>
      <h1>Form</h1>
      <form>
        {fields.map((field) => {
          switch (field.type) {
            case "options":
              return (
                <div className="mb-8" key={field.uid}>
                  <label className="block mb-3 text-sm font-semibold">
                    {field.label}
                  </label>
                  {field.options?.map((option: OptionType) => {
                    return (
                      <label
                        className="block mb-2 text-sm font-medium cursor-pointer"
                        key={option.uid}
                        htmlFor={option.uid}
                      >
                        <input
                          type="radio"
                          name={field.uid}
                          value={option.value}
                          id={option.uid}
                          defaultChecked={option.checked}
                          onChange={(
                            e: React.ChangeEvent<HTMLInputElement>
                          ) => {
                            fieldChanged(field, e.target.value);
                          }}
                        />
                        {option.label}
                      </label>
                    );
                  })}
                </div>
              );
            case "checkboxes":
              return (
                <div key={field.uid}>
                  <label
                    className="block mb-3 text-sm font-semibold"
                    htmlFor={field.uid}
                  >
                    {field.label}
                  </label>
                  {field.options?.map((option: OptionType) => {
                    return (
                      <label
                        className="block mb-2 text-sm font-medium cursor-pointer"
                        key={option.uid}
                        htmlFor={option.uid}
                      >
                        <input
                          type="checkbox"
                          name={field.uid}
                          value={option.value}
                          id={option.uid}
                          defaultChecked={option.checked}
                          onChange={(
                            e: React.ChangeEvent<HTMLInputElement>
                          ) => {
                            fieldChanged(field, e.target.value);
                          }}
                        />
                        {option.label}
                      </label>
                    );
                  })}
                </div>
              );
            case "select":
              return (
                <div role="select" key={field.uid}>
                  <label className="block mb-3 text-sm font-semibold">
                    {field.label}
                  </label>
                  <select
                    id={field.uid}
                    name={field.uid}
                    defaultValue={field.value}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                      fieldChanged(field, e.target.value);
                    }}
                  >
                    {field.options?.map((option: OptionType) => {
                      return (
                        <option key={option.uid} value={option.value}>
                          {option.label}
                        </option>
                      );
                    })}
                  </select>
                </div>
              );
            default:
              return (
                <div className="mb-6" key={field.uid}>
                  <label
                    className="block mb-3 text-sm font-semibold"
                    htmlFor={field.uid}
                  >
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    name={field.uid}
                    id={field.uid}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      fieldChanged(field, e.target.value);
                    }}
                  />
                </div>
              );
          }
        })}
        <button type="submit">Submit</button>
      </form>
    </main>
  );
}
