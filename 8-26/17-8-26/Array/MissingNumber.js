class MissingNumber {
  execute(nums = []){

    let set = new Set(nums)
    let num = 1;
    while(set.has(num)){
      num++;
    }
    return num;
  }
}

console.log(new MissingNumber().execute([3,0,1]));
console.log(new MissingNumber().execute([3, 4, -1, 1, 6, 8, 5, 7]));
console.log(new MissingNumber().execute([7,8,9,11,12]));
