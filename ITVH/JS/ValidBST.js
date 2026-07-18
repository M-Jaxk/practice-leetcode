class ValidBST {
    // [2,1,3] → true, [5,1,4,null,null,3,6] → false
    execute(root) {
        const validate = (node, min, max) => {
            if (!node) return true;

            if ((min !== null && node.val <= min) ||
                (max !== null && node.val >= max)) {
                return false;
            }

            return validate(node.left, min, node.val) &&
                   validate(node.right, node.val, max);
        };

        return validate(root, null, null);
    }
}

// Example tree: [2,1,3]
const tree = { val: 2, left: { val: 3, left: null, right: null }, right: { val: 3, left: null, right: null } };
console.log(new ValidBST().execute(tree));
