const TreeNode = require("./binary-tree");

const traversal = (root, fn) => {
  if (root.left) traversal(root.left, fn);
  if (root.right) traversal(root.right, fn);
  fn(root.val);
};

const visitLongestLeftSubTree = (vertex, fn, stack) => {
  let node = vertex;
  while (node) {
    fn(node.val);
    if (node.right) stack.push(node.right);
    node = node.left;
  }
};

const traversal2 = root => {
  const stack = [root];
  const list = [];
  const fn = list.push.bind(list);
  while (stack.length) {
    const vertex = stack.pop();
    visitLongestLeftSubTree(vertex, fn, stack);
  }

  return list;
};

const list = [];
traversal(TreeNode.create([1, 2, 3, 4, 5, 6, 7]), list.push.bind(list));
console.log(list);

console.log(traversal2(TreeNode.create([1, 2, 3, 4, 5, 6, 7])));
