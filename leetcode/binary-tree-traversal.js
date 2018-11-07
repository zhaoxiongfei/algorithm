const TreeNode = require("./binary-tree");

const traversal = (root, fn) => {
  if (root.left) traversal(root.left, fn);
  if (root.right) traversal(root.right, fn);
  fn(root.val);
};

const list = [];
traversal(TreeNode.create([1, 2, 3, 4, 5, 6, 7]), list.push.bind(list));

console.log(list);
