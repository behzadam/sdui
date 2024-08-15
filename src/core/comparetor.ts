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
  if (cond === "Contains") return isContains(target, other);
  if (cond === "EqualTo") return isEqual(target, other);
  if (cond === "GreaterThan") return isGreaterThan(target, other);
  if (cond === "GreaterThanOrEquals")
    return isGreaterThanOrEquals(target, other);
  if (cond === "IsEmpty") return isEmpty(target);
  if (cond === "IsNotEmpty") return !isEmpty(target);
  if (cond === "IsNotContaining") return !isContains(target, other);
  if (cond === "LessThan") return isLessThan(target, other);
  if (cond === "LessThanOrEquals") return isLessThanOrEqual(target, other);
  if (cond === "NotEqualTo") return !isEqual(target, other);
}

export { compare };
