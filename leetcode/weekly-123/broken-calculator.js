/**
 * @param {number} X
 * @param {number} Y
 * @return {number}
 */
// 思路: 贪心算法，从目标开始逆推初始值, 偶数则除2，奇数则加1
const brokenCalc = (X, Y) => {
  let count = 0;
  while (X < Y) {
    count += 1;
    if (Y % 2 === 1) {
      Y += 1;
    } else {
      Y /= 2;
    }
  }

  return count + X - Y;
};

console.log(brokenCalc(1, 1000000000));
console.log(brokenCalc(5, 8));
console.log(brokenCalc(2, 3));
console.log(brokenCalc(3, 10));
console.log(brokenCalc(1024, 1));
