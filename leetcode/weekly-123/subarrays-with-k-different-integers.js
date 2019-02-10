/**
 * @param {number[]} A
 * @param {number} K
 * @return {number}
 */
const subarraysWithKDistinct = (A, K) => {
  const { length } = A;
  const map = new Map();
  let count = 0;
  let j = 0;

  while (map.size < K && j < length) {
    map.set(A[j], (map.get(A[j]) || 0) + 1);
    j += 1;
  }

  if (map.size < K) return 0;

  for (let i = 0; i < length; i += 1) {
    if (map.size === K) {
      let k = j - 1;
      while (k < length && map.has(A[k])) {
        k += 1;
        count += 1;
      }
    }
    const v = map.get(A[i]);
    if (v === 1) {
      map.delete(A[i]);
    } else {
      map.set(A[i], v - 1);
    }

    while (map.size < K && j < length) {
      map.set(A[j], (map.get(A[j]) || 0) + 1);
      j += 1;
    }
  }

  return count;
};

console.log(subarraysWithKDistinct([1, 2, 1, 2, 3], 2));
console.log(subarraysWithKDistinct([1, 2, 1, 3, 4], 3));
