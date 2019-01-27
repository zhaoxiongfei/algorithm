/**
 * @param {number} A
 * @param {number} B
 * @return {string}
 */
const strWithout3a3b = (A, B) => {
  const genStr = (ch1, ch2, n1, n2) => {
    const str = [];
    while (n1 || n2) {
      const mayBeL1 = n1 === n2 ? 2 : 1;
      const l2 = Math.min(n2, 2);
      n2 -= l2;
      str.push(ch2.repeat(l2));
      const l1 = Math.min(n1, mayBeL1);
      str.push(ch1.repeat(l1));
      n1 -= l1;
    }

    return str.join("");
  };

  if (A < B) return genStr("a", "b", A, B);
  return genStr("b", "a", B, A);
};

console.log(strWithout3a3b(2, 5));
console.log(strWithout3a3b(1, 1));
console.log(strWithout3a3b(1, 2));
console.log(strWithout3a3b(4, 1));
