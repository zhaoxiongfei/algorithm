/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
const TreeNode = require("../binary-tree");

const nums = new Set(Array.from("0123456789"));
const split = (s, len) => {
  let length = 0;
  const indexes = [];
  for (let i = 0; i < s.length; i += 1) {
    if (!nums.has(s[i])) {
      length += 1;
    } else {
      if (length === len) indexes.push(i);
      length = 0;
    }
  }

  if (indexes.length === 0) return [s];
  if (indexes.length === 1)
    return [s.slice(0, indexes[0] - len), s.slice(indexes[0])];
  return [
    s.slice(0, indexes[0] - len),
    s.slice(indexes[0], indexes[1] - len),
    s.slice(indexes[1])
  ];
};

const dfs = (s, depth) => {
  const [val, l, r] = split(s, depth);
  console.log("s: %s, val: %s, l: %s, r: %s, depth: %d", s, val, l, r, depth);
  if (!val) return null;
  const root = new TreeNode(parseInt(val, 10));
  if (l) root.left = dfs(l, depth + 1);
  if (r) root.right = dfs(r, depth + 1);

  return root;
};

/**
 * @param {string} S
 * @return {TreeNode}
 */
const recoverFromPreorder = S => dfs(S, 1);

// console.log(split("1-2--3--4-5--6--7", 1));
// console.log(recoverFromPreorder("1-2--3--4-5--6--7"));
console.log(recoverFromPreorder("1-2--3---4-5--6---7"));
// console.log(recoverFromPreorder("1-401--349---90--88"));
