// https://leetcode-cn.com/problems/construct-binary-tree-from-preorder-and-postorder-traversal/
// No 889. 根据前序和后序遍历构造二叉树

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
const TreeNode = require("./binary-tree");
/**
 * @param {number[]} pre
 * @param {number[]} post
 * @return {TreeNode}
 */
const constructFromPrePost = (pre, post) => {
  const { length } = pre;
  if (length === 0) return null;
  const root = new TreeNode(pre[0]);

  const index = post.indexOf(pre[1]);

  const lPost = post.slice(0, index + 1);
  const lPre = pre.slice(1, index + 2);
  root.left = constructFromPrePost(lPre, lPost);

  const rPost = post.slice(index + 1, length - 1);
  const rPre = pre.slice(index + 2, length);
  root.right = constructFromPrePost(rPre, rPost);

  return root;
};

console.log(constructFromPrePost([1, 2, 4, 5, 3, 6, 7], [4, 5, 2, 6, 7, 3, 1]));
