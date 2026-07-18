class ListNode {
    constructor(val, next = null) {
        this.val = val;
        this.next = next;
    }
}

class MergeKSortedLists {
    // lists = [[1,4,5],[1,3,4],[2,6]] → [1,1,2,3,4,4,5,6]
    execute(lists) {
        if (lists.length === 0) return null;

        const result = [];

        for(const list of lists){
            let cur = list;
            while(cur){
                result.push(cur.val);
                cur = cur.next;
            }
        }

        result.sort((a,b)=>a-b);
        // console.log(result);
        const dummy = new ListNode(0);//{val:0,next:null}
        // console.log(dummy);
        let tail = dummy;

        for(const value of result){
            tail.next = new ListNode(value);//{0->1->1}
            tail = tail.next;
        }
        return dummy.next;
    }
}

const l1 = new ListNode(1, new ListNode(4, new ListNode(5)));
const l2 = new ListNode(1, new ListNode(3, new ListNode(4)));
const l3 = new ListNode(2, new ListNode(6));

let result = new MergeKSortedLists().execute([l1, l2, l3]);
const out = [];
while (result) {
    out.push(result.val);
    result = result.next;
}
console.log(out); // [1,1,2,3,4,4,5,6]
