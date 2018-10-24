// https://leetcode-cn.com/problems/plus-one/description/
//
/**
 * @param {number[]} digits
 * @return {number[]}
 */
const plusOne = digits => {
  const { length } = digits;
  digits[length - 1] += 1;
  digits.unshift(0); // 最前面补一个 0 防止操作溢出
  for (let i = length; i > 0; i -= 1) {
    if (digits[i] < 10) break;
    digits[i - 1] += 1;
    digits[i] -= 10;
  }
  if (digits[0] === 0) return digits.slice(1);
  return digits;
};

console.log(plusOne([1, 2, 3]));
