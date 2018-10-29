// https://leetcode-cn.com/problems/pascals-triangle/description/

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

/**
 * @param {number} numRows
 * @return {number[][]}
 */
const generate = numRows => {
  const list = [];

  for (let i = 0; i < numRows; i += 1) {
    const line = [1];
    for (let j = 0; j < i - 1; j += 1) {
      line[j + 1] = list[i - 1][j] + list[i - 1][j + 1];
    }
    line[i] = 1;
    list[i] = line;
  }

  return list;
};

console.log(generate(0));
console.log(generate(1));
console.log(generate(2));
console.log(generate(3));
console.log(generate(4));
console.log(generate(5));
console.log(generate(6));
console.log(generate(7));
console.log(generate(8));
console.log(generate(9));
