const users = [
    { username: "john", password: "1234" },
    { username: "jane", password: "abcd" },
];

function findUser(username) {
    return users.find(u => u.username === username)
}

function saveUser(user) {
    users.push(user);
    return user;
}

module.exports = { findUser, saveUser };