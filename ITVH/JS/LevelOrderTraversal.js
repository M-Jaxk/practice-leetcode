class LevelOrderTraversal {
    execute(root) {
        if (!root) return [];

        const result = [];
        const queue = [root];
        let head = 0;

        while (head < queue.length) {
            const level = [];
            const len = queue.length - head;

            for (let i = 0; i < len; i++) {
                const node = queue[head++];

                level.push(node.val);

                if (node.left) {
                    queue.push(node.left);
                }

                if (node.right) {
                    queue.push(node.right);
                }
            }

            result.push(level);
        }

        return result;
    }
}
//time - O(N)
//space - O(N)

const tree = {
    val: 3,
    left: { val: 9, left: null, right: null },
    right: {
        val: 20,
        left: { val: 15, left: null, right: null },
        right: { val: 7, left: null, right: null }
    }
};
console.log(new LevelOrderTraversal().execute(tree));
