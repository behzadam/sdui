import { normalizeData } from "./filter";
import { FieldType } from "./types";

describe("normalizeData", () => {
  it("should return an empty object for an empty array", () => {
    expect(normalizeData([])).toEqual({});
  });

  it("should normalize multiple fields", () => {
    const fields: FieldType[] = [
      {
        uid: "f61233e8",
        label: "Number",
        name: "phone",
        type: "number",
        value: 1,
        onChange: () => {},
      },
      {
        uid: "f61233e9",
        label: "String",
        name: "name",
        type: "text",
        value: "John",
        onChange: () => {},
      },
      {
        uid: "f61233ea",
        label: "Boolean",
        name: "isActive",
        type: "checkbox",
        value: true,
        onChange: () => {},
      },
    ];
    expect(normalizeData(fields)).toStrictEqual({
      f61233e8: 1,
      f61233e9: "John",
      f61233ea: true,
    });
  });
});
