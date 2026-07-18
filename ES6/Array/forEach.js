const users = [
    {
        id: 1,
        name: "A",
        active: true
    },
     {
        id: 2,
        name: "B",
        active: false
    },
     {
        id: 3,
        name: "C",
        active: false
    },
     {
        id: 4,
        name: "D",
        active: true
    },
]
users.forEach(user=>console.log(user))

const activeUsers = users.filter(u=>u.active);
console.log(activeUsers);