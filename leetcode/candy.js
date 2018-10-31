// https://leetcode-cn.com/problems/candy/description/
// No. 135
/**
 老师想给孩子们分发糖果，有 N 个孩子站成了一条直线，老师会根据每个孩子的表现，预先给他们评分。

 你需要按照以下要求，帮助老师给这些孩子分发糖果：

 每个孩子至少分配到 1 个糖果。
 相邻的孩子中，评分高的孩子必须获得更多的糖果。
 那么这样下来，老师至少需要准备多少颗糖果呢？

 示例 1:

 输入: [1,0,2]
 输出: 5
 解释: 你可以分别给这三个孩子分发 2、1、2 颗糖果。
 示例 2:

 输入: [1,2,2]
 输出: 4
 解释: 你可以分别给这三个孩子分发 1、2、1 颗糖果。
 第三个孩子只得到 1 颗糖果，这已满足上述两个条件。
 */

const correction = (ratings, dp) => {
  let hasError = false;
  for (let i = 1; i < ratings.length - 1; i += 1) {
    if (ratings[i] > ratings[i - 1] && dp[i] <= dp[i - 1]) {
      dp[i] = dp[i - 1] + 1;
      hasError = true;
      continue;
    }
    if (ratings[i] > ratings[i + 1] && dp[i] <= dp[i + 1]) {
      dp[i] = dp[i + 1] + 1;
      hasError = true;
      continue;
    }
  }

  if (hasError) correction(ratings, dp);
};

/**
 * @param {number[]} ratings
 * @return {number}
 */
// 思路: 说实话这类题没啥想法，按照定义暴力来吧。
const candy = ratings => {
  const { length } = ratings;
  const dp = Array(length + 2).fill(1); // dp[i] 记录第 i 个孩子得到的糖果量
  ratings.unshift(Infinity);
  ratings.push(Infinity);
  // 默认都分配1，之后直接递归纠错
  correction(ratings, dp);

  return dp.slice(1, length + 1).reduce((m, x) => m + x, 0);
};

// 参考大牛的答案
const candy2 = ratings => {
  const { length } = ratings;
  const res = new Array(length).fill(1);
  const ans = new Array(length).fill(1);
  let sum = 0;
  // 这个循环的目的是满足那些比左侧小朋友评分高多得糖果的条件
  for (let i = 1; i < length; i += 1) {
    if (ratings[i] > ratings[i - 1]) {
      res[i] = res[i - 1] + 1;
    }
  }
  // 这个循环的目的是满足那些比右侧小朋友评分高多得糖果的条件
  for (let i = length - 2; i >= 0; i -= 1) {
    if (ratings[i] > ratings[i + 1]) {
      ans[i] = ans[i + 1] + 1;
    }
    // 求和的时候用更大的数字，这样左右条件都确保能满足
    sum += Math.max(res[i], ans[i]);
  }
  // 把最右边小朋友的糖果数加上
  // 那最左侧的小朋友的糖果数加了吗？
  // 答: 加了，因为从有往左循环是到 0 的
  sum += Math.max(res[length - 1], ans[length - 1]);
  return sum;
};

console.log(candy([1, 6, 10, 8, 7, 3, 2])); // 5, 分配方式: [2, 1, 2]
console.log(candy2([1, 6, 10, 8, 7, 3, 2])); // 5, 分配方式: [2, 1, 2]
console.log(candy([1, 0, 2])); // 5, 分配方式: [2, 1, 2]
console.log(candy([1, 2, 2])); // 4, 分配方式: [1, 2, 1]
console.log(candy([1, 0, 2, 2, 1, 3, 5, 5, 4])); // 16, 分配方式: [2, 1, 2, 2, 1, 2, 3, 2, 1]
