// https://leetcode-cn.com/problems/gray-code/description/

const merge = (ls, n) => {
  const list = [];
  const high = 2 ** (n - 1);
  const len = ls.length;

  const length = 2 ** n;
  for (let i = 0; i < len; i += 1) {
    list[i] = ls[i];
    list[length - i - 1] = high + ls[i];
  }
  return list;
};

/**
 * @param {number} n
 * @return {number[]}
 */
// 思路: n 位格雷编码就是 n - 1 位格雷编码在连上 2 的 n 次方依次倒序加到 n - 1 位格雷编码上
const grayCode = n => {
  if (n === 0) return [0];
  let list = [0, 1];
  if (n === 1) return list;
  let i = 2;
  while (i <= n) {
    list = merge(list, i);
    i += 1;
  }

  return list;
};

// 思路二： 更加巧妙，不用床罩额外的空间
const grayCode2 = n => {
  const list = [0];
  for (let i = 0; i < n; i += 1) {
    const high = 2 ** i;
    for (let j = 1; j < high; j += 1) {
      list.push(high + list[high - j]);
    }
    list.push(high);
  }
  return list;
};

console.log(grayCode(2));
console.log(grayCode(3));
console.log(grayCode2(3));
console.log(grayCode(4));
console.log(grayCode2(4));
console.log(grayCode2(10));
