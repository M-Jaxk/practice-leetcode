function sum(a,b){
    return a + b;
}

// const sum = (a,b)=>{
//     return a + b;
// }

// const sum =(a,b)=> a + b

const numbers = [1,2,3,4]

const double = numbers.map(num => num*2)

const filteried = numbers.filter(num=> num + 1 === 3);

console.log(double, filteried)

const fruits = ["Banana", "Orange", "Apple", "Mango"];
console.log(fruits.includes("Mango",2));