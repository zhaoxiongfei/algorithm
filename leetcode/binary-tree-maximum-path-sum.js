// https://leetcode-cn.com/problems/binary-tree-maximum-path-sum/description/

/**
  给定一个非空二叉树，返回其最大路径和。

  本题中，路径被定义为一条从树中任意节点出发，达到任意节点的序列。该路径至少包含一个节点，且不一定经过根节点。

  示例 1:

  输入: [1,2,3]

         1
        / \
       2   3

  输出: 6
  示例 2:

  输入: [-10,9,20,null,null,15,7]

     -10
     / \
    9  20
      /  \
     15   7

  输出: 42
 */

const TreeNode = require("./binary-tree");

const writeMaxVal = root => {
  if (!root) return 0;
  const left = writeMaxVal(root.left);
  const right = writeMaxVal(root.right);

  const val = root.val;
  root.max = Math.max(val, val + left, val + right);
  root.mx = Math.max(val, val + left, val + right, val + left + right);
  return root.max;
};
/**
 * @param {TreeNode} root
 * @return {number}
 */
// 思路: 遇到树的问题，优先采用递归的方式
// 递推逻辑: 一个二叉树的最大路径和Math.max(root, root + left, root + right, root + left + right);
const maxPathSum = root => {
  if (!root) return 0;
  let max = writeMaxVal(root);
  const stack = [root];
  while (stack.length) {
    const node = stack.pop();
    if (node.max > max) max = node.max;
    if (node.mx > max) max = node.mx;
    if (node.right) stack.push(node.right);
    if (node.left) stack.push(node.left);
  }

  return max;
};

const root = TreeNode.create([
  5,
  4,
  8,
  11,
  null,
  13,
  4,
  7,
  2,
  null,
  null,
  null,
  1
]);
console.log(maxPathSum(root));
console.log(root);
