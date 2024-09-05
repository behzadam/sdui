import {
  includes as _includes,
  isEmpty as _isEmpty,
  isEqual as _isEqual,
  isUndefined,
} from "lodash";

import { Comparator, FieldValue } from "./types";

function isEmpty(target: unknown): boolean {
  return _isEmpty(target);
}

function isEqual(target: unknown, other: unknown): boolean {
  return _isEqual(target, other);
}

function isContains(target: FieldValue, other: unknown): boolean {
  if (typeof target === "string" || Array.isArray(target)) {
    return _includes(target, other);
  }
  return false;
}

function isGreaterThan(target: FieldValue, other: FieldValue): boolean {
  if (isUndefined(target) || isUndefined(other)) return false;

  if (Array.isArray(target) && Array.isArray(other))
    return target.length > other.length;
  if (typeof target === "string" && typeof other === "string")
    return target.length > other.length;
  if (typeof target === "number" && typeof other === "number")
    return target > other;

  return false;
}

function isLessThan(target: FieldValue, other: FieldValue): boolean {
  if (isUndefined(target) || isUndefined(other)) return false;

  if (Array.isArray(target) && Array.isArray(other))
    return target.length < other.length;
  if (typeof target === "string" && typeof other === "string")
    return target.length < other.length;
  if (typeof target === "number" && typeof other === "number")
    return target < other;

  return false;
}

function isGreaterThanOrEquals(target: FieldValue, other: FieldValue): boolean {
  return isGreaterThan(target, other) || isEqual(target, other);
}

function isLessThanOrEqual(target: FieldValue, other: FieldValue): boolean {
  return !isGreaterThan(target, other) || isEqual(target, other);
}

function compare(cond: Comparator, target: FieldValue, other: FieldValue) {
  switch (cond) {
    case "Contains": return isContains(target, other);
    case "EqualTo": return isEqual(target, other);
    case "GreaterThan": return isGreaterThan(target, other);
    case "GreaterThanOrEquals": return isGreaterThanOrEquals(target, other);
    case "IsEmpty": return isEmpty(target);
    case "IsNotEmpty": return !isEmpty(target);
    case "IsNotContaining": return !isContains(target, other);
    case "LessThan": return isLessThan(target, other);
    case "LessThanOrEquals": return isLessThanOrEqual(target, other);
    case "NotEqualTo": return !isEqual(target, other);
    default: throw new Error(`Unsupported comparator: ${cond}`);
  }
}

export { compare };
