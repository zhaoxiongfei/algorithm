// https://leetcode-cn.com/problems/validate-binary-search-tree/description/

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
// 思路: 对于树的问题，最简单的思路就是递归，难一些的是利用栈来实现扫描或者特定顺序的访问
const isValidBST = (root, min = -Infinity, max = Infinity) => {
  if (!root) return true;

  const { val, left, right } = root;

  if (val <= min) return false;
  if (val >= max) return false;

  // 短路玩法，遇到一个失败的，立刻返回错误，终止执行, 全部通过了末尾才会 return true
  if (left && val <= left.val) return false;
  if (right && val >= right.val) return false;

  return (
    isValidBST(left, min, Math.min(max, val)) &&
    isValidBST(right, Math.max(val, min), max)
  );
};
