function hasCycle(head) {
    if (!head || typeof head !== "object") {
        return false;
    }

    let slow = head;
    let fast = head;

    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;

        if (slow === fast) {
            return true;
        }
    }

    return false;
}

// Test
class Node{
    constructor(value){
        this.value = value;
        this.next = null;
    }
}
node1 = new Node(1);
node2 = new Node(2);
node3 = new Node(3);
node4 = new Node(4);

node1.next = node2;
node2.next = node3;
node3.next = node4;
node4.next = null;

console.log(hasCycle(node1)); // false

node4.next = node2;

console.log(hasCycle(node1)); // true