/**
 * @param {number[]} A
 * @param {number[][]} queries
 * @return {number[]}
 */
const sumEvenAfterQueries = (A, queries) => {
  const { length } = A;
  let sum = 0;
  for (let i = 0; i < length; i += 1) {
    if (A[i] % 2 === 0) sum += A[i];
  }

  console.log(sum);
  return queries.map(([val, i]) => {
    const tmp = A[i];
    A[i] += val;
    if (A[i] % 2 === 0) {
      if (tmp % 2) {
        sum += A[i];
      } else {
        sum += val;
      }
    }
    if (A[i] % 2 && tmp % 2 === 0) {
      sum -= tmp;
    }

    return sum;
  });
};

console.log(
  sumEvenAfterQueries([1, 2, 3, 4], [[1, 0], [-3, 1], [-4, 0], [2, 3]])
);
