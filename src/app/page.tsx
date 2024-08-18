"use client";

// Fetch from API
import { OptionType } from "@/core/types";
import { useEffect } from "react";

// It may be fetch from API
import formData from "../core/data.json";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRenderUI } from "./use-render-ui";

export default function Home() {
  const { formValues, fields, fieldChanged } = useRenderUI(formData);

  useEffect(() => {
    console.log(formValues);
  }, [fields, formValues]);

  return (
    <main className="max-w-md container mt-8">
      <h1 className="mb-4 font-bold">
        Server-Driven UI With Conditional Rendering
      </h1>
      <form className="border p-8 rounded-sm flex flex-col gap-4">
        {fields.map((field) => {
          switch (field.type) {
            case "options":
              return (
                <div key={field.uid}>
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
                  <label htmlFor={field.uid}>{field.label}</label>
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
                            let newValue = null;
                            if (e.target.checked) {
                              newValue = [
                                ...formValues[field.uid],
                                e.target.value,
                              ];
                            } else {
                              newValue = formValues[field.uid].filter(
                                (value: string) => value !== e.target.value
                              );
                            }
                            fieldChanged(field, newValue);
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
                <Select
                  name={field.uid}
                  key={field.uid}
                  defaultValue={field.value}
                  onValueChange={(e) => {
                    // No any form to show
                    fieldChanged(field, e);
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    {field.options?.map((option: OptionType) => {
                      return (
                        <SelectItem key={option.uid} value={option.value}>
                          {option.label}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              );
            default:
              return (
                <div key={field.uid}>
                  <Label
                    className="block text-sm font-semibold"
                    htmlFor={field.uid}
                  >
                    {field.label}
                  </Label>
                  <Input
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
        <Button variant="default" type="submit">
          Submit
        </Button>
      </form>
    </main>
  );
}
