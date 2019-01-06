/**
 * @param {number[]} A
 * @return {number[]}
 */
const pancakeSort = A => {
  const ans = [];

  const sorted = A.slice().sort((a, b) => a - b);

  const flip = n => {
    let i = 0;
    let j = n - 1;
    while (i < j) {
      const t = A[i];
      A[i] = A[j];
      A[j] = t;
      i += 1;
      j -= 1;
    }
  };

  while (sorted.length) {
    const max = sorted.pop();
    const index = A.indexOf(max);
    if (index !== sorted.length) {
      if (index !== 0) {
        flip(index + 1);
        ans.push(index + 1);
      }
      flip(sorted.length + 1);
      ans.push(sorted.length + 1);
    }
  }

  return ans;
};

console.log(pancakeSort([3, 2, 4, 1]));
