// https://leetcode-cn.com/problems/minimum-window-substring/description/

/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
// 思路参考 https://blog.csdn.net/u013115610/article/details/70257445
// 滑动窗口：从左到右扫描，找到第一个完整覆盖 t 的子串，记录之
// 左侧测和右侧记录滑动，找到下一个满足的子串，比较长度更新之前的记录
// 知道右侧达到末尾
const minWindow = (s, t) => {
  const { length } = s;
  let { length: count } = t;

  const dict = {}; // 记录 t 中个字符的计数
  for (let i = 0; i < t.length; i += 1) {
    if (dict[t[i]] === undefined) dict[t[i]] = 0;
    dict[t[i]] += 1;
  }
  let minLen = Infinity;
  let start = 0;
  let end = 0;
  let left = 0;
  for (let right = 0; right < length; right += 1) {
    const ch = s[right];
    if (dict[ch] !== undefined) {
      dict[ch] -= 1;
      // 这里可能会被减少到负数，所以加个判断
      // 只有计数还大于等于0，才减少总共需要匹配的长度
      if (dict[ch] >= 0) count -= 1;
    }

    // 已经匹配到完整的 t 串, 接下里试着向右滑动 left
    while (count === 0) {
      if (right - left < minLen) {
        minLen = right - left;
        start = left;
        end = right;
      }
      const leftChar = s[left];
      if (dict[leftChar] !== undefined) {
        dict[leftChar] += 1;
        if (dict[leftChar] > 0) count += 1;
      }
      left += 1;
    }
  }

  return minLen === Infinity ? "" : s.substring(start, end + 1);
};

console.log(minWindow("cabwefgewcwaefgcf", "cae"));
//  console.log(minWindow("ADOBECODEBANC", "ABC"));
