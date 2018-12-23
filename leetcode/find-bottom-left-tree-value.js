// https://leetcode-cn.com/problems/find-bottom-left-tree-value/
// No 513. 找树左下角的值

/**
  给定一个二叉树，在树的最后一行找到最左边的值。

  示例 1:

  输入:

      2
     / \
    1   3

  输出:
  1


  示例 2:

  输入:

          1
         / \
        2   3
       /   / \
      4   5   6
         /
        7

  输出:
  7

  注意: 您可以假设树（即给定的根节点）不为 NULL。
 */
const TreeNode = require("./binary-tree");
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
const findBottomLeftValue = root => {
  let left;
  const list = [];
  let stack1 = [root];
  let stack2 = [];
  while (stack1.length) {
    const node = stack1.shift();
    if (node) {
      list.push(node.val);
      stack2.push(node.left);
      stack2.push(node.right);
    }
    if (!stack1.length) {
      stack1 = stack2;
      stack2 = [];
      if (list.length) {
        left = list[0];
        list.length = 0;
      }
    }
  }

  return left;
};

console.log(findBottomLeftValue(TreeNode.create([1, 2, 7])));
