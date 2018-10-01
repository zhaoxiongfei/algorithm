const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin
});

const init = str => str | 0;

const getMid = (left, right) => Math.floor((left + right) / 2);

/**
 * 思路：枚举验证，有效到大
 * 数学思想: 素数不能被比它小的任一素数整除 (这样验证空间小了很多)
 */
const calc = str => {
  const n = init(str);
  const list = [2, 3, 5, 7]; // 存放素数集合，有小到大
  const isPrime = num => {
    const max = Math.ceil(Math.sqrt(num));
    return !list.some(x => x < num && num % x === 0);
  };
  let i = 11;

  while (i < n) {
    if (isPrime(i)) list.push(i);
    i += 2;
  }
  return list.pop();
};

// 找到比给定正整数小的最大的素数
rl.on("line", input => {
  console.log(calc(input.trim()));
});
