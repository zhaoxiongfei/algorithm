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

const dict2 = {
  I: 1,
  IV: 4,
  V: 5,
  IX: 9,
  X: 10,
  XL: 40,
  L: 50,
  XC: 90,
  C: 100,
  CD: 400,
  D: 500,
  CM: 900,
  M: 1000
};

const romanToInt = str => {
  const { length } = str;
  let num = 0;
  let i = 0;
  while (i < length) {
    const curr = str[i];
    const post = str[i + 1];
    const v = dict2[`${curr}${post}`];
    if (v) {
      num += v;
      i += 2;
    } else {
      num += dict2[curr];
      i += 1;
    }
  }

  return num;
};

// 改良后的，从后往前查
const romanToInt2 = str => {
  const { length } = str;
  let num = 0;
  let i = length;
  const map = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000
  };
  while (i) {
    i -= 1;
    const curr = map[str[i]];
    const pre = map[str[i - 1]];

    num += curr;
    if (pre < curr) {
      num -= pre;
      i -= 1;
    }
  }

  return num;
};

console.log(intToRoman(1994));
console.log(intToRoman(3));
console.log(intToRoman(126543));

console.log(romanToInt(intToRoman(1994)));
console.log(romanToInt(intToRoman(3)));
console.log(romanToInt(intToRoman(126543)));
console.log(romanToInt("MCDLXXVI"));

console.log(romanToInt2(intToRoman(1994)));
console.log(romanToInt2(intToRoman(3)));
console.log(romanToInt2(intToRoman(126543)));
console.log(romanToInt2("MCDLXXVI"));
