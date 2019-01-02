/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
const TreeNode = require("../binary-tree");

const dfs = (root, dp) => {
  if (!root) return 0;
  const calced = dp.get(root);
  if (calced !== undefined) return calced;

  let count0 = 1; // 根节点有
  let count1 = 1; // 左子树有
  let count2 = 1; // 右子树有

  if (root.left) {
    count0 += Math.min(
      dfs(root.left, dp),
      dfs(root.left.left, dp) + dfs(root.left.right, dp)
    );
    if (root.left.left) {
      count1 += Math.min(
        dfs(root.left.left, dp),
        dfs(root.left.left.left, dp) + dfs(root.left.left.right, dp)
      );
    }
    if (root.left.right) {
      count1 += Math.min(
        dfs(root.left.right, dp),
        dfs(root.left.right.left, dp) + dfs(root.left.right.right, dp)
      );
    }
    count2 += dfs(root.left, dp);
  }

  if (root.right) {
    count0 += Math.min(
      dfs(root.right, dp),
      dfs(root.right.left, dp) + dfs(root.right.right, dp)
    );
    if (root.right.left) {
      count2 += Math.min(
        dfs(root.right.left, dp),
        dfs(root.right.left.left, dp) + dfs(root.right.left.right, dp)
      );
    }
    if (root.right.right) {
      count2 += Math.min(
        dfs(root.right.right, dp),
        dfs(root.right.right.left, dp) + dfs(root.right.right.right, dp)
      );
    }
    count1 += dfs(root.right, dp);
  }
  const count = Math.min(count0, count1, count2);
  dp.set(root, count);

  return count;
};

/**
 * @param {TreeNode} root
 * @return {number}
 */
const minCameraCover2 = root => {
  if (!root) return 0;

  return Math.max(1, dfs(root, new Map()));
};

const minCameraCover = root => {
  let res = 0;
  // 返回值0代表当前不放相机且没有被监控 返回值1代表当前没有放相机但是已经被监控 返回值2代表当前放了相机
  const _dfs = (node, isRoot) => {
    // 如果为null，则可用2表示
    if (node === null) return 1;

    const left = _dfs(node.left);
    const right = _dfs(node.right);

    if (left === 0 || right === 0) {
      // 如果子节点有未放置相机且未被监控，则当前节点一定需要放置相机
      res += 1;
      return 2;
    }
    if (left === 1 && right === 1) {
      // 子节点都已被监控但都未放置相机，则当前可不用放置相机，等待被监控，返回0
      if (isRoot === true) res += 1; // 如果是根节点，则必须放置一个相机
      return 0;
    }
    if (left === 2 || right === 2) {
      // 如果子节点已经放置了相机，且排除了子节点未被监控的情况，则当前节点可不放相机，但已被监控，返回1
      return 1;
    }
    return 0;
  };

  _dfs(root, true);
  return res;
};

console.log(
  minCameraCover2(TreeNode.create([0, 0, null, 0, null, 0, null, null, 0]))
);
console.log(
  // minCameraCover(TreeNode.create([0, 0, null, 0, null, 0, null, null, 0]))
  minCameraCover(TreeNode.create([0, 0, null, 0, null, 0, null, null, 0]))
  // minCameraCover(TreeNode.create([0, 0, 0, null, 0, 0, null, null, 0]))
  // minCameraCover(TreeNode.create([0, 0, null, null, 0, 0, null, null, 0, 0]))
  // minCameraCover(TreeNode.create([0, 0, null, 0, 0]))
);
