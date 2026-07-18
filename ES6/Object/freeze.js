const user = {
    name: "John"
};

Object.freeze(user);

user.name = "Alice";

console.log(user);