/**
 * @param {number} A
 * @param {number} B
 * @return {string}
 */
const strWithout3a3b = (A, B) => {
  const genStr = (ch1, ch2, n1, n2) => {
    let str = "";
    const p2 = [Math.ceil(n2 / 2) - 1, B - 1];
    let p1 = n1 - p2[0];
    console.log(p2, p1);
    while (1 < n2 && 0 < n1) {
      str += ch2.repeat(2);
      if (0 < p1) {
        str += ch1.repeat(Math.min(n1, 2));
        p1 -= 1;
        n1 -= Math.min(n1, 2);
      } else {
        str += ch1.repeat(1);
        n1 -= 1;
      }
      n2 -= 2;
    }

    if (n2) str += ch2.repeat(n2);
    if (n1) str += ch1;

    return str;
  };

  if (A < B) return genStr("a", "b", A, B);
  return genStr("b", "a", B, A);
};

console.log(strWithout3a3b(2, 5));
/*
console.log(strWithout3a3b(1, 1));
console.log(strWithout3a3b(1, 2));
console.log(strWithout3a3b(4, 1));
*/
