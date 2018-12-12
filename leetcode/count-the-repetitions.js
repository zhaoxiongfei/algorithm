// https://leetcode-cn.com/problems/count-the-repetitions/
// No 466. 统计重复个数

/**
  定义由 n 个连接的字符串 s 组成字符串 S，
  即 S = [s,n]。例如，["abc", 3]=“abcabcabc”。

  另一方面，如果我们可以从 s2 中删除某些字符使其变为 s1，我们称字符串 s1 可以从字符串 s2 获得。
  例如，“abc” 可以根据我们的定义从 “abdbec” 获得，但不能从 “acbbe” 获得。

  现在给出两个非空字符串 s1 和 s2（每个最多 100 个字符长）和两个整数 0 ≤ n1 ≤ 106 和 1 ≤ n2 ≤ 106。
  现在考虑字符串 S1 和 S2，其中S1=[s1,n1]和S2=[s2,n2]。找出可以使[S2,M]从 S1 获得的最大整数 M。

  示例：

  输入：
  s1 ="acb",n1 = 4
  s2 ="ab",n2 = 2

  返回：
  2
 */

/**
 * @param {string} s1
 * @param {number} n1
 * @param {string} s2
 * @param {number} n2
 * @return {number}
 */
// 思路: 先找到 s1 和 s2 的关系，看看几个 s1 里有一个 s2, 或者一个 s1 能有几个 s2
// 该思路有问题遇到 aaa, aa 这种情况会有逻辑错误
const getMaxRepetitions = (s1, n1, s2, n2) => {
  const len1 = s1.length;
  const len2 = s2.length;
  let i = 0;
  let j = 0;

  let c1 = 0;
  let c2 = 0;
  let lastJ = 0;
  while (j < len2) {
    if (s1[i] === s2[j]) {
      j += 1;
    }
    i += 1;
    if (j === len2) {
      // s2 已经全部找到
      c2 += 1;
      if (c1 === 0) {
        // s1 还是第一个，有可能里面依然包含  s2, 所以s2 指针 j 归零
        j = 0;
      } else {
        // 多个 s1 构成一个 s2
        break;
      }
    }
    if (i === len1) {
      c1 += 1;
      if (c2 === 0) {
        // s2 还未组装完成，可能要 s1 从头再来
        if (j === lastJ) break;
        lastJ = j;
        i = 0;
      } else {
        break;
      }
    }
  }

  return (c2 * n1) / (c1 * n2);
};

// 思路: 暴力求解看看是否能通过, 第一版本无法通过，超时
// 做一些剪枝看看, 做剪枝后可以通过，但是性能还是很差, 跟别人的答案相差接近100倍，两个数量级
const getMaxRepetitions1 = (s1, n1, s2, n2) => {
  const len1 = s1.length;
  const len2 = s2.length;
  let i = 0;
  let j = 0;

  let c1 = 1;
  let c2 = 0;
  while (c1 <= n1) {
    if (s1[i] === s2[j]) {
      j += 1;
    }
    i += 1;
    if (j === len2) {
      c2 += 1;
      j = 0;
      const diff = len1 - i;
      if (diff + (n1 - c1) * len1 < len2 * n2) {
        // 剩余的不够一个完整的 S2 了
        return Math.floor((c2 * n1) / (c1 * n2));
      }
    }
    if (i === len1) {
      if (j === 0) {
        // 两个有最小公倍数, 相当于凑整了。
        return Math.floor((c2 * n1) / (c1 * n2));
      }
      c1 += 1;
      i = 0;
    }
  }

  return (c2 / n2) | 0;
};

// 思路三: 参考自 https://www.cnblogs.com/heisenberg-/p/6663587.html
// dp[i][k] = dp[i][k - 1] + dp[(i + dp[i][k - 1]) % len1][k - 1];
// dp[i][k]表示从字符串s1的第i位开始匹配2^k个s2串需要的长度
// 最后通过一个循环 累积最多可以匹配多少个s2串 除以n2下取整就是答案
const getMaxRepetitions2 = (s1, n1, s2, n2) => {
  const len1 = s1.length;
  const len2 = s2.length;
  const maxLen = Math.max(len1, len2);
  const dp = Array(maxLen + 1);
  for (let i = 0; i <= maxLen; i += 1) dp[i] = Array(30).fill(0);

  let l1 = 0;
  let l2 = 0;
  for (let i = 0; i < len1; i += 1) {
    l1 = i;
    l2 = 0;
    while (l2 < len2) {
      while (l1 < n1 * len1 && s1[l1 % len1] !== s2[l2]) l1 += 1;
      l1 += 1;
      l2 += 1;
    }
    dp[i][0] = l1 - i;
  }

  for (let k = 1; k < 30; k += 1) {
    for (let i = 0; i < len1; i += 1) {
      dp[i][k] = dp[i][k - 1] + dp[(i + dp[i][k - 1]) % len1][k - 1];
    }
  }

  let total = 0;
  let start = 0;
  for (let k = 29; k >= 0; k -= 1) {
    while (start + dp[start % len1][k] <= n1 * len1) {
      total += 1 << k;
      start += dp[start % len1][k];
    }
  }

  return Math.floor(total / n2);
};

console.log(getMaxRepetitions2("acb", 4, "ab", 2));
console.log(
  getMaxRepetitions2(
    "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    1000000,
    "a",
    1000000
  )
);

console.log(
  getMaxRepetitions2(
    "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    1000000,
    "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    1000000
  )
);
console.log(
  getMaxRepetitions2(
    "asfdfewfwfwefwefsdfwefhrthtyjhtyjtyjhfghrthrthfgrthtrhdfgergegrtgrtgrgderuykyukhvdewrertiuyuiyujhgfg",
    100000,
    "asdwesdfasdaf",
    100
  )
);
console.log(getMaxRepetitions("acb", 4, "ab", 2));
console.log(getMaxRepetitions1("aaa", 3, "aa", 1));
