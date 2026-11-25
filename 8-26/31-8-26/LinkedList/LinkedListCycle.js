class LinkedListCycle {
    //[1->2->3->4->5]
    //head.next === head.next.next
    execute(head){
        if(!head) return "";

        let slow = head;
        let fast = head;

        
    while(fast && fast.next){
        slow = slow.next;
        fast = fast.next.next;

        if(slow === fast){
            return true;
        }
    }
    return false;
  }
}

class Node{
    constructor(value){
        this.head = value;
        this.next = null;
    }
}

const node1 = new Node(1);
const node2 = new Node(2);
const node3 = new Node(3);
const node4 = new Node(4);
const node5 = new Node(5);
node1.next=node2;
node2.next=node3;
node3.next=node4;
node4.next=node5;
node5.next = null;

console.log(new LinkedListCycle().execute(node1));
