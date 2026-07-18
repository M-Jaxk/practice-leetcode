class GroupAnagrams {
    // ["eat","tea","tan","ate","nat","bat"] → [["eat","tea","ate"],["tan","nat"],["bat"]]
    execute(strs) {
        const map = new Map();

        for (const str of strs) {
            const key = str.split('').sort().join('');
            // console.log(key);
            if (!map.has(key)) {
                map.set(key, []);//['aet'=>[]]
            }
            map.get(key).push(str);////['aet'=>['eat','tea']]
        }

        // console.log(map);
        return [...map.values()];
    }
}
console.log(new GroupAnagrams().execute(["eat", "tea", "tan", "ate", "nat", "bat"]));
