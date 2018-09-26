const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin
});

const init = str => str.split(" ");

/**
 * 思路：从数组里删掉两个不相同的字符，不影响绝对众数
 *
 */
const calc = str => {
  const array = init(str);
  const len = array.length;
  let count = 0;
  let m;
  for (let i = 0; i < len; i += 1) {
    if (count === 0) {
      m = array[i];
      count = 1;
    } else if (m !== array[i]) {
      count -= 1;
    } else {
      count += 1;
    }
  }

  return m;
};

rl.on("line", input => {
  console.log(calc(input.trim()));
});
