/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
const TreeNode = require("../binary-tree");

const parse = (root, list, offset = 0) => {
  if (!root) return;
  const leftOffset = root.left ? root.left.size : 0;
  list[leftOffset + offset] = root.val;
  parse(root.left, list, offset);
  parse(root.right, list, leftOffset + offset + 1);
};

const update = root => {
  if (!root) return 0;
  root.size = 1 + update(root.left) + update(root.right);
  return root.size;
};

const create = list => {
  const { length } = list;
  if (length === 0) return null;
  const max = Math.max(...list);
  const index = list.indexOf(max);
  const node = new TreeNode(max);
  if (0 < index) node.left = create(list.slice(0, index));
  if (index < length - 1) node.right = create(list.slice(index + 1));

  return node;
};
/**
 * @param {TreeNode} root
 * @param {number} val
 * @return {TreeNode}
 */
const insertIntoMaxTree = (root, val) => {
  update(root);
  const A = Array(root.size).fill(0);
  parse(root, A);
  A.push(val);
  return create(A);
};

console.log(insertIntoMaxTree(TreeNode.create([4, 1, 3, null, null, 2]), 5));
console.log(insertIntoMaxTree(TreeNode.create([5, 2, 4, null, 1]), 3));
console.log(insertIntoMaxTree(TreeNode.create([5, 2, 3, null, 1]), 4));
