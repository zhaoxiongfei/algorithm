/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
const TreeNode = require("../binary-tree");

const dfs = (root, map) => {
  const list = map.get(root.x) || [];
  if (list.length === 0) map.set(root.x, list);
  if (list[root.y] === undefined) {
    list[root.y] = root.val;
  } else if (Array.isArray(list[root.y])) {
    list[root.y].push(root.val);
  } else {
    list[root.y] = [list[root.y], root.val];
  }

  if (root.left) {
    root.left.x = root.x - 1;
    root.left.y = root.y + 1;
    dfs(root.left, map);
  }

  if (root.right) {
    root.right.x = root.x + 1;
    root.right.y = root.y + 1;
    dfs(root.right, map);
  }
};

/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
const verticalTraversal = root => {
  if (root == null) return [[]];
  root.x = 0;
  root.y = 0;
  const map = new Map();
  dfs(root, map);

  const ans = [];
  for (let i = -1000; i < 1000; i += 1) {
    const list = map.get(i);
    if (!list) continue;
    const vs = [];
    for (const v of list) {
      if (v !== undefined) {
        if (Array.isArray(v)) {
          v.sort((a, b) => a - b);
          for (const x of v) vs.push(x);
        } else {
          vs.push(v);
        }
      }
    }
    ans.push(vs);
  }

  return ans;
};

console.log(verticalTraversal(TreeNode.create([3, 9, 20, null, null, 15, 7])));
console.log(verticalTraversal(TreeNode.create([1, 2, 3, 4, 5, 6, 7])));
console.log(verticalTraversal(TreeNode.create([])));
console.log(verticalTraversal(TreeNode.create([0, null, 1, 2])));
