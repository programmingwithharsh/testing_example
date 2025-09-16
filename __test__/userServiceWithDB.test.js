// userServiceWithEB.test.js
// Mocking with Jest

const UserServiceWithDB = require("../userServiceWithDB"); // ES5 Approach
const db = require("../db"); // ES5 Approach

// Automatically moch the db module 
jest.mock("../db");

let service;

beforeEach(() => {
    service = new UserServiceWithDB();
    // Clear all mock call history before each test
    jest.clearAllMocks();
})

describe('UserServiceWithDB with mocked DB', () => {
    test('should register a user successfully (mocked)', () => {
        db.findUser.mockReturnValue(undefined);
        db.saveUser.mockReturnValue({ username: "alice", password: "pass123" })
        // Act 
        const result = service.register("alice", "pass123");
        expect(result).toBe("Registration successful");
        expect(db.findUser).toHaveBeenCalledWith("alice");
        expect(db.saveUser).toHaveBeenCalledTimes(1);
    })

    test('should not register if user already exists (mocked)', () => {
        // find User 
        db.findUser.mockReturnValue({ username: "john", password: "1234" });
        // Act and Assert
        expect(() => service.register("john", "newpass")).toThrow("User already exists");
    })

    test('should login successfully with correct credentials (mocked)', () => {
        db.findUser.mockReturnValue({ username: "john", password: "1234" });
        // Act 
        const result = service.login("john", "1234");
        // Assert 
        expect(result).toBe("Login successful");
        expect(db.findUser).toHaveBeenCalledWith("john");
    })

    test('should throw error for invalid password (mocked)', () => {
        db.findUser.mockReturnValue({ username: "john", password: "1234" });
        // Act & Assert 
        expect(() => service.register("john", "wrong")).toThrow("Invalid password");
    })

    test('should throw error if user not found (mocked)', () => {
        db.findUser.mockReturnValue(undefined);
        // Act & Assert 
        expect(() => service.login("unknown", "pass")).toThrow("User not found");
    })
    
    test('should throw error if username or password missing', () => {
        expect(() => service.register("", "")).toThrow("Username and password required");
    })
});