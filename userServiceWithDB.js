// userServiceWithDB.js
// Service that uses db.js for persistence, will be tested with mocking

const db = require("./db");

class UserServiceWithDB {
    register(username, password) {
        if (!username || !password) {
            throw new Error("Username and password required");
        }

        const existing = db.findUser(username);
        if (existing) {
            throw new Error("User already exists");
        }

        db.saveUser({ username, password });
        return "Registration successful";
    }

    login(username, password) {
        const user = db.findUser(username);
        if (!user) {
            throw new Error("User not found");
        }
        if (user.password !== password) {
            throw new Error("Invalid password");
        }
        return "Login successful";
    }
}

module.exports = UserServiceWithDB;