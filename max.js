const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin
});

const init = str => str.split(" ").map(x => +x || 0);

const getMid = (left, right) => Math.floor((left + right) / 2);

/**
 * 思路：高原数组、折半查找，二分法思想
 */
const calc = str => {
  const array = init(str);
  const len = array.length;
  let left = 0;
  let right = len - 1;
  while (left < right) {
    let mid = getMid(left, right);
    if (array[mid] > array[mid + 1]) {
      right = mid;
    } else {
      left = mid + 1;
    }
    // console.log("left = %d, right = %d, mid = %d", left, right, mid);
  }

  return array[left];
};

// 计算数组的一个极大值
rl.on("line", input => {
  console.log(calc(input.trim()));
});
