// https://leetcode-cn.com/problems/populating-next-right-pointers-in-each-node/description/
/**
  给定一个二叉树

  struct TreeLinkNode {
    TreeLinkNode *left;
    TreeLinkNode *right;
    TreeLinkNode *next;
  }
  填充它的每个 next 指针，让这个指针指向其下一个右侧节点。如果找不到下一个右侧节点，则将 next 指针设置为 NULL。

  初始状态下，所有 next 指针都被设置为 NULL。

  说明:

  你只能使用额外常数空间。
  使用递归解题也符合要求，本题中递归程序占用的栈空间不算做额外的空间复杂度。
  你可以假设它是一个完美二叉树（即所有叶子节点都在同一层，每个父节点都有两个子节点）。
  示例:

  给定完美二叉树，

       1
     /  \
    2    3
   / \  / \
  4  5  6  7
  调用你的函数后，该完美二叉树变为：

       1 -> NULL
     /  \
    2 -> 3 -> NULL
   / \  / \
  4->5->6->7 -> NULL
*/
const TreeNode = require("./binary-tree");
/**
 * Definition for binary tree with next pointer.
 * function TreeLinkNode(val) {
 *     this.val = val;
 *     this.left = this.right = this.next = null;
 * }
 */

/**
 * @param {TreeLinkNode} root
 * @return {void} Do not return anything, modify tree in-place instead.
 */
// 利用两个栈，做逐行遍历，每一个元素指向栈的最后一个
const connect = root => {
  let stack1 = [root];
  let stack2 = [];
  while (stack1.length) {
    const node = stack1.pop();
    if (!node) continue;
    const next = stack1[stack1.length - 1] || null;
    node.next = next;

    if (stack1.length === 0) {
      stack1 = stack2;
      stack2 = [];
    }
    stack1.push(node.right);
    stack1.push(node.left);
  }
};

const tree = TreeNode.create([1, 2, 3, 4, 5, 6, 7]);
connect(tree);
console.log(tree.next);
