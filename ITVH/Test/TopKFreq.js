class TopKFreq {
  //use map() to store key=>value
  //map.has(num), (map.get(num) || 0) +1

  execute(nums, k) {
    if(nums.length === 0) return [];

    const feq = new Map();
    for(const num of nums){
      feq.set(num,(feq.get(num) || 0) + 1);
    }
    return [...feq.entries()]
            .sort((a,b)=>b[1]-a[1])
            .slice(0,k)
            .map(num=>num[0])
    
  }
}

console.log(new TopKFreq().execute([3,1,1,1,2,2], 2)); //[1,2]
