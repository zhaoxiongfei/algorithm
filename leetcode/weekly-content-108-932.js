// https://leetcode-cn.com/contest/weekly-contest-108/problems/beautiful-array/

/**
 * @param {number} N
 * @return {number[]}
 */
// 貌似找到规律: 中间的提到前面，其余部分翻转
const beautifulArray = N => {
  const nums = [];
  if (N % 2) {
    const middle = Math.floor(N / 2) + 1;
    console.log(middle);
    nums.push(middle);
    for (let i = middle - 1; i > 0; i -= 1) {
      nums.push(i);
    }
    for (let i = N; i > middle; i -= 1) {
      nums.push(i);
    }
  }

  return nums;
};

console.log(beautifulArray(3));
console.log(beautifulArray(5));
console.log(beautifulArray(7));
