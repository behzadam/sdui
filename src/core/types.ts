export type Comparator =
  | "EqualTo"
  | "NotEqualTo"
  | "NotEqualTo"
  | "IsNotContaining"
  | "Contains"
  | "IsEmpty"
  | "IsNotEmpty"
  | "GreaterThan"
  | "GreaterThanOrEquals"
  | "LessThan"
  | "LessThanOrEquals";

export type If = "All" | "Any";
export type Then = "Show" | "Hide" | "JumpTo";

export type FieldValue = number | string | boolean | any[] | null | undefined;
export type FieldValues = Record<string, any>;

export type OptionType = {
  label: string;
  value: string;
  checked: boolean;
  uid: string;
};

export type Condition = {
  when: string;
  is: Comparator;
  value: FieldValue;
};

export type FieldType = {
  uid: string;
  label: string;
  type: string;
  value?: any;
  condition?: string;
  logic?: {
    if: If;
    conditions: Condition[];
  };
  options?: OptionType[];
  onChange(uid: string, value: string): void;
};
