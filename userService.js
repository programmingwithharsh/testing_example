class UserService {
    constructor() {
        this.users = [];
    }
    // register method
    register(username, password) {
        if (!username || !password) {
            throw new Error("Username and password required");
        }
        // Check if user already exists
        if (this.users.find(u => u.username === username)) {
            throw new Error("User already exists");
        }
        this.users.push({ username, password });
        return "Registration successful";
    }

    login(username, password) {
        // find user in the list
        const user = this.users.find(u => u.username === username);
        // if user does not exist, throw error
        if (!user) {
            throw new Error("User not found");
        }
        // check password
        if (user.password !== password) {
            throw new Error("Invalid password");
        }
        return "Login successful";
    }

    // search / filter method
    searchUsers(keyword) {
        return this.users.filter(u =>
            u.username.toLowerCase().includes(keyword.toLowerCase())
        )
    }
}

module.exports = UserService;