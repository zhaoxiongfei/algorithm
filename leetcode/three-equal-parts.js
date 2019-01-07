// https://leetcode-cn.com/problems/three-equal-parts/
// No 927. 三等分

/**
  给定一个由 0 和 1 组成的数组 A，将数组分成 3 个非空的部分，使得所有这些部分表示相同的二进制值。

  如果可以做到，请返回任何 [i, j]，其中 i+1 < j，这样一来：

  A[0], A[1], ..., A[i] 组成第一部分；
  A[i+1], A[i+2], ..., A[j-1] 作为第二部分；
  A[j], A[j+1], ..., A[A.length - 1] 是第三部分。
  这三个部分所表示的二进制值相等。
  如果无法做到，就返回 [-1, -1]。

  注意，在考虑每个部分所表示的二进制时，应当将其看作一个整体。
  例如，[1,1,0] 表示十进制中的 6，而不会是 3。
  此外，前导零也是被允许的，所以 [0,1,1] 和 [1,1] 表示相同的值。

  示例 1：

  输入：[1,0,1,0,1]
  输出：[0,3]
  示例 2：

  输出：[1,1,0,1,1]
  输出：[-1,-1]

  提示：

  3 <= A.length <= 30000
  A[i] == 0 或 A[i] == 1
 */

/**
 * @param {number[]} A
 * @return {number[]}
 */
// 思路: 统计1在个位置出现的次数，1的总次数应该是3的整数倍，如果不是一定无法三等分, 之后找1的个数等于1/3 和 2/3的地方，交叉验证
const threeEqualParts = A => {
  const { length } = A;
  const dp = Array(length + 1).fill(0);
  for (let i = 1; i <= length; i += 1) dp[i] = dp[i - 1] + A[i - 1];

  if (dp[length] % 3) return [-1, -1];
  if (dp[length] === 0) return [0, length - 1];

  const num = dp[length] / 3; // 每段包含1的个数
  const tail = A[length - 1]; // 尾部元素
  const is = []; // i 的位置可选值, j的位置不需要统计，j的位置有 i的位置决定
  for (let i = 0; i < length; i += 1) {
    if (dp[i + 1] === num && A[i] === tail) is.push(i);
  }

  const preZero = start => {
    while (A[start] === 0) start += 1;
    if (A[start] !== 0) start -= 1;
    return start;
  };

  const o = preZero(0); // 第一部分的前导零截止位置

  let lo = 0;
  let hi = is.length;

  // 二分法查找
  while (lo < hi) {
    const mi = (lo + hi) >> 1;
    const i = is[mi]; // 第一分隔位置
    const l = i - o; // 第一段的有效长度，去掉前导零, 三部分的有效长度应该相同
    const p = preZero(i + 1); // 统计第二部分的前导零截止位置
    const j = p + l; // 第二分隔位置
    const q = preZero(j + 1); // 统计第三部分的前导零截止位置

    if (l < length - q - 1) {
      lo = mi + 1;
    } else if (length - q - 1 < l) {
      hi = mi;
    } else {
      const p1 = A.slice(o + 1, i + 1).join("");
      const p2 = A.slice(p + 1, j + 1).join("");
      if (p1 !== p2) return [-1, -1];
      const p3 = A.slice(q + 1).join("");
      if (p1 === p3) return [i, j + 1];
      return [-1, -1];
    }
  }

  return [-1, -1];
};

console.log(threeEqualParts([0, 1, 0, 1, 1]));
console.log(threeEqualParts([1, 0, 1, 0, 1]));
