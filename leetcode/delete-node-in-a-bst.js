// https://leetcode-cn.com/problems/delete-node-in-a-bst/
// No 450. 删除二叉搜索树中的节点

/**
  给定一个二叉搜索树的根节点 root 和一个值 key，
  删除二叉搜索树中的 key 对应的节点，并保证二叉搜索树的性质不变。
  返回二叉搜索树（有可能被更新）的根节点的引用。

  一般来说，删除节点可分为两个步骤：

  首先找到需要删除的节点；
  如果找到了，删除它。
  说明： 要求算法时间复杂度为 O(h)，h 为树的高度。

  示例:

  root = [5,3,6,2,4,null,7]
  key = 3

      5
     / \
    3   6
   / \   \
  2   4   7

  给定需要删除的节点值是 3，所以我们首先找到 3 这个节点，然后删除它。

  一个正确的答案是 [5,4,6,2,null,null,7], 如下图所示。

      5
     / \
    4   6
   /     \
  2       7

  另一个正确答案是 [5,2,6,null,4,null,7]。

      5
     / \
    2   6
     \   \
      4   7
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
 * @param {number} key
 * @return {TreeNode}
 */
const deleteNode = (root, key) => {
  if (!root) return root;
  const pre = { left: root };
  root.parent = pre;
  const stack = [root];
  while (stack.length) {
    const node = stack.pop();
    if (!node) break;
    if (node.val < key) {
      if (node.right) {
        node.right.parent = node;
        stack.push(node.right);
      }
      continue;
    }
    if (key < node.val) {
      if (node.left) {
        node.left.parent = node;
        stack.push(node.left);
      }
      continue;
    }
    if (!node.left && node.right) {
      // 没有左侧
      node.val = node.right.val;
      node.left = node.right.left;
      node.right = node.right.right;
      break;
    }
    if (!node.right && node.left) {
      // 没有右侧
      node.val = node.left.val;
      node.right = node.left.right;
      node.left = node.left.left;
      break;
    }
    // 有可能左右都不存在
    if (!node.left && !node.right) {
      if (node.parent.left === node) {
        node.parent.left = null;
      } else {
        node.parent.right = null;
      }
      break;
    }

    // 左右都存在
    let hot = node;
    let succ = hot.right;
    while (succ.left) {
      hot = succ;
      succ = succ.left;
    }

    node.val = succ.val;
    if (node.right === succ) {
      node.right = succ.right;
    } else {
      hot.left = succ.right;
    }
  }

  return pre.left;
};

console.log(deleteNode(TreeNode.create([5, 3, 6, 2, 4, null, 7]), 3));
console.log(deleteNode(TreeNode.create([5, 3, 6, 2, 4, null, 7]), 5));
console.log(deleteNode(TreeNode.create([5, 3, 6, 2, 4, 5.5, 7]), 5));
