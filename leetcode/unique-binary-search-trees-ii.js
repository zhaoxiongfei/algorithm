// https://leetcode-cn.com/problems/binary-tree-inorder-traversal/description/
//

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */

const nil = null;
const merge = (root, ls, rs, list) => {
  if (!ls.length && !rs.length) {
    list.push([root]);
    return;
  }
  if (!ls.length) {
    for (let i = 0; i < rs.length; i += 1) {
      list.push([root, nil].concat(rs[i]));
    }
  }
  if (!rs.length) {
    for (let i = 0; i < ls.length; i += 1) {
      const leftRoot = ls[i].shift();
      const line = [root, leftRoot];
      if (ls[i].length) {
        line.push(nil);
        list.push(line.concat(ls[i]));
      } else {
        list.push(line);
      }
    }
  }
  if (ls.length && rs.length) {
    for (let i = 0; i < ls.length; i += 1) {
      const left = ls[i];
      for (let j = 0; j < rs.length; j += 1) {
        const right = rs[j];
        list.push(
          [root, left[0], right[0]].concat(left.slice(1), right.slice(1))
        );
      }
    }
  }
};

const generate = nums => {
  const { length } = nums;

  const list = [];
  for (let i = 0; i < length; i += 1) {
    const root = nums[i]; // 根节点先压入
    const ls = generate(nums.slice(0, i));
    const rs = generate(nums.slice(i + 1));
    merge(root, ls, rs, list);
  }

  return list;
};

/**
 * @param {number} n
 * @return {TreeNode[]}
 */
// 思路: 采用类似于全排列的思路，逐个用某一数字做root，采用递归，降低规模
const generateTrees = n => {
  const nums = [];
  for (let i = 0; i < n; i += 1) nums[i] = i + 1;

  return generate(nums);
};

console.log(generateTrees(3));
