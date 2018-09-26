const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin
});

const init = str => str.split(" ");

/**
 * 思路：从数组里删掉三个不相同的字符，不影响绝对众数
 */
const calc = str => {
  const array = init(str);
  const len = array.length;
  let cm = 0;
  let cn = 0;
  let m, n;
  for (let i = 0; i < len; i += 1) {
    if (cm === 0) {
      m = array[i];
      cm = 1;
    } else if (cn === 0) {
      n = array[i];
      cn = 1;
    } else if (m === array[i]) {
      cm += 1;
    } else if (n === array[i]) {
      cn += 1;
    } else {
      cm -= 1;
      cn -= 1;
    }
    // console.log("i = %d\nm = %s, cm = %d\nn = %s, cn = %d", i, m, cn, n, cn);
  }

  const ret = [];
  cm = cn = 0;
  const threshold = len / 3;
  for (let i = 0; i < len; i += 1) {
    if (array[i] === m) {
      cm += 1;
    } else if (array[i] === n) {
      cn += 1;
    }
  }
  if (cm > threshold) ret.push(m);
  if (cn > threshold) ret.push(n);
  return ret.join(" ");
};

// 计算出现次数超过 N/3 的绝对众数
rl.on("line", input => {
  console.log(calc(input.trim()));
});
