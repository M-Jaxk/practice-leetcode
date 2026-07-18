class MergeInterval{
    //for of
    //if merged = [] || merged[merged-length-1][1] 3 < interval[0] 2
    //result.push[interval]
    //else, merged[merged-length-1][1] = Max(merged[merged-length-1][1],interval[1])
    execute(intervals){
        if(intervals.length === 0) return [];

        const merged = [];
        intervals.sort((a,b)=>a[0]-b[0]);
        for(const interval of intervals){
            if(merged.length === 0 || merged[merged.length-1][1] < interval[0]){
                merged.push(interval);
            }else{
                merged[merged.length-1][1] = Math.max(merged[merged.length-1][1],interval[1]);
            }
        }
        return merged;
    }
}

// console.log(new MergeInterval().execute([[1,3],[2,4],[5,7]]));//[[1,4],[5,7]]
console.log(new MergeInterval().execute([[4,7],[1,4]]));//[[1,7]]