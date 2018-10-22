/**
 * @param {number[]} nums
 * @return {number}
 */
const bigData = require("./jump-game-big-data.json");

// 思路：采用动态规划，从后往前扫描，dp[i] 记录从 i 下标开始还需至少多少步到达终点
// 这个之所以比前一个性能高很多，在于每一个点都只需要继续一次，为为人人的思想
const jump = nums => {
  const { length } = nums;
  if (length === 1) return 0; // 已经到了，所以最小步数是 0

  const dp = Array(length).fill(0);

  // 显然最后一个点只需要零步就到到终点了，所以从倒数第一个点开始计算
  for (let i = length - 2; i >= 0; i -= 1) {
    // 当前点最多能走多少步
    const steps = nums[i];
    if (steps === 0) {
      dp[i] = length;
      continue; // 走到这个点就废了，永远都到不了终点，所以跳过
    }

    // 因为后续的最小步数都有值了, 所以找到当前点选择 1 ~ steps 中决策最小的值 j,
    // 使得 dp[i + j] 的取值最小
    // 更新 dp[i] = dp[i + j] + 1;
    let min = length;
    for (let j = 1; j <= steps; j += 1) {
      if (dp[i + j] < min) min = dp[i + j];
    }
    dp[i] = min + 1;
  }

  return dp[0];
};

/**
 * http://www.cnblogs.com/ganganloveu/p/3761715.html
 * 我是看了上面那个解析的
 *
 * times就是跳了多少次
 * reached就是当前跳了times次时能到的最远范围
 * max是路过的位置之处再跳一次能到达的最远的位置
 *
 * 总之就是用了贪心的策略，reached和times表示跳了times次后，某一段区间内最小的步伐到达数量
 *
 * 而max则记录了路过的所有节点的，再跳一次能有多远，这个可以用来更新reached
 *
 *   ---------------------
 *   作者：MebiuW
 *   来源：CSDN
 *   原文：https://blog.csdn.net/MebiuW/article/details/51171153
 *   版权声明：本文为博主原创文章，转载请附上博文链接！
 */
const jump2 = nums => {
  let times = 0;
  let reached = 0;
  let max = 0;
  for (let i = 0; i < nums.length; i += 1) {
    if (reached < i) {
      // 当前索引超过了之前所能企及的最大索引，则增加一次跳跃
      // 重置最大企及索引
      times += 1;
      reached = max;
    }
    max = Math.max(max, i + nums[i]); // 更新扫描到次能企及的最大索引
  }

  return times;
};

console.log(jump([2, 3, 1, 1, 4]));
console.log(jump2([2, 3, 0, 1, 4]));
console.log(jump2(bigData));
