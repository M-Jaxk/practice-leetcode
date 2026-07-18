class GroupAnagram {
  //sort the key asc aet
  //use map to store key value
  //map.has(key)
  //map.set(key,[])
  //map.get(key).push(val)
  execute(strs) {
    if (strs.length === 0) return [];

    const map = new Map();
    for(const str of strs){
      let key = str.split('').sort().join('');

      if(!map.has(key)){
          map.set(key,[]);
      }
      map.get(key).push(str);
    }
    return [...map.values()]
  }
}

console.log(
  new GroupAnagram().execute(["eat", "tea", "tan", "ate", "nat", "bat"]));
