//Returns true if at least one matches.

const products = [
    {
        id: 1,
        name: "A",
        price: 50
    },
     {
        id: 2,
        name: "B",
        price: 100
    },
     {
        id: 3,
        name: "C",
        price: 50
    },
     {
        id: 3,
        name: "D",
        price: 44
    },
]


console.log(products.sort((a,b)=>a.price - b.price));