class LowestCommonAncestor {
    // root = [3,5,1,6,2,0,8,null,null,7,4], p=5, q=1 → 3
    execute(root, p, q) {
        if(!root || root === p || root=== q) return root;

        let left = this.execute(root.left,p,q);
        let right = this.execute(root.right,p,q);

        if(left && right) return root;

        return left || right;
    }
}

const tree={
    val:3,
        left:{
            val:5,
            left:{val:5,left:null,right:null},
            right:{val:6,left:null,right:null}
    },
        right:{
            val:5,
            left:{val:5,left:null,right:null},
            right:{val:6,left:null,right:null}
    }
}
const p = tree.left.left;//5
const q = tree.right.right;
console.log(p,q);
console.log(new LowestCommonAncestor().execute(tree, p, q).val);
