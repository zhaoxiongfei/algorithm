// https://leetcode-cn.com/problems/k-th-smallest-in-lexicographical-order/
// No 440. 字典序的第K小数字

/**
  给定整数 n 和 k，找到 1 到 n 中字典序第 k 小的数字。

  注意：1 ≤ k ≤ n ≤ 10 ** 9。

  示例 :

  输入:
  n: 13   k: 2

  输出:
  10

  解释:
  字典序的排列是 [1, 10, 11, 12, 13, 2, 3, 4, 5, 6, 7, 8, 9]，所以第二小的数字是 10。
 */

/**
 * @param {number} n
 * @param {number} k
 * @return {number}
 */
// 思路一: 保留通过排序来实现，无法通过大数据测试
const findKthNumber1 = (n, k) => {
  const list = [];
  for (let i = 1; i <= n; i += 1) list.push(`${i}`);
  list.sort((a, b) => (a > b ? 1 : -1));
  console.log(
    list
      .slice(0, k)
      .map((x, i) => `${i + 1}: ${x}`)
      .join("\n")
  );
  return list[k - 1];
};

// 思路二: 找规律
// 参考自: https://blog.csdn.net/qq_36946274/article/details/81638367
// 本质上是一颗十叉树
const findKthNumber = (n, k) => {
  let ans = 1;
  k -= 1;
  while (k > 0) {
    let count = 0;
    console.log("ans: %d, k: %d", ans, k);
    const interval = [ans, ans + 1];
    while (interval[0] <= n) {
      count += Math.min(n + 1, interval[1]) - interval[0];
      interval[0] *= 10;
      interval[1] *= 10;
    }
    if (count <= k) {
      ans += 1;
      k -= count;
    } else {
      ans *= 10;
      k -= 1;
    }
  }

  return ans;
};

console.log(findKthNumber1(156, 156));
console.log(findKthNumber(156, 156));
