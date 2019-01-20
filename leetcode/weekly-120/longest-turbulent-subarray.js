/**
 * @param {number[]} A
 * @return {number}
 */
const maxTurbulenceSize = A => {
  const { length } = A;
  let max = 1;
  let i = 0;
  while (i < length - 1) {
    let initGT = A[i] < A[i + 1];
    const diff = (i1, i2) => {
      if (A[i1] === A[i2]) return false;
      if (initGT) {
        if (A[i1] < A[i2]) {
          initGT = !initGT;
          return true;
        }
        return false;
      }
      if (A[i2] < A[i1]) {
        initGT = !initGT;
        return true;
      }
      return false;
    };
    let j = i;
    while (diff(j, j + 1)) j += 1;

    if (max < j - i + 1) max = j - i + 1;
    if (i === j) {
      i += 1;
    } else if (i === j - 1) {
      i = j;
    } else {
      i = j - 1;
    }
  }

  return max;
};

console.log(maxTurbulenceSize([9, 4, 2, 10, 7, 8, 8, 1, 9]));
console.log(maxTurbulenceSize([4, 8, 12, 16]));
console.log(maxTurbulenceSize([100]));
