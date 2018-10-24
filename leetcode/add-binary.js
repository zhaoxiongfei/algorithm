// https://leetcode-cn.com/problems/add-binary/description/

/**
 * @param {string} a
 * @param {string} b
 * @return {string}
 */
const addBinary = (a, b) => {
  const n1 = a.split("");
  const n2 = b.split("");
  const sum = Array(Math.max(n1.length, n2.length) + 1).fill(0);
  for (let i = 1; i <= sum.length; i += 1) {
    sum[sum.length - i] += (n1[n1.length - i] | 0) + (n2[n2.length - i] | 0);
    if (sum[sum.length - i] >= 2) {
      sum[sum.length - i - 1] += 1;
      sum[sum.length - i] -= 2;
    }
  }

  if (sum[0] === 0) sum.shift();
  return sum.join("");
};

console.log(addBinary("1010", "1011"));
console.log(addBinary("11", "11"));
console.log(addBinary("1", "0"));
