// https://leetcode-cn.com/problems/largest-palindrome-product/
// No 479. 最大回文数乘积

/**
  你需要找到由两个 n 位数的乘积组成的最大回文数。

  由于结果会很大，你只需返回最大回文数 mod 1337得到的结果。

  示例:

  输入: 2

  输出: 987

  解释: 99 x 91 = 9009, 9009 % 1337 = 987

  说明:

  n 的取值范围为 [1,8]。
 */

/**
 * @param {number} n
 * @return {number}
 */
// 参考自： https://blog.csdn.net/xiangxianghehe/article/details/82427995
// 重要规律利用，除了 n = 1，最大回文数为 9 之外，其余的最大回文数长度都是偶数
// 所以从大到小通过拼接的方式得到回文数，之后去验证, 逆向思维
const largestPalindrome = n => {
  const max = 10 ** n - 1;
  const min = 10 ** (n - 1);
  for (let i = max; i >= min; i -= 1) {
    const hi = i * 10 ** i.toString().length;
    const lo = +Array.from(i.toString())
      .reverse()
      .join("");
    // console.log("hi: %d, lo: %d", hi, lo);
    for (let j = max; j * j > hi + lo; j -= 1) {
      const mod = hi % j;
      if ((mod + lo) % j === 0) return ((hi % 1337) + lo) % 1337;
    }
  }
  return 9;
};

for (let i = 2; i < 9; i += 1) {
  console.log(largestPalindrome(i));
}
