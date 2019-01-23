// https://leetcode-cn.com/problems/bag-of-tokens/
// No 948. 令牌放置

/**
  你的初始能量为 P，初始分数为 0，只有一包令牌。

  令牌的值为 token[i]，每个令牌最多只能使用一次，可能的两种使用方法如下：

  如果你至少有 token[i] 点能量，可以将令牌置为正面朝上，
  失去 token[i] 点能量，并得到 1 分。
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
// 思路: 不要陷入误区，令牌的使用并不需要按顺序使用, 消耗最小的体力值换取分数
// 使用分数换取最大的体力值
const bagOfTokensScore = (tokens, P) => {
  tokens.sort((a, b) => a - b);
  let max = 0;
  let score = 0;
  while (tokens.length && tokens[0] <= P) {
    const token = tokens.shift();
    P -= token;
    score += 1;
    max = Math.max(max, score);
    if (tokens.length && P < tokens[0] && 0 < score) {
      score -= 1;
      P += tokens.pop();
    }
  }

  return max;
};

console.log(bagOfTokensScore([100, 200, 300, 400], 200));
