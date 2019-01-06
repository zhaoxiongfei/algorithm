/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
const TreeNode = require("../binary-tree");
/**
 * @param {TreeNode} root
 * @param {number[]} voyage
 * @return {number[]}
 */
const flipMatchVoyage = (root, voyage) => {
  const ans = [];
  let i = 0;
  const preOrder = node => {
    if (node.val !== voyage[i]) return false;
    i += 1;
    if (node.left && node.right) {
      if (node.left.val !== voyage[i]) {
        ans.push(node.val);
        if (!preOrder(node.right)) return false;
        if (!preOrder(node.left)) return false;
      } else {
        if (!preOrder(node.left)) return false;
        if (!preOrder(node.right)) return false;
      }
    } else if (node.left || node.right) {
      if (!preOrder(node.left || node.right)) return false;
    }
    return true;
  };

  if (!preOrder(root)) return [-1];

  return ans;
};

console.log(flipMatchVoyage(TreeNode.create([1, 2, 3]), [1, 2, 3]));
console.log(flipMatchVoyage(TreeNode.create([1, 2]), [2, 1]));
console.log(flipMatchVoyage(TreeNode.create([1, 2, 3]), [1, 3, 2]));
