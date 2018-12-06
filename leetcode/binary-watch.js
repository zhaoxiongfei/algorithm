// https://leetcode-cn.com/problems/binary-watch/description/
// No 401. 二进制手表

/**
  二进制手表顶部有 4 个 LED 代表小时（0-11），底部的 6 个 LED 代表分钟（0-59）。

  每个 LED 代表一个 0 或 1，最低位在右侧。

  代表小时: [8]    [4]     [2]    [1]
  代表分钟: [32] [16] [8] [4] [2] [1]


  例如，上面的二进制手表读取 “3:25”。

  给定一个非负整数 n 代表当前 LED 亮着的数量，返回所有可能的时间。

  案例:

  输入: n = 1
  返回: ["1:00", "2:00", "4:00", "8:00", "0:01", "0:02", "0:04", "0:08", "0:16", "0:32"]


  注意事项:

  输出的顺序没有要求。
  小时不会以零开头，比如 “01:00” 是不允许的，应为 “1:00”。
  分钟必须由两位数组成，可能会以零开头，比如 “10:2” 是无效的，应为 “10:02”。
 */

const comb = (n, ns, start = 0, max = 60) => {
  if (n === 0) return [0];
  const list = [];
  for (let i = start; i <= ns.length - n; i += 1) {
    const x = ns[i];
    if (x > max) continue;
    if (n === 1) {
      list.push(x);
    } else {
      const remain = comb(n - 1, ns, i + 1, max - x);
      for (const nu of remain) list.push(nu + x);
    }
  }
  return list;
};

/**
 * @param {number} num
 * @return {string[]}
 */
const readBinaryWatch = num => {
  const hour = [8, 4, 2, 1];
  const minute = [32, 16, 8, 4, 2, 1];
  const ans = [];
  for (let h = 0; h <= num; h += 1) {
    const hs = comb(h, hour, 0, 11);
    const ms = comb(num - h, minute, 0, 59);
    if (hs.length === 0 || ms.length === 0) continue;
    for (const hx of hs) {
      for (let mx of ms) {
        if (mx === 0) {
          mx = "00";
        } else if (mx < 10) {
          mx = `0${mx}`;
        }
        ans.push(`${hx}:${mx}`);
      }
    }
  }

  return ans;
};

console.log(readBinaryWatch(2));
