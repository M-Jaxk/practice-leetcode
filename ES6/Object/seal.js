const user = {
    name: "John"
};

Object.seal(user);

user.age = 25;
user.name = "Alice";

console.log(user);