const getGCD = (x, y) => (y ? getGCD(y, x % y) : x);

const fraction = s => {
  const [i, f] = s.split(".");
  if (!f) return [+i, 1];

  const ff = ["", ""];
  let flag = 0;
  for (const ch of f) {
    if (ch === "(") {
      flag = 1;
    } else if (ch !== ")") {
      ff[flag] += ch;
    }
  }

  let d; // 分母
  let m; // 分子
  if (!ff[1]) {
    // 没有循环部分
    d = 10 ** ff[0].length;
    m = +ff[0];
  } else if (!ff[0]) {
    // 没有非循环部分
    d = +"9".repeat(ff[1].length);
    m = +ff[1];
  } else {
    // 既有非循环部分，又有循环部分
    d = +`${"9".repeat(ff[1].length)}${"0".repeat(ff[0].length)}`;
    m = +`${ff[0]}${ff[1]}` - +ff[0];
  }

  const gcd = getGCD(d, m);

  m /= gcd;
  d /= gcd;
  return [m + i * d, d];
};

/**
 * @param {string} S
 * @param {string} T
 * @return {boolean}
 */
const isRationalEqual = (S, T) => {
  const [m1, d1] = fraction(S);
  const [m2, d2] = fraction(T);
  return m1 === m2 && d1 === d2;
};

console.log(isRationalEqual("0.(52)", "0.5(25)"));
console.log(isRationalEqual("0.9(9)", "1."));
console.log(isRationalEqual("0.16666(6)", "0.16(66)"));
