/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
// 根据前序遍历序列，返回二叉树
const make = list => {
  const { length } = list;
  if (length === 0) return null;
  const root = { val: list[0] };
  const stack = [root];
  for (let i = 1; i < length; i += 2) {
    const node = stack.shift();
    node.left = { val: list[i] };
    stack.push(node.left);
    if (i + 1 < length) {
      node.right = { val: list[i + 1] };
      stack.push(node.right);
    }
  }

  return root;
};

module.exports = { make };
