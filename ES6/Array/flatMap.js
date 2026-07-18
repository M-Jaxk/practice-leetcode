const users = [
    {
        name:"John",
        hobbies:["Coding","Gaming"]
    },
    {
        name:"Alice",
        hobbies:["Reading"]
    }
];

const hobbies = users.flatMap(
    user => user.hobbies
);

console.log(hobbies);