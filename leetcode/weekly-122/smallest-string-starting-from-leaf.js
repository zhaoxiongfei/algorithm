/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
const TreeNode = require("../binary-tree");

const dict = Array(26).fill("");
for (let i = 0; i < 26; i += 1) dict[i] = String.fromCharCode(97 + i);

const dfs = (root, ans) => {
  if (!root.left && !root.right) {
    ans = dict[root.val] + ans;
    return ans;
  }
  if (root.left && root.right) {
    const left = dfs(root.left, ans);
    const right = dfs(root.right, ans);
    ans = left < right ? left : right;
  } else if (root.left) {
    ans = dfs(root.left, ans);
  } else {
    ans = dfs(root.right, ans);
  }

  return ans + dict[root.val];
};
/**
 * @param {TreeNode} root
 * @return {string}
 */
const smallestFromLeaf = root => dfs(root, "");

console.log(smallestFromLeaf(TreeNode.create([0, 1, 2, 3, 4, 3, 4])));
console.log(smallestFromLeaf(TreeNode.create([25, 1, 3, 1, 3, 0, 2])));
console.log(smallestFromLeaf(TreeNode.create([2, 2, 1, null, 1, 0, null, 0])));
