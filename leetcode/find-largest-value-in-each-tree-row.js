// https://leetcode-cn.com/problems/find-largest-value-in-each-tree-row/
// No 515. 在每个树行中找最大值

/**
  您需要在二叉树的每一行中找到最大的值。

  示例：

  输入:

            1
           / \
          3   2
         / \   \
        5   3   9

  输出: [1, 3, 9]
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
 * @return {number[]}
 */
// 思路: 二叉树的层次遍历，取最大值
const largestValues = root => {
  const ans = [];
  let stack1 = [root];
  let stack2 = [];
  const list = [];
  while (stack1.length) {
    const node = stack1.shift();
    if (node) {
      list.push(node.val);
      stack2.push(node.left);
      stack2.push(node.right);
    }
    if (!stack1.length) {
      if (list.length) ans.push(Math.max(...list));
      list.length = 0;
      stack1 = stack2;
      stack2 = [];
    }
  }

  return ans;
};

console.log(largestValues(TreeNode.create([1, 3, 2, 5, 3, null, 9])));
