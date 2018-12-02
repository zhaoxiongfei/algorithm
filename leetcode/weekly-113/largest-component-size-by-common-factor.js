// https://leetcode-cn.com/contest/weekly-contest-113/problems/largest-component-size-by-common-factor/
const gcd = (a, b) => {
  let r;
  while (b !== 0) {
    r = a % b;
    a = b;
    b = r;
  }
  return a;
};

/**
 * @param {number[]} A
 * @return {number}
 */
const largestComponentSize = A => {
  const { length } = A;
  const map = {};
  for (let i = 0; i < length; i += 1) map[A[i]] = [];
  for (let i = 0; i < length; i += 1) {
    for (let j = i + 1; j < length; j += 1) {
      if (gcd(A[i], A[j]) > 1) {
        map[A[i]].push(A[j]);
        map[A[j]].push(A[i]);
      }
    }
  }

  const collect = (start, checked, container) => {
    if (checked.has(start)) return;
    container.add(start);
    checked.add(start);
    for (const n of map[start]) collect(n, checked, container);
  };

  const checked = new Set();
  let max = 0;
  for (const start of A) {
    const container = new Set();
    collect(start, checked, container);
    if (container.size > max) max = container.size;
    if (container.size >= length / 2) break;
  }

  return max;
};

const nums = new Set();
for (let i = 0; i < 20000; i += 1) {
  nums.add((Math.random() * 100000) | 0);
}
// console.log(largestComponentSize(Array.from(nums)));
console.log(largestComponentSize([65, 35, 43, 76, 15, 11, 81, 22, 55, 92, 31]));
console.log(largestComponentSize([20, 50, 9, 63]));
console.log(gcd(4, 6));
console.log(
  largestComponentSize([
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19
  ])
);
console.log(largestComponentSize([1, 2, 3, 4, 5, 6, 7, 8, 9]));
console.log(largestComponentSize([4, 6, 15, 35]));
console.log(largestComponentSize([2, 3, 6, 7, 4, 12, 21, 39]));
