const TreeNode = require("./binary-tree");

const calcTree = root => {
  if (!root) return 0;
  const left = calcTree(root.left);
  const right = calcTree(root.right);
  if (root.val === "+") return (left | 0) + (right | 0);
  if (root.val === "-") return (left | 0) - (right | 0);
  if (root.val === "*") return (left | 0 || 1) * (right | 0 || 1);
  if (root.val === "/") return (left | 0 || 1) / (right | 0 || 1);
  return root.val;
};

console.log(calcTree(TreeNode.create(["*", "+", "+", 3, 2, 4, 5])));
