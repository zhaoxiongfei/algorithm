const combine = (m, n) => {
  let divisor = m;
  let denominator = n;
  for (let i = 1; i < n; i += 1) {
    divisor *= m - i;
    denominator *= n - i;
  }
  return divisor / denominator;
};

/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
const uniquePaths = (m, n) => {
  const r = m - 1;
  const d = n - 1;
  const steps = r + d;
  if (r === 0 || d === 0) return 1;
  if (steps === 1) return 1;
  // 其实计算的就是 C(steps, r)
  return combine(steps, r);
};

console.log(uniquePaths(1, 10));
