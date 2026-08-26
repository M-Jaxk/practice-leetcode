class GroupAnagram {
  execute(str) {

    let map = new Map();
    for(let s of str){
      const key = s.split('').sort().join('');

      if(!map.has(key)){
        map.set(key,[]);
      }

      map.get(key).push(s);
    }
    return map;
  }
}

const anagram = new GroupAnagram();

console.log(anagram.execute(["eat", "tea", "tan", "ate", "nat", "bat"]));
