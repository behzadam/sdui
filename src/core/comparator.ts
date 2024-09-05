import {
  includes as _includes,
  isEmpty as _isEmpty,
  isEqual as _isEqual,
  isUndefined,
} from "lodash";

import { Comparator, FieldValue } from "./types";

/**
 * Determines if the target value is empty.
 *
 * @param target - The value to check for emptiness.
 * @returns `true` if the target is empty, `false` otherwise.
 */
function isEmpty(target: unknown): boolean {
  return _isEmpty(target);
}

/**
 * Compares two values for equality.
 *
 * @param target - The value to compare against.
 * @param other - The value to compare.
 * @returns `true` if the target and other values are equal, `false` otherwise.
 */
function isEqual(target: unknown, other: unknown): boolean {
  return _isEqual(target, other);
}

/**
 * Determines if the target value contains the other value.
 *
 * @param target - The target value to check.
 * @param other - The value to check if it is contained in the target.
 * @returns `true` if the target contains the other value, `false` otherwise.
 */
function isContains(target: FieldValue, other: unknown): boolean {
  if (typeof target === "string" || Array.isArray(target)) {
    return _includes(target, other);
  }
  return false;
}

/**
 * Compares a target value against another value to determine if the target is greater than the other value.
 *
 * @param target - The target value to compare.
 * @param other - The value to compare the target against.
 * @returns `true` if the target is greater than the other value, `false` otherwise.
 */
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

/**
 * Compares a target value against another value to determine if the target is less than the other value.
 *
 * @param target - The target value to compare.
 * @param other - The value to compare the target against.
 * @returns `true` if the target is less than the other value, `false` otherwise.
 */
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

/**
 * Compares a target value against another value to determine if the target is greater than or equal to the other value.
 *
 * @param target - The target value to compare.
 * @param other - The value to compare the target against.
 * @returns `true` if the target is greater than or equal to the other value, `false` otherwise.
 */
function isGreaterThanOrEquals(target: FieldValue, other: FieldValue): boolean {
  return isGreaterThan(target, other) || isEqual(target, other);
}

/**
 * Compares a target value against another value to determine if the target is less than or equal to the other value.
 *
 * @param target - The target value to compare.
 * @param other - The value to compare the target against.
 * @returns `true` if the target is less than or equal to the other value, `false` otherwise.
 */
function isLessThanOrEqual(target: FieldValue, other: FieldValue): boolean {
  return !isGreaterThan(target, other) || isEqual(target, other);
}

/**
 * Compares a target value against another value based on the provided comparator.
 *
 * @param cond - The comparator to use for the comparison.
 * @param target - The target value to compare against.
 * @param other - The value to compare the target against.
 * @returns `true` if the comparison passes, `false` otherwise.
 * @throws Error if the provided comparator is not supported.
 */
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
