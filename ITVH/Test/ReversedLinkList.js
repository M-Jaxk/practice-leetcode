class Node{
    //create node class
   constructor(val=null){
    this.val = val;
    this.next = null;
   }
}

const node1 = new Node(1);
const node2 = new Node(2);
const node3 = new Node(3);
const node4 = new Node(4);

node1.next = node2;
node2.next = node3;
node3.next = node4;
node4.next = null;

//1->2->3->4->null

class ReversedLinkList{
    //while loop still exist head
    //swap current.next and previous value
    execute(head){
        let current = head;
        let prev = null;

        while(current){
            const next =current.next;
            current.next = prev;
            prev = current;
            current = next;
        }
        return prev;
    }
}

console.log(new ReversedLinkList().execute(node1));////4->3->2->1->null
