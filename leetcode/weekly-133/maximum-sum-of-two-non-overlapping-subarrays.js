/**
 * @param {number[]} A
 * @param {number} L
 * @param {number} M
 * @return {number}
 */
const maxSumTwoNoOverlap = (A, L, M) => {
  const { length } = A;
  let max = 0;
  const dp1 = Array(length + L).fill(0);
  const dp2 = Array(length + M).fill(0);

  for (let i = 0; i < L; i += 1) dp1[L - 1] += A[i];
  for (let i = 0; i < M; i += 1) dp2[M - 1] += A[i];

  for (let i = L; i < length; i += 1) dp1[i] = dp1[i - 1] + A[i] - A[i - L];
  for (let i = M; i < length; i += 1) dp2[i] = dp2[i - 1] + A[i] - A[i - M];

  for (let i = 0; i <= length; i += 1) {
    max = Math.max(
      max,
      Math.max(...dp1.slice(0, i + 1)) + Math.max(...dp2.slice(M + i))
    );
    max = Math.max(
      max,
      Math.max(...dp2.slice(0, i + 1)) + Math.max(...dp1.slice(L + i))
    );
  }

  console.log(dp1);
  console.log(dp2);
  return max;
};

console.log(maxSumTwoNoOverlap([0, 6, 5, 2, 2, 5, 1, 9, 4], 1, 2));
console.log(maxSumTwoNoOverlap([8, 20, 6, 2, 20, 17, 6, 3, 20, 8, 12], 5, 4));
/*
console.log(maxSumTwoNoOverlap([1, 0, 3], 1, 2));
console.log(maxSumTwoNoOverlap([3, 8, 1, 3, 2, 1, 8, 9, 0], 3, 2));
console.log(maxSumTwoNoOverlap([2, 1, 5, 6, 0, 9, 5, 0, 3, 8], 4, 3));
*/
