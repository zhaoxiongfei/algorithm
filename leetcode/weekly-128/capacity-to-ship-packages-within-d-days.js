/**
 * @param {number[]} weights
 * @param {number} D
 * @return {number}
 */
const shipWithinDays = (weights, D) => {
  const { length } = weights;

  const check = n => {
    let d = 0;
    let i = 0;
    while (d < D) {
      let num = 0;
      while (i < length && (num += weights[i]) <= n) {
        i += 1;
      }
      d += 1;
    }
    return length <= i;
  };

  let hi = 50000 * 500;
  let lo = 0;
  while (lo < hi) {
    const mi = (lo + hi) >> 1;
    if (check(mi)) {
      hi = mi;
    } else {
      lo = mi + 1;
    }
  }

  return lo;
};

console.log(
  shipWithinDays(
    [
      280,
      493,
      361,
      13,
      451,
      463,
      62,
      426,
      146,
      208,
      198,
      191,
      18,
      394,
      277,
      175,
      63,
      115,
      134,
      334,
      474,
      116,
      165,
      420,
      23,
      403,
      32,
      111,
      256,
      417,
      487,
      264,
      328,
      116,
      42,
      371,
      145,
      458,
      331,
      343
    ],
    1
  )
);
console.log(shipWithinDays([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 5));
console.log(shipWithinDays([3, 2, 2, 4, 1, 4], 3));
console.log(shipWithinDays([1, 2, 3, 1, 1], 4));
