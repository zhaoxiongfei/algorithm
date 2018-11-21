// https://leetcode-cn.com/problems/frog-jump/description/
// No 403. 青蛙过河

/**
  一只青蛙想要过河。 假定河流被等分为 x 个单元格，并且在每一个单元格内都有可能放有一石子（也有可能没有）。
  青蛙可以跳上石头，但是不可以跳入水中。

  给定石子的位置列表（用单元格序号升序表示）， 请判定青蛙能否成功过河（即能否在最后一步跳至最后一个石子上）。
  开始时， 青蛙默认已站在第一个石子上，并可以假定它第一步只能跳跃一个单位（即只能从单元格1跳至单元格2）。

  如果青蛙上一步跳跃了 k 个单位，那么它接下来的跳跃距离只能选择为 k - 1、k 或 k + 1个单位。
  另请注意，青蛙只能向前方（终点的方向）跳跃。

  请注意：

  石子的数量 ≥ 2 且 < 1100；
  每一个石子的位置序号都是一个非负整数，且其 < 231；
  第一个石子的位置永远是0。
  示例 1:

  [0,1,3,5,6,8,12,17]

  总共有8个石子。
  第一个石子处于序号为0的单元格的位置, 第二个石子处于序号为1的单元格的位置,
  第三个石子在序号为3的单元格的位置， 以此定义整个数组...
  最后一个石子处于序号为17的单元格的位置。

  返回 true。即青蛙可以成功过河，按照如下方案跳跃：
  跳1个单位到第2块石子, 然后跳2个单位到第3块石子, 接着
  跳2个单位到第4块石子, 然后跳3个单位到第6块石子,
  跳4个单位到第7块石子, 最后，跳5个单位到第8个石子（即最后一块石子）。
  示例 2:

  [0,1,2,3,4,8,9,11]

  返回 false。青蛙没有办法过河。
  这是因为第5和第6个石子之间的间距太大，没有可选的方案供青蛙跳跃过去。
 */

/**
 * @param {number[]} stones
 * @return {boolean}
 */
// 思路: 先尝试递归暴力求解，如果超时的话考虑从后向前做动态规划
const helper = (stones, step = 1, curr = 0, dp) => {
  if (step === 0) return false;
  const target = stones[curr] + step;
  const index = dp[target];
  if (!index) return false;
  if (index === stones.length - 1) return true;
  return (
    helper(stones, step + 1, index, dp) ||
    helper(stones, step, index, dp) ||
    helper(stones, step - 1, index, dp)
  );
};

const canCross = stones => {
  const { length } = stones;
  if (length === 0 || stones[1] !== 1) return false;

  if (length < 3) return true;

  const dp = {};
  for (let i = 0; i < length; i += 1) {
    if (i > 3 && stones[i - 1] * 2 < stones[i]) return false;
    dp[stones[i]] = i;
  }

  return helper(stones, 1, 0, dp);
};

// 思路: 动态规划，逆着推到试试看。
const canCross2 = stones => {
  if (stones[0] !== 0 || stones[1] !== 1) return false;
  const { length } = stones;

  const dp = [];
  for (let i = 0; i < length - 1; i += 1) {
    if (i > 3 && stones[i - 1] * 2 < stones[i]) return false;
    dp[i] = Array(length).fill(0);
    for (let j = i + 1; j < length; j += 1) {
      dp[i][j] = stones[j] - stones[i];
    }
  }

  const check = (curr, last, step) => {
    // 递归基
    if (curr === 1 && last === 0 && step === 1) return true;
    if (curr < 1 || last < 0) return false;
    for (let i = last - 1; i >= 0; i -= 1) {
      const lastStep = dp[i][last];
      if (lastStep <= step + 1 && step - 1 <= lastStep) {
        if (check(last, i, lastStep)) return true;
      }
    }
    return false;
  };

  let i = length - 1;
  while ((i -= 1) >= 0) {
    if (check(length - 1, i, dp[i][length - 1])) return true;
  }

  return false;
};

// console.log(canCross([0, 2]));
console.log(canCross([0, 1, 3, 4, 5, 6, 12]));
console.log(canCross([0, 1, 3, 4, 5, 7, 9, 10, 12]));
console.log(canCross2([0, 1, 3, 4, 5, 7, 9, 10, 12]));
// console.log(canCross([0, 1, 2147483647]));
// console.log(canCross([0, 1, 2, 3, 4, 8, 9, 11]));
// console.log(canCross([0, 1, 3, 5, 6, 8, 12, 17]));
// console.log(canCross1([0, 1, 3, 5, 6, 8, 12, 17]));
