class ReverseList {
    // [1,2,3,4,5] → [5,4,3,2,1]
    execute(head) {
        let prev = null;
        let current = head;//1,2

        while (current) {
            const next = current.next;//2
            current.next = prev;//[2->1->null]
            prev = current;//1
            current = next;//2
        }

        return prev;
    }
}

class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

const node1 = new Node(1);
node2= new Node(2);
node3 = new Node(3);
node4 = new Node(4);

node1.next = node2;
node2.next = node3;
node3.next = node4;
node4.next = null;

console.log(new ReverseList().execute(node1));