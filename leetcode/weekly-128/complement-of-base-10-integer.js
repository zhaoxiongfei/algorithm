/**
 * @param {number} N
 * @return {number}
 */
const bitwiseComplement = N => {
  return parseInt(
    Array.from(N.toString(2))
      .map(x => (x === "1" ? 0 : 1))
      .join(""),
    2
  );
};

console.log(bitwiseComplement(5));
console.log(bitwiseComplement(7));
console.log(bitwiseComplement(10));
