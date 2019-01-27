// https://leetcode-cn.com/problems/advantage-shuffle/submissions/
// No 870. 优势洗牌

/**
  给定两个大小相等的数组 A 和 B，
  A 相对于 B 的优势可以用满足 A[i] > B[i] 的索引 i 的数目来描述。

  返回 A 的任意排列，使其相对于 B 的优势最大化。

  示例 1：

  输入：A = [2,7,11,15], B = [1,10,4,11]
  输出：[2,11,7,15]
  示例 2：

  输入：A = [12,24,8,32], B = [13,25,32,11]
  输出：[24,32,8,12]

  提示：

  1 <= A.length = B.length <= 10000
  0 <= A[i] <= 10^9
  0 <= B[i] <= 10^9
 */

/**
 * @param {number[]} A
 * @param {number[]} B
 * @return {number[]}
 */
const advantageCount1 = (A, B) => {
  const { length } = A;
  if (length < 2) return A;
  A.sort((a, b) => a - b);
  const ans = Array(length);

  const getGtItem = x => {
    let min = -1;
    let i = -1;
    while ((i += 1) < length) {
      if (0 <= A[i]) {
        if (min === -1) min = i;
        if (x < A[i]) return i;
      }
    }
    return min;
  };

  for (let i = 0; i < length; i += 1) {
    const index = getGtItem(B[i]);
    console.log("i: %d, index: %d", i, index);
    ans[i] = A[index];
    A[index] = -1;
  }

  return ans;
};

function LinkNode(e) {
  this.prev = null;
  this.succ = null;
  this.data = e;
}

const advantageCount = (A, B) => {
  const { length } = A;
  if (length < 2) return A;
  A.sort((a, b) => a - b);
  const header = new LinkNode();
  const tailer = new LinkNode();
  let curr = header;
  for (const e of A) {
    const node = new LinkNode(e);
    curr.succ = node;
    node.prev = curr;
    curr = node;
  }
  curr.succ = tailer;
  tailer.prev = curr;

  const find = x => {
    if (tailer.prev.data <= x) return header.succ;
    let node = header;
    while (node !== tailer) {
      if (x < node.data) return node;
      node = node.succ;
    }
    return header.succ;
  };

  const remove = node => {
    node.prev.succ = node.succ;
    node.succ.prev = node.prev;
  };

  const ans = Array(length);
  for (let i = 0; i < length; i += 1) {
    const node = find(B[i]);
    ans[i] = node.data;
    remove(node);
  }

  return ans;
};

console.log(advantageCount1([2, 0, 4, 1, 2], [1, 3, 0, 0, 2]));
console.log(advantageCount([2, 0, 4, 1, 2], [1, 3, 0, 0, 2]));
