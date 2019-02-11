// https://leetcode-cn.com/problems/complete-binary-tree-inserter/
// No 919. 完全二叉树插入器
const TreeNode = require("./binary-tree");
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 */
function CBTInserter(root) {
  const init = (node, parent) => {
    const l = node.left ? init(node.left, node) : { height: 0, size: 0 };
    const r = node.right ? init(node.right, node) : { height: 0, size: 0 };
    node.height = Math.max(l.height, r.height) + 1;
    node.size = l.size + r.size + 1;
    node.parent = parent;

    return node;
  };

  init(root);

  const update = node => {
    if (!node) return;
    node.size = 1;
    if (node.left) node.size += node.left.size;
    if (node.right) node.size += node.right.size;
    node.height =
      Math.max(node.right && node.right.height, node.left && node.left.height) +
      1;
    /*
    console.log(
      "Update, val: %d, size: %d, height: %d",
      node.val,
      node.size,
      node.height
    );
    */
    update(node.parent);
  };

  const next = node => {
    if (!node.left) return [node, "left"];
    if (!node.right) return [node, "right"];
    if (node.size === 2 ** node.height - 1) return next(node.left);
    if (node.left.size === 2 ** node.left.height - 1) return next(node.right);
    return next(node.left);
  };

  /**
   * @param {number} v
   * @return {number}
   */
  const insert = v => {
    const [node, key] = next(root);
    const curr = new TreeNode(v);
    curr.parent = node;
    curr.size = 1;
    curr.height = 1;
    node[key] = curr;
    update(node);
    return node.val;
  };

  /**
   * @return {TreeNode}
   */
  const getRoot = () => root;

  return { insert, get_root: getRoot };
}

/**
 * Your CBTInserter object will be instantiated and called as such:
 * var obj = Object.create(CBTInserter).createNew(root)
 * var param_1 = obj.insert(v)
 * var param_2 = obj.get_root()
 */

const instance = new CBTInserter(TreeNode.create([1, 2, 3, 4, 5, 6]));
["insert", "insert", "get_root"].forEach((fn, i) =>
  console.log(instance[fn](...[[7], [8], []][i]))
);
