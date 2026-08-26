//Searches a string using Regular Expression.

const email = "test@gmail.com";

const result = email.match(
    /\w+@\w+\.\w+/
);

console.log(result[0]);