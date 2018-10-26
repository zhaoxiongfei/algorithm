// https://leetcode-cn.com/problems/restore-ip-addresses/description/

const merge = (list, arr, pre) => {
  for (let i = 0; i < arr.length; i += 1) list.push(`${pre}.${arr[i]}`);
};
/**
 * @param {string} s
 * @return {string[]}
 */
// 思路: 采用递归的方式,
// 递推公式为 fn(s, n) = fn(s.substr(1), n - 1) + fn(s.substr(2), n - 1) + fn(s.substr(3), n - 1)
const restoreIpAddresses = (s, n = 4) => {
  const { length } = s;
  const list = [];
  if (length > n * 3) return [];
  if (length === 0) return [];
  if (n === 1) {
    if (s > 255) return [];
    if (length > 1 && s[0] === "0") return [];
    return [s];
  }
  const arr1 = restoreIpAddresses(s.substr(1), n - 1);
  if (arr1.length) merge(list, arr1, s[0]);

  const pre2 = s.substr(0, 2);
  if (pre2[0] !== "0") {
    const arr2 = restoreIpAddresses(s.substr(2), n - 1);
    if (arr2.length) merge(list, arr2, pre2);
  }

  const pre3 = s.substr(0, 3);
  if (pre3[0] !== "0" && pre3 <= 255) {
    const arr3 = restoreIpAddresses(s.substr(3), n - 1);
    if (arr3.length) merge(list, arr3, pre3);
  }

  return list;
};

console.log(restoreIpAddresses("010010"));
console.log(restoreIpAddresses("25525511135"));
