const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin
});

const init = str => str.split(" ").map(x => +x || 0);

/**
 * 思路：按位整理
 */
const calc = str => {
  const a = init(`0 ${str}`);
  let len = a.length - 1;

  let i = 1;
  while (i <= len) {
    if (a[i] === i) {
      i += 1;
    } else if (a[i] < i || a[i] > len || a[i] === a[a[i]]) {
      a[i] = a[len];
      len -= 1;
    } else {
      // if (a[i] > i)
      let tmp = a[a[i]];
      a[a[i]] = a[i];
      a[i] = tmp;
    }
    // console.log("a = %s, i = %d", a, i);
  }
  return i;
};

// 计算数组缺失的第一个正整数
rl.on("line", input => {
  console.log(calc(input.trim()));
});
