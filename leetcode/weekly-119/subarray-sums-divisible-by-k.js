/**
 * @param {number[]} A
 * @param {number} K
 * @return {number}
 */
const subarraysDivByK = (A, K) => {
  const { length } = A;

  let ans = 0;
  const map = new Map(); // 按模归组
  map.set(0, [0]);
  const sum = Array(length).fill(0);
  for (let i = 0; i < length; i += 1) {
    sum[i + 1] = sum[i] + A[i];
    let mod = sum[i + 1] % K;
    if (mod < 0) mod += K;
    const ls = map.get(mod) || [];
    if (ls.length === 0) map.set(mod, ls);
    ls.push(i + 1);
  }

  console.log(sum);
  console.log(map);
  for (const x of map) {
    const n = x[1].length;
    if (n < 2) continue;
    ans += (n * (n - 1)) / 2;
  }

  return ans;
};

console.log(subarraysDivByK([2, -2, 2, -4], 6));
// console.log(subarraysDivByK([1, -10, 5], 9));
console.log(subarraysDivByK([-1, 2, 9], 2));
// console.log(subarraysDivByK([5], 9));
console.log(subarraysDivByK([4, 5, 0, -2, -3, 1], 5));
