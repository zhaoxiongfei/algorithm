// https://leetcode-cn.com/problems/russian-doll-envelopes/description/
// No 354. 俄罗斯套娃信封问题

/**
  给定一些标记了宽度和高度的信封，宽度和高度以整数对形式 (w, h) 出现。当另一个信封的宽度和高度都比这个信封大的时候，这个信封就可以放进另一个信封里，如同俄罗斯套娃一样。

  请计算最多能有多少个信封能组成一组“俄罗斯套娃”信封（即可以把一个信封放到另一个信封里面）。

  说明:
  不允许旋转信封。

  示例:

  输入: envelopes = [[5,4],[6,4],[6,7],[2,3]]
  输出: 3
  解释: 最多信封的个数为 3, 组合为: [2,3] => [5,4] => [6,7]。
*/

/**
 * @param {number[][]} envelopes
 * @return {number}
 */
const maxEnvelopes = envelopes => {
  const { length } = envelopes;
  envelopes.sort((a, b) => (a[0] === b[0] ? a[1] - b[1] : a[0] - b[0]));

  const dp = Array(length).fill(1);
  for (let i = 1; i < length; i += 1) {
    const [w, h] = envelopes[i];
    let max = 1;
    for (let j = 0; j < i; j += 1) {
      const [lw, lh] = envelopes[j];
      if (w > lw && h > lh) {
        if (dp[j] + 1 > max) max = dp[j] + 1;
      }
    }
    dp[i] = max;
  }

  console.log(envelopes);
  console.log(dp);
  return Math.max(...dp);
};

console.log(maxEnvelopes([[46, 89], [50, 53], [52, 68], [72, 45], [77, 81]]));
