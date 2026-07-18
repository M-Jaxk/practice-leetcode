class FrogJump{
    execute(x,y,d){
        return Math.ceil((y-x)/d);
    }
}

console.log(new FrogJump().execute(10,85,30));
console.log(new FrogJump().execute(10,70,30));