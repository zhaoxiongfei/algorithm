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

const updateWidth = (root, depth) => {
  root.depth = depth;
  root.width = 1;
  if (root.left) {
    updateWidth(root.left, depth + 1);
    root.width = 1 + 2 * root.left.width;
  }
  if (root.right) {
    updateWidth(root.right, depth + 1);
    root.width = Math.max(root.width, 1 + 2 * root.right.width);
  }
};

const updateOffset = (root, offset, width) => {
  const half = (width - 1) >> 1;
  root.offset = offset + half;
  if (root.left) updateOffset(root.left, offset, half);
  if (root.right) updateOffset(root.right, offset + half + 1, half);
};

const format = (str, width, l = " ", r = " ") => {
  const { length } = str;
  const remain = width - length;
  if (remain === 0) return str;
  const md = remain >> 1;
  return `${l.repeat(md)}${str}${r.repeat(remain - md)}`;
};

const dfs = (root, list, n, line, w) => {
  if (!list[root.depth]) {
    list[root.depth] = Array(n).fill(" ".repeat(w));
  }
  if (!line[root.depth]) {
    line[root.depth] = Array(n).fill(" ".repeat(w));
  }
  list[root.depth][root.offset] = format(root.val.toString(), w);
  if (root.left) {
    line[root.depth][root.left.offset] = `/${"-".repeat(w - 1)}`;
    for (let i = root.left.offset + 1; i < root.offset; i += 1) {
      line[root.depth][i] = "-".repeat(w);
    }
    dfs(root.left, list, n, line, w);
  }
  if (root.right) {
    line[root.depth][root.right.offset] = `${"-".repeat(w - 1)}\\`;
    for (let i = root.offset + 1; i < root.right.offset; i += 1) {
      line[root.depth][i] = "-".repeat(w);
    }
    dfs(root.right, list, n, line, w);
  }
  if (root.left && root.right) {
    line[root.depth][root.offset] = format("┴", w, "-", "-");
  } else if (root.left) {
    line[root.depth][root.offset] = format("╯", w, "-", " ");
  } else if (root.right) {
    line[root.depth][root.offset] = format("╰", w, " ", "-");
  }
};

const getMaxCharWidth = (root, w) => {
  w[0] = Math.max(root.val.toString().length, w[0]);
  if (root.left) getMaxCharWidth(root.left, w);
  if (root.right) getMaxCharWidth(root.right, w);
};

/**
 * @param {TreeNode} root
 * @return {string[][]}
 */
TreeNode.print = root => {
  updateWidth(root, 0);
  updateOffset(root, 0, root.width);
  const w = [0];
  getMaxCharWidth(root, w);
  const list = [];
  const line = [];
  dfs(root, list, root.width, line, w[0]);
  for (let i = 0; i < list.length; i += 1) {
    console.log(list[i].join(""));
    if (line[i]) console.log(line[i].join(""));
  }
};

TreeNode.create = TreeNode.make;

module.exports = TreeNode;
