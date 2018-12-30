// https://leetcode-cn.com/problems/super-washing-machines/
// No 517. 超级洗衣机

/**
  假设有 n 台超级洗衣机放在同一排上。开始的时候，每台洗衣机内可能有一定量的衣服，也可能是空的。

  在每一步操作中，你可以选择任意 m （1 ≤ m ≤ n） 台洗衣机，与此同时将每台洗衣机的一件衣服送到相邻的一台洗衣机。

  给定一个非负整数数组代表从左至右每台洗衣机中的衣物数量，
  请给出能让所有洗衣机中剩下的衣物的数量相等的最少的操作步数。
  如果不能使每台洗衣机中衣物的数量相等，则返回 -1。

  示例 1：

  输入: [1,0,5]

  输出: 3

  解释:
  第一步:    1     0 <-- 5    =>    1     1     4
  第二步:    1 <-- 1 <-- 4    =>    2     1     3
  第三步:    2     1 <-- 3    =>    2     2     2
  示例 2：

  输入: [0,3,0]

  输出: 2

  解释:
  第一步:    0 <-- 3     0    =>    1     2     0
  第二步:    1     2 --> 0    =>    1     1     1
  示例 3:

  输入: [0,2,0]

  输出: -1

  解释:
  不可能让所有三个洗衣机同时剩下相同数量的衣物。

  提示：

  n 的范围是 [1, 10000]。
  在每台超级洗衣机中，衣物数量的范围是 [0, 1e5]。
 */

/**
 * @param {number[]} machines
 * @return {number}
 */
// 参考 https://blog.csdn.net/qq_38595487/article/details/81452170
const findMinMoves = machines => {
  const { length } = machines;
  const sum = machines.reduce((m, x) => m + x, 0);

  if (sum === 0) return 0;
  if (sum % length) return -1;
  const avg = sum / length;

  let leftSum = 0;
  let count = 0;
  for (let i = 0; i < length; i += 1) {
    const leftCount = leftSum - i * avg;
    leftSum += machines[i];
    const rightCount = sum - leftSum - (length - 1 - i) * avg;
    if (0 < leftCount && 0 < rightCount) {
      count = Math.max(count, leftCount, rightCount);
    } else if (leftCount < 0 && rightCount < 0) {
      count = Math.max(count, 0 - leftCount - rightCount);
    } else {
      count = Math.max(count, Math.abs(leftCount), Math.abs(rightCount));
    }
  }

  return count;
};

const findMinMoves2 = machines => {
  const { length } = machines;
  const avg = machines.reduce((m, x) => m + x, 0) / length;
  if (parseInt(avg, 10) !== avg) return -1;
  const target = avg;
  let totalstep = 0;
  let balance = 0;
  for (let i = 0; i < length; ++i) {
    // 对数组中每个元素遍历
    balance += machines[i] - target; // 找出经过该元素的最大流量
    totalstep = Math.max(totalstep, machines[i] - target, Math.abs(balance));
  }
  return totalstep;
};

console.log(findMinMoves([0, 3, 0]));
console.log(findMinMoves2([0, 3, 0]));
