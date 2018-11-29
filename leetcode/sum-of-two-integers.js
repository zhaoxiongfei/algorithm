// https://leetcode-cn.com/problems/sum-of-two-integers/description/
// No 371. 两整数之和

/**
  不使用运算符 + 和 - ，计算两整数 a 、b 之和。

  示例 1:

  输入: a = 1, b = 2
  输出: 3
  示例 2:

  输入: a = -2, b = 3
  输出: 1
 */

/**
 * @param {number} a
 * @param {number} b
 * @return {number}
 */

/**
  在学习位运算的时候，我们知道XOR的一个重要特性是不进位加法，那么只要再找到进位，将其和XOR的结果加起来，就是最后的答案。
  通过观察上面的四种情况我们可以发现，只有在两个加数的值都是1的时候才会产生进位，
  所以我们采用&来计算进位的情况，但是注意到由于是进位，所以我们必须要将&的结果左移一位，
  然后再和XOR的结果相加。怎么相加呢，还是要调用getSum这个函数，
  这里需要再添加上递归最底层的情况，b == 0，也就是进位是0，这时候只要返回a就可以了.
  ---------------------
  作者：shenzhu0127
  来源：CSDN
  原文：https://blog.csdn.net/shenzhu0127/article/details/51810349
  版权声明：本文为博主原创文章，转载请附上博文链接！
*/
const getSum = (a, b) => {
  if (a === 0 || b === 0) return b || a;
  const sum = a ^ b;
  const t = (a & b) << 1;
  return getSum(sum, t);
};

console.log(getSum(20, 30));
console.log(getSum(10, 11));
console.log(getSum(2, 3));
console.log(getSum(4, 3));
console.log(getSum(12, 3));
