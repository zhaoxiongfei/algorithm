// https://leetcode-cn.com/problems/super-pow/description/
// No 372. 超级次方

/**
  你的任务是计算 ab 对 1337 取模，a 是一个正整数，b 是一个非常大的正整数且会以数组形式给出。

  示例 1:

  输入: a = 2, b = [3]
  输出: 8
  示例 2:

  输入: a = 2, b = [1,0]
  输出: 1024
 */

/**
  https://www.cnblogs.com/micrari/p/5739769.html
  做法
  我觉得这个题目做法很多啊，只要不是大暴力就行了。
  快速幂是肯定需要的，如果就只是用快速幂的话，就去每一次算个新的数组为上一次b数组表示的数字的一半。
  这个有点麻烦，而且不是太优。

  或者也可以利用a^(b*c) = a^b^c， 顺着做下去，但这样子其实还是复杂度高了点。

  我觉得最好还是欧拉函数来降指数，降完之后，用不用快速幂其实差别都不是太大。
  基于a^b%c = a^(b%phi(c))%c

  程序交上去耗时2ms。

  代码中也可以不写欧拉函数的实现，直接hard code一下phi(1137)=1140应该会更快点，
  但这么做没什么意义，因为1140不是什么人脑看到1337一两秒能算出的，不符合用程序来解决问题的宗旨。
*/
const fastPow = (a, b, c) => {
  let ret = 1;
  let mul = a;
  for (; b > 0; b >>= 1, mul = (mul * mul) % c) {
    if (b % 2) ret = (ret * mul) % c;
  }

  return ret;
};

const euler = n => {
  let ret = n;
  for (let i = 2; i * i <= n; i += 1) {
    if (n % i === 0) {
      ret = (ret / i) * (i - 1);
      while (n % i === 0) n /= i;
    }
  }
  if (n > 1) ret = (ret / n) * (n - 1);

  return ret;
};

/**
 * @param {number} a
 * @param {number[]} b
 * @return {number}
 */
const superPow = (a, b) => {
  const c = 1337;
  const phi = euler(c); // 1140
  let n = 0;
  for (let i = 0; i < b.length; i += 1) {
    n = n * 10 + b[i];
    n %= phi;
  }
  return fastPow(a % c, n, c);
};

console.log(superPow(2, [3]));
console.log(superPow(2147483647, [2, 0, 0]));
