/**
 * @param {string} S
 * @param {number} N
 * @return {boolean}
 */
const queryString = (S, N) => {
  let i = 1;
  while (i <= N) {
    if (!S.includes(i.toString(2))) return false;
    i += 1;
  }

  return true;
};

console.log(queryString("0110", 3));
console.log(queryString("0110", 4));
console.log(queryString("0110", 4));
