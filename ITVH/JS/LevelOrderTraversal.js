class LevelOrderTraversal {
    // [3,9,20,null,null,15,7] → [[3],[9,20],[15,7]]
    execute(root) {
        if (!root) return [];

        const result = [];
        const queue = [root];

        while (queue.length) {
            const level = [];
            const len = queue.length;

            for (let i = 0; i < len; i++) {
                const node = queue.shift();
                level.push(node.val);
                if (node.left) queue.push(node.left);
                if (node.right) queue.push(node.right);
            }

            result.push(level);
        }

        return result;
    }
}

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
