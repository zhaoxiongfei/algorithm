// https://leetcode-cn.com/problems/divide-two-integers/description/
//
// 给定两个整数，被除数 dividend 和除数 divisor。将两数相除，要求不使用乘法、除法和 mod 运算符。
// 返回被除数 dividend 除以除数 divisor 得到的商。
//

// 思路使用循环减法，直到剩余数小于除数
// 求绝对值，之后手动处理一下符号
const divide = (dividend, divisor) => {
  // if (dividend === divisor) return 1;
  const MAX = 2 ** 31 - 1;

  const result = res => {
    if ((dividend < 0 && divisor < 0) || (dividend > 0 && divisor > 0))
      return res > MAX ? MAX : res;
    return 0 - res;
  };

  let n1 = Math.abs(dividend);
  const n2 = Math.abs(divisor);
  if (n2 > n1) return 0;
  if (n2 === n1) return result(1);
  if (n2 > MAX) return 0;

  let res = 0;
  while (n1 >= n2) {
    if (n1 === n2) {
      res += 1;
      break;
    }
    let n = 0;
    let tmp = n2 << (n + 1);
    while (tmp < n1 && tmp > 1) {
      n += 1;
      tmp = n2 << (n + 1);
    }

    tmp = n2 << n;
    if (tmp > 0) {
      n1 -= tmp;
      res += 2 ** n;
    } else {
      n1 -= n2 << (n - 1);
      res += n ** (n - 1);
    }
  }

  return result(res);
};

console.log(divide(-10, 3));
console.log(divide(-2147483648, -1));
console.log(divide(-1, 1));
console.log(divide(30, 5));
console.log(divide(11000000, 3));
console.log(divide(-2147483649, -2147483648));
console.log(divide(-2147483648, 2147483647));
