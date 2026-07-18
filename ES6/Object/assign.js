const user = {
    id: 1,
    name: "John",
    age: 25,
    city: "New York"
};

const newUser = Object.assign({}, user);

console.log(newUser);