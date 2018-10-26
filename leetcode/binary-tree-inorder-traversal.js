// https://leetcode-cn.com/problems/binary-tree-inorder-traversal/description/

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
// 递归方式的遍历， 思路最简单
const inorderTraversal = root => {
  const list = [];
  if (!root) return list;
  const ls = inorderTraversal(root.left);
  for (let i = 0; i < ls.length; i += 1) list.push(ls[i]);

  list.push(root.val);

  const rs = inorderTraversal(root.right);
  for (let i = 0; i < rs.length; i += 1) list.push(rs[i]);

  return list;
};

// 迭代方式的遍历, 需要借助栈来实现, 本质上和递归区别不大
const inorderTraversal2 = root => {
  const list = [];
  if (!root) return list;

  const stack = [root];
  while (stack.length) {
    const curr = stack.pop();
    if (!curr.left && !curr.right) {
      list.push(curr.val);
      continue;
    }
    if (curr.right) stack.push(curr.right);
    stack.push({ val: curr.val });
    if (curr.left) stack.push(curr.left);
  }

  return list;
};

const root = { val: 1, right: { left: { val: 3 }, val: 2 } };
console.log(inorderTraversal2(root));
