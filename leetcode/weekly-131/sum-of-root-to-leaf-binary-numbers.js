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
 * @return {number}
 */
const sumRootToLeaf = root => {
  const basic = 10 ** 9 + 7;
  let sum = 0;
  const list = [];

  const dfs = (node, path) => {
    path += node.val.toString();
    if (node.left) dfs(node.left, path);
    if (node.right) dfs(node.right, path);
    if (!node.left && !node.right) list.push(path);
  };

  dfs(root, "");

  for (const bin of list) {
    const { length } = bin;
    let mod = 0;
    for (let i = 0; i < length; i += 1) {
      mod *= 2;
      if (bin[i] === "1") {
        mod += 1;
      }
      mod %= basic;
    }
    sum += mod;
    sum %= basic;
  }
  // console.log(list);
  return sum;
};

console.log(sumRootToLeaf(TreeNode.create([1, 0, 1, 0, 1, 0, 1])));
