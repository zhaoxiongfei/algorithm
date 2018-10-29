// https://leetcode-cn.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/description/

/**
 * Definition for a binary tree node.
 */
function TreeNode(val) {
  this.val = val;
  this.left = null;
  this.right = null;
}
/**
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */
// 分析: 前序遍历的第一个元素是整个树的 root, 中序遍历在 root 前的是左，后的是右
// 采用递归的方式不断的缩小范围
const buildTree = (preorder, inorder) => {
  if (preorder.length === 0) return null;
  const root = new TreeNode(preorder[0]);
  if (preorder.length === 1) return root;
  const inIndex = inorder.indexOf(root.val);
  if (inIndex === -1) {
    throw Error("preorder / inorder unexception");
  }
  const left = buildTree(
    preorder.slice(1, inIndex + 1),
    inorder.slice(0, inIndex)
  );
  if (left) root.left = left;

  const right = buildTree(
    preorder.slice(inIndex + 1),
    inorder.slice(inIndex + 1)
  );
  if (right) root.right = right;

  return root;
};

console.log(buildTree([3, 9, 20, 15, 7], [9, 3, 15, 20, 7]));
