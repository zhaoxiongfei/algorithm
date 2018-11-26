// https://leetcode-cn.com/contest/weekly-contest-112/problems/bag-of-tokens/
// 948. 令牌放置

/**
  你的初始能量为 P，初始分数为 0，只有一包令牌。

  令牌的值为 token[i]，每个令牌最多只能使用一次，可能的两种使用方法如下：

  如果你至少有 token[i] 点能量，可以将令牌置为正面朝上，失去 token[i] 点能量，并得到 1 分。
  如果我们至少有 1 分，可以将令牌置为反面朝上，获得 token[i] 点能量，并失去 1 分。
  在使用任意数量的令牌后，返回我们可以得到的最大分数。


  示例 1：

  输入：tokens = [100], P = 50
  输出：0
  示例 2：

  输入：tokens = [100,200], P = 150
  输出：1
  示例 3：

  输入：tokens = [100,200,300,400], P = 200
  输出：2

  提示：

  tokens.length <= 1000
  0 <= tokens[i] < 10000
  0 <= P < 10000
 */

/**
 * @param {number[]} tokens
 * @param {number} P
 * @return {number}
 */
// 思路: 动态规划令 dp[i] 为使用了 i 个令牌后的最大得分
const bagOfTokensScore = (tokens, P) => {
  const { length } = tokens;
  if (length === 0) return 0;

  const dp = Array(length).fill(0);
  const last = Array(length).fill(0);
  for (let i = length - 2; i >= 0; i -= 1) {
    last[i] = tokens[i + 1] + last[i + 1];
  }

  let score = 0;
  for (let i = 0; i < length; i += 1) {
    dp[i] = score;
    const token = tokens[i];
    // game over
    if (P < token && score === 0) break;
    if (P < token) {
      // 当前能量不足，无须选择就是最好的选择
      P += token;
      score -= 1;
      continue;
    }
    if (score === 0) {
      // 当前积分为零，无须选个这就是最好的选择
      P -= token;
      score += 1;
      continue;
    }
    // 真正难为的时候在这时
    const remain = length - i - 1; // 除去当前这个剩余的令牌数
    const l = last[i]; // 得到剩余令牌所需能量
    if (remain > 1) {
      if (P + token >= l - last[i + 2]) {
        P += token;
        score -= 1;
        continue;
      }
    }
    P -= token;
    score += 1;
  }

  console.log(last);
  console.log(tokens);
  return Math.max(...dp);
};

console.log(bagOfTokensScore([100, 200, 300, 400], 200));
console.log(bagOfTokensScore([100, 200], 150));
