// https://leetcode-cn.com/problems/random-pick-with-weight/
// No 528. 按权重随机选择

/**
  给定一个正整数数组 w ，其中 w[i] 代表位置 i 的权重，
  请写一个函数 pickIndex ，它可以随机地获取位置 i，选取位置 i 的概率与 w[i] 成正比。

  说明:

  1 <= w.length <= 10000
  1 <= w[i] <= 10^5
  pickIndex 将被调用不超过 10000 次
  示例1:

  输入:
  ["Solution","pickIndex"]
  [[[1]],[]]
  输出: [null,0]
  示例2:

  输入:
  ["Solution","pickIndex","pickIndex","pickIndex","pickIndex","pickIndex"]
  [[[1,3]],[],[],[],[],[]]
  输出: [null,0,1,1,1,0]
  输入语法说明：

  输入是两个列表：调用成员函数名和调用的参数。
  Solution 的构造函数有一个参数，即数组 w。pickIndex 没有参数。
  输入参数是一个列表，即使参数为空，也会输入一个 [] 空列表。
 */

/**
 * @param {number[]} w
 */
function Solution(w) {
  const { length } = w;
  const weight = Array(length);
  weight[0] = 0;
  for (let i = 1; i < length; i += 1) weight[i] = weight[i - 1] + w[i - 1];
  const total = weight[length - 1] + w[length - 1];

  const binSearch = e => {
    let lo = 0;
    let hi = length;
    while (lo < hi) {
      const mi = (lo + hi) >> 1; // 寻找中点
      // 经比较后确认深入 [lo, mi) 或 [mi + 1, hi)
      if (e < weight[mi]) hi = mi;
      else lo = mi + 1;
    }
    // 查找成功不能提前终止

    // 循环结束时， lo 为大于e的元素的最小的秩，故 lo - 1即不大于 e de元素的最大秩
    return lo - 1;
  };

  /**
   * @return {number}
   */
  const pickIndex = () => binSearch((Math.random() * total) | 0);

  return { pickIndex };
}

/**
 * Your Solution object will be instantiated and called as such:
 * var obj = Object.create(Solution).createNew(w)
 * var param_1 = obj.pickIndex()
 */
const instance = new Solution([1, 1, 1, 1]);
const stats = Array(4).fill(0);
for (let i = 0; i < 10000; i += 1) {
  stats[instance.pickIndex()] += 1;
}
console.log(stats);
