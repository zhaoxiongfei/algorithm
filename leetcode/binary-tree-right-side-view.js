// https://leetcode-cn.com/problems/binary-tree-right-side-view/description/
// No 199. 二叉树的右视图

/**
  给定一棵二叉树，想象自己站在它的右侧，按照从顶部到底部的顺序，返回从右侧所能看到的节点值。

  示例:

  输入: [1,2,3,null,5,null,4]
  输出: [1, 3, 4]
  解释:

     1            <---
   /   \
  2     3         <---
   \     \
    5     4       <---
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
// 思路: 逐层从左到右扫描，保留每层最后的元素, 或者从右往左扫描，保留第一个元素
const rightSideView = root => {
  if (!root) return [];
  let stack = [root];
  const stack2 = [];
  const list = [];
  while (stack.length) {
    const node = stack.pop();
    if (node.left) stack2.unshift(node.left);
    if (node.right) stack2.unshift(node.right);
    if (stack.length === 0) {
      console.log(stack2);
      stack = stack2.slice();
      stack2.length = 0;
      list.push(node.val);
    }
  }

  return list;
};

console.log(rightSideView(TreeNode.create([1, 2, 3, null, 5, null, 4])));
