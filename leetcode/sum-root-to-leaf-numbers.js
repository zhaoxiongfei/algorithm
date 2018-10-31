// https://leetcode-cn.com/problems/sum-root-to-leaf-numbers/description/
// No. 129

/**
  给定一个二叉树，它的每个结点都存放一个 0-9 的数字，每条从根到叶子节点的路径都代表一个数字。

  例如，从根到叶子节点路径 1->2->3 代表数字 123。

  计算从根到叶子节点生成的所有数字之和。

  说明: 叶子节点是指没有子节点的节点。

  示例 1:

  输入: [1,2,3]
      1
     / \
    2   3
  输出: 25
  解释:
  从根到叶子节点路径 1->2 代表数字 12.
  从根到叶子节点路径 1->3 代表数字 13.
  因此，数字总和 = 12 + 13 = 25.
  示例 2:

  输入: [4,9,0,5,1]
      4
     / \
    9   0
   / \
  5   1
  输出: 1026
  解释:
  从根到叶子节点路径 4->9->5 代表数字 495.
  从根到叶子节点路径 4->9->1 代表数字 491.
  从根到叶子节点路径 4->0 代表数字 40.
  因此，数字总和 = 495 + 491 + 40 = 1026.
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
// 思路: 一遍扫描一边在节点上记录前序值, 当判断为叶子的时候累积结果total上
const sumNumbers1 = root => {
  if (!root) return 0;
  let total = 0;
  root.pre = root.val;
  const stack = [root];
  while (stack.length) {
    const node = stack.pop();
    if (!node.left && !node.right) {
      total += node.pre | 0;
      continue;
    }
    for (const key of ["left", "right"]) {
      if (!node[key]) continue;
      node[key].pre = `${node.pre}${node[key].val}`;
      stack.push(node[key]);
    }
  }
  return total;
};

// 思路二: 直接递归计算每一个点
const sumNumbers = (root, cur = 0) => {
  if (!root) return 0;
  const next = cur * 10 + root.val;
  if (!root.left && !root.right) {
    return next;
  }
  return sumNumbers(root.left, next) + sumNumbers(root.right, next);
};

const tree = TreeNode.create([4, 9, 0, 5, 1]);
console.log(sumNumbers1(TreeNode.create([1, 2, 3])));
console.log(sumNumbers(TreeNode.create([1, 2, 3])));
console.log(sumNumbers1(tree));
console.log(sumNumbers(tree));
