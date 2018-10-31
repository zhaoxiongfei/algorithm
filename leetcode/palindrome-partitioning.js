// https://leetcode-cn.com/problems/palindrome-partitioning/description/
// No. 131

/**
  给定一个字符串 s，将 s 分割成一些子串，使每个子串都是回文串。

  返回 s 所有可能的分割方案。

  示例:

  输入: "aab"
  输出:
  [
    ["aa","b"],
    ["a","a","b"]
  ]
 */

const check = str => {
  let start = 0;
  let end = str.length - 1;
  while (start < end) {
    if (str[start] !== str[end]) return false;
    start += 1;
    end -= 1;
  }
  return true;
};

/**
 * @param {string} s
 * @return {string[][]}
 */
// 思路: 参考 https://blog.csdn.net/u012501459/article/details/46792453
// 对于上面的”aab”作为输入，可以这么寻找回文：
// “a”+”ab”构成的回文串
// “aa”+”b”构成的回文串
// “aab”不是回文，所以直接退出。
const partition = (s, start = 0, path = [], solutions = []) => {
  if (start === s.length) {
    solutions.push(path.slice());
    return solutions;
  }
  for (let i = start; i < s.length; i += 1) {
    const str = s.substring(start, i + 1);
    if (!check(str)) continue;
    path.push(str); // 插入这个切分方式
    partition(s, i + 1, path, solutions); // 递归剩余的, 如果有合法的就会加到 solutions 里
    path.pop(); // 这里弹出刚才加入的，进行下一个切分方式的尝试, 这就是所谓的回溯
  }

  return solutions;
};

console.log(partition("aab"));
console.log(partition("aabaa"));
