class GroupAnagram{
    execute(str=""){
        
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

console.log(new GroupAnagram().execute(["eat","tea","tan","ate","nat","bat"]));
console.log(new GroupAnagram().execute([""]));