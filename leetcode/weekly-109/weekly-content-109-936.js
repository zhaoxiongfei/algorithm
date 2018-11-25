// https://leetcode-cn.com/contest/weekly-contest-109/problems/stamping-the-sequence/

const getIndexes = (stamp, target) => {
  const { length } = target;
  const { length: len } = stamp;
  const stack = [];

  let left = 0; // 左侧最多偏移量, 一开始是0
  let start = 0;
  let i = 0;
  while (start < length) {
    if (target[start] !== stamp[start]) {
      i = 0;
      while (i < left && target[start] !== stamp[start + i]) i += 1;
    }
    start += 1;
  }
};

/**
 * @param {string} stamp
 * @param {string} target
 * @return {number[]}
 */
const movesToStamp = (stamp, target) => {
  const stack = [];
  const { length } = target;
  const { length: len } = stamp;
  if (length < len) return [];
  if (stamp === target) return [0];

  const remain = target.split(stamp);
  console.log(remain);
  if (remain.length < 2) return [];
  let start = 0;
  for (let i = 0; i < remain.length; i += 1) {
    const str = remain[i];
    if (str) {
      const sub = getIndexes(
        stamp,
        str,
        start === 0,
        length === start + str.length
      );
      if (sub.length === 0) return [];
      while (sub.length) stack.push(start + sub.pop());
    }
    if (i > 1) stack.push(start - len);
    start = start + str.length + len;
  }

  if (stack.length > 10 * len) return [];
  return stack;
};

// console.log(movesToStamp("abc", "ababc"));
// console.log(movesToStamp("abca", "aabcaca"));
// console.log(movesToStamp("h", "hhhhh"));
console.log(movesToStamp("oz", "ooozzozzoozz"));
