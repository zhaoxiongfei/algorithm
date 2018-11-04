// https://leetcode-cn.com/problems/binary-search-tree-iterator/description/
// No 173. 二叉搜索树迭代器

/**
  题目描述提示帮助提交记录社区讨论阅读解答
  实现一个二叉搜索树迭代器。你将使用二叉搜索树的根节点初始化迭代器。

  调用 next() 将返回二叉搜索树中的下一个最小的数。

  注意: next() 和hasNext() 操作的时间复杂度是O(1)，并使用 O(h) 内存，其中 h 是树的高度。
 */
const TreeNode = require("./binary-tree");
/**
 * Definition for binary tree
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */

/**
 * @constructor
 * @param {TreeNode} root - root of the binary search tree
 */
function BSTIterator(root) {
  const list = [];

  let index = -1;
  const stack = [root];
  while (stack.length) {
    const node = stack.pop();
    if (!node) break;
    if (!node.left && !node.right) {
      list.push(node.val);
      continue;
    }
    if (node.right) stack.push(node.right);
    stack.push({ val: node.val });
    if (node.left) stack.push(node.left);
  }

  const next = () => {
    index += 1;
    if (index >= list.length) return null;
    return list[index];
  };

  const hasNext = () => index + 1 < list.length;

  return { hasNext, next };
}

const o = new BSTIterator(TreeNode.create([5, 1, 2, 6, 7]));
console.log(o.next());
console.log(o.hasNext());
console.log(o.next());
console.log(o.hasNext());
