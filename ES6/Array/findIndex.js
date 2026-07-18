//Returns first matching object.

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

const findUserIndex = users.findIndex(u=>u.id === 3);
console.log(findUserIndex);