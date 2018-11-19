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

TreeNode.toArray = root => {
  const list = [];
  let stack1 = [root];
  let stack2 = [];
  while (stack1.length) {
    const node = stack1.shift();
    if (node) {
      list.push(node.val);
      stack2.push(node.left);
      stack2.push(node.right);
    } else {
      list.push(null);
    }
    if (!stack1.length) {
      stack1 = stack2;
      stack2 = [];
    }
  }
  let { length } = list;
  while (list[(length -= 1)] === null && length >= 0) {}
  list.length = length + 1;

  return list;
};

TreeNode.create = TreeNode.make;

module.exports = TreeNode;
