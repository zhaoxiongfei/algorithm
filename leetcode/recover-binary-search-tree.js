// https://leetcode-cn.com/problems/recover-binary-search-tree/description/

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {void} Do not return anything, modify root in-place instead.
 */
// 思路 中序遍历后，搜索二叉树为顺序状态，
// 所以出错了，一定有逆序的情况出现
// 找到逆序对，而过是一对儿，调换位置，如果是两对儿，第一对儿的第一个的第二对儿的第二调换。
// 注意 两对儿中可能的共用中间一个值的情况
const recoverTree = root => {
  const list = [];
  const stack = [root];

  while (stack.length) {
    const node = stack.pop();
    if (!node.left && !node.right) list.push(node.val);
    if (node.right) stack.push(node.right);
    stack.push({ val: node.val });
    if (node.left) stack.push(node.left);
  }

  // 找到逆序对儿
  const reverseOrders = [];
  for (let i = 1; i < list.length; i += 1) {
    if (list[i - 1].val > list[i].val) {
      reverseOrders.push([list[i - 1], list[i]]);
    }
  }

  if (reverseOrders.length === 0) return;
  // 找到要替换的两个元素
  const first = reverseOrders[0][0];
  const second =
    reverseOrders.length === 2 ? reverseOrders[1][1] : reverseOrders[0][1];

  // 扫描并替换
  stack.push(root);
  while (stack.length) {
    const node = stack.pop();
    if (node.val === first) {
      node.val = second;
    } else if (node.val === second) {
      node.val = first;
    }
    if (node.right) stack.push(node.right);
    if (node.left) stack.push(node.left);
  }
};

console.log(recoverTree());
