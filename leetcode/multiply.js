/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
// 按照小学数学的列式算法，逐个相乘之后相加
const multiply = (num1, num2) => {
  if (num1 === "0" || num2 === "0") return "0";
  const len1 = num1.length;
  const len2 = num2.length;

  // 存放最终结果，预先申请好空间
  const res = [];
  res.length = len1 + len2;
  res.fill(0);

  // 循环乘数
  for (let i = len2 - 1; i >= 0; i -= 1) {
    const n2 = num2[i];
    // 循环被乘数
    for (let j = len1 - 1; j >= 0; j -= 1) {
      const pos = i + 1 + (j + 1) - 1;
      const n1 = num1[j];
      const product = n1 * n2;
      let high = (product / 10) | 0;
      const low = product % 10;
      if (low) {
        res[pos] += low;
        if (res[pos] > 9) {
          res[pos] -= 10;
          high += 1;
        }
      }
      if (high) {
        let p = pos - 1;
        res[p] += high;
        while (p >= 0) {
          if (res[p] < 10) break;
          res[p] -= 10;
          res[p - 1] += 1;
          p -= 1;
        }
      }
    }
  }

  console.log(res);
  return res.join("").replace(/^0+/, "");
};

console.log(multiply("123456789", "987654321"));
// console.log(multiply("0", "1613123283423423"));
// console.log(multiply("1500000000000", "1613123283423423"));
