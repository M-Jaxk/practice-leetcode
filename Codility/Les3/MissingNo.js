class MissingNo{
    //1+2+3+...+n (n*(n+1)/2)
    execute(nums=[]){
        const N = nums.length +1;
        const exceptedSum = (N*(N+1))/2;
        const acutalSum = nums.reduce((sum,num) => sum + num, 0)

        return exceptedSum - acutalSum;

    }
}

console.log(new MissingNo().execute([2,3,1,5]));
// console.log(new MissingNo().execute());