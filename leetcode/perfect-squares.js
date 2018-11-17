// https://leetcode-cn.com/problems/perfect-squares/description/
// 279. 完全平方数

/**
  给定正整数 n，找到若干个完全平方数（比如 1, 4, 9, 16, ...）
  使得它们的和等于 n。你需要让组成和的完全平方数的个数最少。

  示例 1:

  输入: n = 12
  输出: 3
  解释: 12 = 4 + 4 + 4.
  示例 2:

  输入: n = 13
  输出: 2
  解释: 13 = 4 + 9.
 */
const findAllSquares = n => {
  const list = [];
  let i = 0;
  while ((i += 1) * i <= n) list.push(i * i);
  return list;
};

const helper = (stack1, nums, count) => {
  const stack2 = new Set();
  for (const num of stack1) {
    if (nums.has(num)) return count;
    for (const n1 of findAllSquares(num)) stack2.add(num - n1);
  }

  return helper(stack2, nums, count + 1);
};
/**
 * @param {number} n
 * @return {number}
 */
// 思路: BFS, 遇到叶子节点立刻停止
const numSquares1 = n => {
  const nums = new Set(findAllSquares(n));
  if (nums.has(n)) return 1;

  const stack = new Set(Array.from(nums).map(x => n - x));
  return helper(stack, nums, 2);
};

// 参考 leetcode 网友，牛逼啊，数学家惹不起
// 结果集只有4种可能：1、2、3、4
// 结果为1：n为完全平方数
// 结果为2：n为两个完全平方数的平方和
// 结果为4：n为7、15、23 …… (n-1)*8 +7
// 结果为3：其他情况
const numSquares = n => {
  while (n % 4 === 0) n /= 4;
  if (n % 8 === 7) return 4;
  for (let a = 0; a * a <= n; a += 1) {
    const b = ~~Math.sqrt(n - a * a);
    if (a * a + b * b === n) {
      return !!a + !!b;
    }
  }
  return 3;
};

console.log(numSquares1(1));
console.log(numSquares(1));
console.log(numSquares(18));
console.log(numSquares(12));
console.log(numSquares(13));
