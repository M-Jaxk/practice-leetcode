class Node {
    constructor(val, neighbors) {
        this.val = val ;
        this.neighbors = [];
    }
}

class CloneGraph {
    // Adjacency list: [[2,4],[1,3],[2,4],[1,3]]
    execute(node) {
        if (!node) return null;

        const map = new Map();

        const dfs = (n) => {
            if (map.has(n)) return map.get(n);

            const copy = new Node(n.val);
            map.set(n, copy);

            for (const neighbor of n.neighbors) {
                copy.neighbors.push(dfs(neighbor));
            }

            return copy;
        };

        return dfs(node);
    }
}

// Build graph: 1--2, 1--4, 2--3, 3--4
const n1 = new Node(1);
const n2 = new Node(2);
const n3 = new Node(3);
const n4 = new Node(4);
n1.neighbors = [n2, n4];
n2.neighbors = [n1, n3];
n3.neighbors = [n2, n4];
n4.neighbors = [n1, n3];

const cloned = new CloneGraph().execute(n1);
// console.log(cloned.val);           // 1
// console.log(cloned.neighbors[0].val); // 2
console.log(cloned == n1);        // true
