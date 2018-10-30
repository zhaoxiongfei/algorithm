// https://leetcode-cn.com/problems/pascals-triangle-ii/description/

// 杨辉三角
/**
  输入: 5
  输出:
  [
       [1],
      [1,1],
     [1,2,1],
    [1,3,3,1],
   [1,4,6,4,1]
  ]
 */

// 公式C(m, n) = m! / (n!(m-n)!)
const combine = (m, n) => {
  let num = 1;
  for (let i = 0; i < n; i += 1) {
    num *= m - i;
    num /= i + 1;
  }
  return num;
};

/**
 * @param {number} rowIndex
 * @return {number[]}
 */
// 思路: 要求使用 O(k) 空间复杂度, 有两种方法，
//        1. 找到杨辉三角的第 n 项公式 第 m 行，n 项的值等于 C(m - 1, n - 1)
//        2. 正常的计算，之后不断的删掉前面的存储(不好)
const getRow = rowIndex => {
  const line = [];
  const middle = Math.floor((rowIndex + 1) / 2);
  for (let i = 0; i <= middle; i += 1) {
    line[i] = combine(rowIndex, i);
    line[rowIndex - i] = line[i];
  }
  return line;
};

console.log(getRow(0));
console.log(getRow(1));
console.log(getRow(2));
console.log(getRow(3));
console.log(getRow(4));
console.log(getRow(5));
console.log(getRow(6));
console.log(getRow(7));
console.log(getRow(8));
console.log(getRow(9));
