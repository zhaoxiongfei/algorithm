// https://leetcode-cn.com/problems/integer-to-english-words/description/
// No 273. 整数转换英文表示

/**
  将非负整数转换为其对应的英文表示。可以保证给定输入小于 231 - 1 。

  示例 1:

  输入: 123
  输出: "One Hundred Twenty Three"
  示例 2:

  输入: 12345
  输出: "Twelve Thousand Three Hundred Forty Five"
  示例 3:

  输入: 1234567
  输出: "One Million Two Hundred Thirty Four Thousand Five Hundred Sixty Seven"
  示例 4:

  输入: 1234567891
  输出: "One Billion Two Hundred Thirty Four Million Five
  Hundred Sixty Seven Thousand Eight Hundred Ninety One"
 */

/**
 * @param {number} num
 * @return {string}
 */
const nums = [
  0,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
  19,
  20,
  30,
  40,
  50,
  60,
  70,
  80,
  90,
  100,
  1000,
  1000000,
  1000000000
];

const words = [
  "Zero",
  "One",
  "Two",
  "Three",
  "Four",
  "Five",
  "Six",
  "Seven",
  "Eight",
  "Nine",
  "Ten",
  "Eleven",
  "Twelve",
  "Thirteen",
  "Fourteen",
  "Fifteen",
  "Sixteen",
  "Seventeen",
  "Eighteen",
  "Nineteen",
  "Twenty",
  "Thirty",
  "Forty",
  "Fifty",
  "Sixty",
  "Seventy",
  "Eighty",
  "Ninety",
  "Hundred",
  "Thousand",
  "Million",
  "Billion"
];
// 输入: 1234567891
// 输出: One Billion Two Hundred Thirty Four Million Five Hundred Sixty Seven
//        Thousand Eight Hundred Ninety One"
const numberToWords = (num, output = []) => {
  let i = nums.length - 1;
  while (i >= 0 && nums[i] > num) i -= 1;

  const big = nums[i];
  const word = words[i];
  const d = Math.floor(num / big);
  const mod = num % big;
  if (big < 100) {
    output.push(word);
  } else {
    numberToWords(d, output);
    output.push(word);
  }
  if (mod) numberToWords(mod, output);
  return output.join(" ");
};

console.log(numberToWords(0));
console.log(numberToWords(1234567891));
