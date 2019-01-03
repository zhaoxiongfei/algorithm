// https://leetcode-cn.com/problems/find-the-shortest-superstring/
// No 943. 最短超级串

/**
  给定一个字符串数组 A，找到以 A 中每个字符串作为子字符串的最短字符串。

  我们可以假设 A 中没有字符串是 A 中另一个字符串的子字符串。

  示例 1：

  输入：["alex","loves","leetcode"]
  输出："alexlovesleetcode"
  解释："alex"，"loves"，"leetcode" 的所有排列都会被接受。
  示例 2：

  输入：["catg","ctaagt","gcta","ttca","atgcatc"]
  输出："gctaagttcatgcatc"

  提示：

  1 <= A.length <= 12
  1 <= A[i].length <= 20
 */
/**
 * @param {string} str1
 * @param {string} str2
 * @return {[number, string]}
 */
const diff = (str1, str2) => {
  if (str1.length < str2.length) {
    const tmp = str1;
    str1 = str2;
    str2 = tmp;
  }
  if (str1.includes(str2)) return [str2.length, str1];
  for (let i = 1; i < str2.length; i += 1) {
    let j = 0;
    while (str2[j + i] === str1[j]) j += 1;
    if (j === str2.length - i)
      return [str2.length - i, `${str2.slice(0, i)}${str1}`];

    j = 0;
    const more = str1.length - str2.length + i;
    while (str2[j] === str1[more + j]) j += 1;
    if (j === str2.length - i)
      return [str2.length - i, `${str1}${str2.slice(-i)}`];
  }
  return [0, `${str1}${str2}`];
};

/**
 * @param {string[]} A
 * @return {string}
 */
const shortestSuperstring = A => {
  const set = new Set(A);
  while (1 < set.size) {
    const similar = {
      src1: "",
      src2: "",
      dest: "",
      length: -1
    };
    for (const str1 of set) {
      for (const str2 of set) {
        if (str1 === str2) continue;
        const [len, dest] = diff(str1, str2);
        // console.log("len: %d, dest: %s", len, dest);
        if (similar.length < len) {
          similar.src1 = str1;
          similar.src2 = str2;
          similar.dest = dest;
          similar.length = len;
        }
      }
    }
    set.delete(similar.src1);
    set.delete(similar.src2);
    set.add(similar.dest);
  }

  return Array.from(set)[0];
};

console.log(shortestSuperstring(["abcde", "cdea"]));
// console.log(shortestSuperstring(["catg", "ctaagt", "gcta", "ttca", "atgcatc"]));
