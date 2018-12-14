// https://leetcode-cn.com/problems/poor-pigs/comments/
// No 458. 可怜的小猪

/**
  有1000只水桶，其中有且只有一桶装的含有毒药，其余装的都是水。
  它们从外观看起来都一样。如果小猪喝了毒药，它会在15分钟内死去。

  问题来了，如果需要你在一小时内，弄清楚哪只水桶含有毒药，你最少需要多少只猪？

  回答这个问题，并为下列的进阶问题编写一个通用算法。

  进阶:

  假设有 n 只水桶，猪饮水中毒后会在 m 分钟内死亡，你需要多少猪（x）
  就能在 p 分钟内找出“有毒”水桶？n只水桶里有且仅有一只有毒的桶。
 */

/**
 * @param {number} buckets
 * @param {number} minutesToDie
 * @param {number} minutesToTest
 * @return {number}
 */
/**
 这个问题的本质是进制转换，用多少进制可以表示十进制, 表示后的长度是多少
 */
const poorPigs = (buckets, minutesToDie, minutesToTest) => {
  if (buckets === 1) return 0;
  const base = 1 + ((minutesToTest / minutesToDie) | 0);
  return (buckets - 1).toString(base).length;
};

console.log(poorPigs(1000, 15, 60));
