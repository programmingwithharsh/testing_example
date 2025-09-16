// userService.test.js 
/*
jest
- Unit Testing 
- Positive and Negative case 
- Setup/Teardown hooks 
- Parameterized test 
- Integration test 
- Traceability to requirements 
*/

const UserService = require("../userService");

let service;

beforeAll(() => {
    console.log('Global setup before all tests');
});

afterAll(() => {
    console.log('Global clean up after all tests');
})

beforeEach(() => {
    service = new UserService();
    service.register("john", "1234"); // Precondition
})

afterEach(() => {
    service = null; // Postcondition
})

// --------------- Test Cases ----------------

describe('UserService Test', () => {

    // Postive test case: Regisration
    test('should register a new user successfully', () => {
        const result = service.register("alice", "pass123");
        expect(result).toBe("Registration successful");
        expect(service.users.length).toBe(2);
    })
    // Negative test case: Registration without username
    test('should not register user without username', () => {
        expect(() => service.register("", "text")).toThrow("Username and password required");
    })
    // Negative test case: Registration without password
    test('should not register user without password', () => {
        expect(() => service.register("bob", "")).toThrow("Username and password required");
    })
    // Missing coverage : Both username and password missing
    test('should not register users if both username and password are missing', () => {
        expect(() => service.register("", "")).toThrow("Username and password required");
    })

    // Postive test case: Login success
    test('should login with correct credentials', () => {
        const result = service.login("john", "1234");
        expect(result).toBe("Login successful");
    })

    // Negative test case: Login with wrong password
    test('should throw error for invalid password', () => {
        expect(() => service.login("john", "wrong")).toThrow("Invalid password");
    })

    // Negative test case: Login with non existent user
    test('should throw error if user not found', () => {
        expect(() => service.login("ghost", "wrong")).toThrow("User not found");
    })

    // search / filter, feature test
    test('should return user matching search keyword', () => {
        service.register("jane", "1234");
        const results = service.searchUsers("jan");
        expect(results).toHaveLength(1);
        expect(results[0].username).toBe('jane');
    })

    // Parameterized tests
    test.each([
        ["john", "1234", "Login successful"], // valid case
        ["john", "wrong", "Invalid password"] // invalid password
    ])("login", (username, password, expected) => {
        if (expected === "Login successful") {
            expect(service.login(username, password)).toBe(expected);
        } else {
            expect(() => service.login(username, password)).toThrow(expected);
        }
    })

    // Integration test: Register -> Login -> Search
    test('integration test: Register -> Login -> Search', () => {
        service.register("alice", "pass123");

        const loginRes = service.login("alice", "pass123");
        expect(loginRes).toBe("Login successful");

        const results = service.searchUsers("ali");
        expect(results).toHaveLength(1);
        expect(results[0].username).toBe("alice");
    })

});

