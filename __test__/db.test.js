const { findUser, saveUser } = require("./db");

describe('DB module direct tests', () => {
    test('should save and find user', () => {
        const newUser = { username: "sam", password: "xyz" };
        saveUser(newUser);
        const found = findUser("sam");
        expect(found).toEqual(newUser);
    });

    test('should return undefined for non existing user', () => {
        const found = findUser("ghost");
        expect(found).toBeUndefined();
    });
});