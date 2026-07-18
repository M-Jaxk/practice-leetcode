class Node {
  //create node class
  constructor(val = null) {
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
node4.next = node2;

//1->2->3->4->null
// console.log(node1);

class DetectCycle {
  //while loop still exist head
  //if slow.next && fast.next.next
  execute(head) {
    if (!head) return false;

    let slow = head;
    let fast = head;
    while (fast.next && fast.next.next) {
      slow = slow.next;
      fast = fast.next.next;
      if (slow === fast) {
        return true;
      }
    }
    return false;
  }
}

console.log(new DetectCycle().execute(node1)); ////4->3->2->1->null
