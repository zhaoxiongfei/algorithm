/**
 * @param {number} N
 * @return {number}
 */
const numDupDigitsAtMostN2 = N => {
  let count = 0;
  let i = 11;
  while (i <= N) {
    const s = i.toString();
    if (new Set(Array.from(s)).size < s.length) count += 1;
    i += 1;
  }

  return count;
};

const numDupDigitsAtMostN = N => {
  const count = (mask, num) => {
    if (N < num) return 0;

    let ret = 1;
    for (let nd = num === 0 ? 1 : 0; nd < 10; nd += 1) {
      if (((mask >> nd) & 1) === 0) {
        ret += count(mask | (1 << nd), num * 10 + nd);
      }
    }

    return ret;
  };

  return N + 1 - count(0, 0);
};

console.log(numDupDigitsAtMostN(1000000000));
console.log(numDupDigitsAtMostN(100));
console.log(numDupDigitsAtMostN2(100));
console.log(numDupDigitsAtMostN(20));
console.log(numDupDigitsAtMostN2(20));
console.log(numDupDigitsAtMostN(1000));
console.log(numDupDigitsAtMostN2(1000));
