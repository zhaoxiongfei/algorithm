// https://leetcode-cn.com/problems/most-frequent-subtree-sum/
// No 508. 出现次数最多的子树元素和

/**
  给出二叉树的根，找出出现次数最多的子树元素和。
  一个结点的子树元素和定义为以该结点为根的二叉树上所有结点的元素之和（包括结点本身）。
  然后求出出现次数最多的子树元素和。如果有多个元素出现的次数相同，返回所有出现次数最多的元素（不限顺序）。

  示例 1
  输入:

    5
   /  \
  2   -3
  返回 [2, -3, 4]，所有的值均只出现一次，以任意顺序返回所有值。

  示例 2
  输入:

    5
   /  \
  2   -5
  返回 [2]，只有 2 出现两次，-5 只出现 1 次。

  提示： 假设任意子树元素和均可以用 32 位有符号整数表示。
 */
const TreeNode = require("./binary-tree");
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
const dfs = (root, list) => {
  if (!root) return 0;
  const sum = root.val + dfs(root.left, list) + dfs(root.right, list);
  list.push(sum);
  return sum;
};
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
const findFrequentTreeSum = root => {
  const list = [];
  dfs(root, list);

  const ans = [];
  let max = 0;
  const map = new Map();
  for (const n of list) {
    const curr = (map.get(n) | 0) + 1;
    map.set(n, curr);
    if (max < curr) {
      max = curr;
      ans.length = 0;
      ans[0] = n;
    } else if (max === curr) {
      ans.push(n);
    }
  }

  return ans;
};

console.log(
  findFrequentTreeSum(
    TreeNode.create([3, 1, 5, 0, 2, 4, 6, null, null, null, 3])
  )
);
console.log(findFrequentTreeSum(TreeNode.create([5, 2, -5])));
console.log(findFrequentTreeSum(TreeNode.create([5, 2, -3])));
