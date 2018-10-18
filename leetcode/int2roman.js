const dict = {
  1: "I",
  4: "IV",
  5: "V",
  9: "IX",
  10: "X",
  40: "XL",
  50: "L",
  90: "XC",
  100: "C",
  400: "CD",
  500: "D",
  900: "CM",
  1000: "M"
};

const order = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];

const intToRoman = num => {
  let left = num; // 记录还剩下多少
  let value = ""; // 转换后的罗马数字
  const ltLeft = x => x <= left;
  while (left > 0) {
    // 找比 left 小的最大值，因为已经做了降序排列，所以第一个就是
    const max = order.find(ltLeft);
    value += dict[max];
    left -= max;
  }

  return value;
};

console.log(intToRoman(1994));
console.log(intToRoman(3));
console.log(intToRoman(126543));
