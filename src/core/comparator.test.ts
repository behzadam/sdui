import { compare } from "./comparator";

describe("compare function", () => {
  it("should return true for Contains condition when target contains other", () => {
    expect(compare("Contains", "abc", "b")).toBe(true);
  });

  it("should return false for Contains condition when target does not contain other", () => {
    expect(compare("Contains", "abc", "d")).toBe(false);
  });

  it("should return true for EqualTo condition when target equals other", () => {
    expect(compare("EqualTo", "abc", "abc")).toBe(true);
    expect(compare("EqualTo", 1, 1)).toBe(true);
    expect(compare("EqualTo", 1, 2)).toBe(false);
    expect(compare("EqualTo", [1, 2], [1, 2])).toBe(true);
    expect(compare("EqualTo", [1, 2], [1, 2, 3])).toBe(false);
  });

  it("should return false for EqualTo condition when target does not equal other", () => {
    expect(compare("EqualTo", "abc", "def")).toBe(false);
  });

  it("should return true for GreaterThan condition when target is greater than other", () => {
    expect(compare("GreaterThan", 5, 3)).toBe(true);
  });

  it("should return false for GreaterThan condition when target is not greater than other", () => {
    expect(compare("GreaterThan", 3, 5)).toBe(false);
  });

  it("should return true for GreaterThanOrEquals condition when target is greater than other", () => {
    expect(compare("GreaterThanOrEquals", 5, 3)).toBe(true);
  });

  it("should return true for GreaterThanOrEquals condition when target equals other", () => {
    expect(compare("GreaterThanOrEquals", 5, 5)).toBe(true);
  });

  it("should return true for IsEmpty condition when target is empty", () => {
    expect(compare("IsEmpty", "", null)).toBe(true);
  });

  it("should return false for IsEmpty condition when target is not empty", () => {
    expect(compare("IsEmpty", "abc", null)).toBe(false);
  });

  it("should return true for IsNotEmpty condition when target is not empty", () => {
    expect(compare("IsNotEmpty", "abc", null)).toBe(true);
  });

  it("should return false for IsNotEmpty condition when target is empty", () => {
    expect(compare("IsNotEmpty", "", null)).toBe(false);
  });

  it("should return true for IsNotContaining condition when target does not contain other", () => {
    expect(compare("IsNotContaining", "abc", "d")).toBe(true);
  });

  it("should return false for IsNotContaining condition when target contains other", () => {
    expect(compare("IsNotContaining", "abc", "b")).toBe(false);
  });

  it("should return true for LessThan condition when target is less than other", () => {
    expect(compare("LessThan", 3, 5)).toBe(true);
  });

  it("should return false for LessThan condition when target is not less than other", () => {
    expect(compare("LessThan", 5, 3)).toBe(false);
  });

  it("should return true for LessThanOrEquals condition when target is less than other", () => {
    expect(compare("LessThanOrEquals", 3, 5)).toBe(true);
  });

  it("should return true for LessThanOrEquals condition when target equals other", () => {
    expect(compare("LessThanOrEquals", 5, 5)).toBe(true);
  });

  it("should return true for NotEqualTo condition when target does not equal other", () => {
    expect(compare("NotEqualTo", "abc", "def")).toBe(true);
  });

  it("should return false for NotEqualTo condition when target equals other", () => {
    expect(compare("NotEqualTo", "abc", "abc")).toBe(false);
  });
});
