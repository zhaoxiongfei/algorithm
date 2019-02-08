// https://leetcode-cn.com/problems/flip-string-to-monotone-increasing/
// No 926. 将字符串翻转到单调递增

/**
 * @param {string} S
 * @return {number}
 */
const minFlipsMonoIncr = S => {
  let count = S.length;
  let i = 0;
  let j = count - 1;
  while (S[i] === "0") i += 1;
  while (S[j] === "1") j -= 1;

  const stats = [0, 0]; // 记录从 i -> j，0 和 1 的数量
  for (let x = i; x <= j; x += 1) stats[+S[x]] += 1;
  count = Math.min(...stats);

  const curr = [0, 0]; // 截止到当前，0和1出现的数量
  for (let x = i; x <= j; x += 1) {
    curr[+S[x]] += 1;
    const c = curr[1] + stats[0] - curr[0]; // 转换前面1需要的次数
    if (c < count) count = c;
  }

  return count;
};

console.log(minFlipsMonoIncr("00110"));
console.log(minFlipsMonoIncr("010110"));
console.log(minFlipsMonoIncr("00011000"));
