
import {
  formatDate,
  getRatingColorClass,
  truncateText,
  formatPhoneNumber,
  calculateAge,
} from "../utils/helpers.js";

describe("formatDate", () => {
  test("formats date correctly", () => {
    expect(formatDate("2025-06-10")).toContain("June 10, 2025");
  });

  test("returns empty string for invalid input", () => {
    expect(formatDate(null)).toBe("");
    expect(formatDate(undefined)).toBe("");
    expect(formatDate("")).toBe("");
  });
});

describe("getRatingColorClass", () => {
  test("returns correct class for excellent rating", () => {
    expect(getRatingColorClass(5)).toBe("text-success");
    expect(getRatingColorClass(4.5)).toBe("text-success");
  });

  test("returns correct class for good rating", () => {
    expect(getRatingColorClass(4)).toBe("text-primary");
    expect(getRatingColorClass(3.5)).toBe("text-primary");
  });

  test("returns correct class for average rating", () => {
    expect(getRatingColorClass(3)).toBe("text-warning");
    expect(getRatingColorClass(2.5)).toBe("text-warning");
  });

  test("returns correct class for poor rating", () => {
    expect(getRatingColorClass(2)).toBe("text-danger");
    expect(getRatingColorClass(1)).toBe("text-danger");
  });
});


describe("truncateText", () => {
  test("truncates long text", () => {
    const longText =
      "This is a very long text that should be truncated by the function";
    expect(truncateText(longText, 10)).toBe("This is a ...");
  });

  test("does not truncate short text", () => {
    const shortText = "Short text";
    expect(truncateText(shortText, 20)).toBe(shortText);
  });

  test("handles empty input", () => {
    expect(truncateText("")).toBe("");
    expect(truncateText(null)).toBe("");
    expect(truncateText(undefined)).toBe("");
  });
});

describe("formatPhoneNumber", () => {
  test("formats 10-digit phone number correctly", () => {
    expect(formatPhoneNumber("1234567890")).toBe("(123) 456-7890");
  });

  test("handles input with non-numeric characters", () => {
    expect(formatPhoneNumber("(123) 456-7890")).toBe("(123) 456-7890");
    expect(formatPhoneNumber("123-456-7890")).toBe("(123) 456-7890");
  });

  test("returns original value for non-standard format", () => {
    expect(formatPhoneNumber("12345")).toBe("12345");
  });

  test("handles empty input", () => {
    expect(formatPhoneNumber("")).toBe("");
    expect(formatPhoneNumber(null)).toBe("");
    expect(formatPhoneNumber(undefined)).toBe("");
  });
});

describe("calculateAge", () => {
  const originalDate = Date;
  const mockDate = new Date(2025, 5, 10); 

  beforeAll(() => {
    global.Date = class extends Date {
      constructor() {
        return mockDate;
      }
    };
  });

  afterAll(() => {
    global.Date = originalDate;
  });

  test("calculates age correctly", () => {
    expect(calculateAge("1990-01-01")).toBe(35);
    expect(calculateAge("2000-06-10")).toBe(25);
    expect(calculateAge("2000-06-11")).toBe(24); 
    expect(calculateAge("2000-06-09")).toBe(25); 
  });

  test("handles invalid input", () => {
    expect(calculateAge(null)).toBeNull();
    expect(calculateAge("")).toBeNull();
    expect(calculateAge(undefined)).toBeNull();
  });
});
