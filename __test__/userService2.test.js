// userService.test.js
const { validateAge, login, calculateDiscount } = require("../userService2");

describe("Jest Testing Examples", () => {
  /**
   * 1. Defect Clustering
   * Focus tests where most defects are expected (e.g., login logic)
   */
  describe("Defect Clustering - Login", () => {
    test("should fail login with missing credentials", () => {
      expect(() => login("", "")).toThrow("Missing credentials");
    });
    test("should pass with valid credentials", () => {
      expect(login("admin", "admin123")).toBe("Login success");
    });
    test("should fail with wrong password", () => {
      expect(login("admin", "wrong")).toBe("Invalid credentials");
    });
  });

  /**
   * 2. Decision Table Testing
   * For calculateDiscount (type vs. amount)
   */
  describe("Decision Table - Discount Calculation", () => {
    test("student with amount > 1000 => 20% discount", () => {
      expect(calculateDiscount("student", 2000)).toBe(400);
    });
    test("student with amount <= 1000 => no discount", () => {
      expect(calculateDiscount("student", 800)).toBe(0);
    });
    test("employee with amount > 500 => 10% discount", () => {
      expect(calculateDiscount("employee", 600)).toBe(60);
    });
    test("employee with amount <= 500 => no discount", () => {
      expect(calculateDiscount("employee", 400)).toBe(0);
    });
    test("other user types => no discount", () => {
      expect(calculateDiscount("guest", 2000)).toBe(0);
    });
  });

  /**
   * 3. White-box Testing
   * Cover all paths of validateAge (branches)
   */
  describe("White-box Testing - Age Validation", () => {
    test("age must be a number", () => {
      expect(() => validateAge("20")).toThrow("Age must be a number");
    });
    test("age < 0 should throw", () => {
      expect(() => validateAge(-5)).toThrow("Invalid age");
    });
    test("age > 120 should throw", () => {
      expect(() => validateAge(150)).toThrow("Invalid age");
    });
    test("age >= 18 => Adult", () => {
      expect(validateAge(25)).toBe("Adult");
    });
    test("age < 18 => Minor", () => {
      expect(validateAge(10)).toBe("Minor");
    });
  });

  /**
   * 4. Equivalence Partitioning
   * Partition: <0 (invalid), 0-17 (Minor), 18-120 (Adult), >120 (invalid)
   */
  describe("Equivalence Partitioning - Age Validation", () => {
    test("invalid age < 0", () => {
      expect(() => validateAge(-1)).toThrow("Invalid age");
    });
    test("minor group (10)", () => {
      expect(validateAge(10)).toBe("Minor");
    });
    test("adult group (30)", () => {
      expect(validateAge(30)).toBe("Adult");
    });
    test("invalid age > 120", () => {
      expect(() => validateAge(121)).toThrow("Invalid age");
    });
  });

  /**
   * 5. Smoke & Sanity Testing
   * Smoke = basic app functionality works, Sanity = small fix retest
   */
  describe("Smoke & Sanity Tests", () => {
    test("smoke test: login should work with valid credentials", () => {
      expect(login("admin", "admin123")).toBe("Login success");
    });

    test("sanity test: quick retest of fix for wrong password case", () => {
      expect(login("admin", "wrong")).toBe("Invalid credentials");
    });
  });

  /**
   * 6. Boundary Value Analysis (BVA)
   * For age validation: boundaries at 0, 17, 18, 120
   */
  describe("Boundary Value Analysis - Age Validation", () => {
    test("age = 0 => Minor", () => {
      expect(validateAge(0)).toBe("Minor");
    });
    test("age = 17 => Minor", () => {
      expect(validateAge(17)).toBe("Minor");
    });
    test("age = 18 => Adult", () => {
      expect(validateAge(18)).toBe("Adult");
    });
    test("age = 120 => Adult", () => {
      expect(validateAge(120)).toBe("Adult");
    });
  });
});
