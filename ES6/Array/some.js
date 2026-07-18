//Returns true if at least one matches.

const users = [
    {
        id: 1,
        name: "A",
        admin: true
    },
     {
        id: 2,
        name: "B",
        admin: false
    },
     {
        id: 3,
        name: "C",
        admin: false
    },
     {
        id: 3,
        name: "D",
        admin: true
    },
]

console.log(users.some(u=>u.admin));