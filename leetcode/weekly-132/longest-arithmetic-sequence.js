/**
 * @param {number[]} A
 * @return {number}
 */
const longestArithSeqLength = A => {
  let max = 0;

  const map = new Map();
  for (let i = 0; i < A.length; i += 1) {
    const ns = map.get(A[i]) || new Set();
    if (ns.size === 0) map.set(A[i], ns);
    ns.add(i);
  }

  for (let i = 0; i < A.length - max; i += 1) {
    for (let j = i + 1; j < A.length; j += 1) {
      const diff = A[j] - A[i];
      let count = 2;
      let next = A[j] + diff;
      for (let k = j + 1; k < A.length; k += 1) {
        if (A[k] === next) {
          count += 1;
          next = A[k] + diff;
        }
      }
      if (max < count) max = count;
    }
  }

  return max;
};

console.log(longestArithSeqLength([3, 6, 9, 12]));
console.log(longestArithSeqLength([9, 4, 7, 2, 10]));
console.log(longestArithSeqLength([20, 1, 15, 3, 10, 5, 8]));
