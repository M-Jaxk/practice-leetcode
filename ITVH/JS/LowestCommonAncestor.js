class LowestCommonAncestor {
    // root = [3,5,1,6,2,0,8,null,null,7,4], p=5, q=1 → 3
    execute(root, p, q) {
        if (!root || root === p || root === q) return root;

        const left = this.execute(root.left, p, q);
        const right = this.execute(root.right, p, q);

        if (left && right) return root;

        return left || right;
    }
}

const tree = {
    val: 3,
    left: {
        val: 5,
        left: { val: 6, left: null, right: null },
        right: {
            val: 2,
            left: { val: 7, left: null, right: null },
            right: { val: 4, left: null, right: null }
        }
    },
    right: {
        val: 1,
        left: { val: 0, left: null, right: null },
        right: { val: 8, left: null, right: null }
    }
};
const p = tree.left;
const q = tree.right;
console.log(new LowestCommonAncestor().execute(tree, p, q).val);
