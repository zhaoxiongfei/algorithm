// https://leetcode-cn.com/problems/count-and-say/description/

const countAndSay = n => {
  let str = "1";
  let count = 1;
  while (count < n) {
    const pre = str;
    str = "";
    const { length } = pre;
    let num = 1; // 相同数字计数
    for (let i = 0; i < length; i += 1) {
      // 比较下一个字符和当前字符
      if (pre[i] === pre[i + 1]) {
        // 相同: 则计数加一
        num += 1;
      } else {
        // 不同: 则开始读数
        str += `${num}${pre[i]}`;
        num = 1;
      }
    }

    count += 1;
  }
  return str;
};

console.log(countAndSay(4));
console.log(countAndSay(5));
console.log(countAndSay(6));
console.log(countAndSay(7));
console.log(countAndSay(8));
