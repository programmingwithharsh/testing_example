// userService2.js
function validateAge(age) {
  if (typeof age !== "number") throw new Error("Age must be a number");
  if (age < 0 || age > 120) throw new Error("Invalid age");
  return age >= 18 ? "Adult" : "Minor"; // ternary operator
}

function login(username, password) {
  if (!username || !password) throw new Error("Missing credentials");
  if (username === "admin" && password === "admin123") return "Login success";
  return "Invalid credentials";
}

function calculateDiscount(type, amount) {
  if (type === "student" && amount > 1000) return 0.2 * amount;
  if (type === "employee" && amount > 500) return 0.1 * amount;
  return 0;
}

module.exports = { validateAge, login, calculateDiscount };
