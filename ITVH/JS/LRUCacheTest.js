class LRUCache {
    // LRUCache(2)
    //{1=1,2=2,3=3}
    // put(1,1) put(2,2) get(1)→1 put(3,3) get(2)→-1 put(4,4) get(1)→-1 get(3)→3 get(4)→4
    constructor(capacity){
        this.capacity = capacity;
        this.cache = new Map();
    }

    get(key){
        if(!this.cache.has(key)) return -1;//[1->2]

        const value = this.cache.get(key); 
        this.cache.delete(key); //[2->1]
        //this.cache.set(key,value);
        return value;
    }

    put(key,value){
        if(this.cache.has(key)){
            this.cache.delete(key);
        }else if(this.cache.size >= this.capacity){
            const oldestKye= this.cache.keys().next().value;
            // console.log("Keys",this.cache.keys());
            // console.log("OldKey",oldestKye);
            this.cache.delete(oldestKye);
        }
        // console.log(this.cache.size);
        this.cache.set(key,value);
    }
    
}

const cache = new LRUCache(2);
cache.put(1, 1);
cache.put(2, 2);
console.log(cache.get(1)); // 1
cache.put(3, 3);
console.log(cache.get(2)); // -1
