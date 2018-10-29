/**
 * Definition for a binary tree node.
 */
function TreeNode(val) {
  this.val = val;
  this.left = null;
  this.right = null;
}

// 根据前序遍历序列，返回二叉树
TreeNode.make = list => {
  const { length } = list;
  if (length === 0) return null;
  const root = new TreeNode(list[0]);
  const stack = [root];
  for (let i = 1; i < length; i += 2) {
    const node = stack.shift();
    if (list[i] !== null) {
      node.left = new TreeNode(list[i]);
      stack.push(node.left);
    }
    if (list[i + 1] !== null && i + 1 < length) {
      node.right = new TreeNode(list[i + 1]);
      stack.push(node.right);
    }
  }

  return root;
};

module.exports = TreeNode;
