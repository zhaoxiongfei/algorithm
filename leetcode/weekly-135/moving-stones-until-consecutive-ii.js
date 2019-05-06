/**
 * @param {number[]} stones
 * @return {number[]}
 */
const numMovesStonesII = stones => {
  stones.sort((a, b) => a - b);
  const { length: n } = stones;
  let least = Infinity;
  let most = -Infinity;

  for (let i = 0, j = 0; i < n; i += 1) {
    while (j + 1 < n && stones[j + 1] - stones[i] < n) j += 1;

    let now = n - (j - i + 1);
    if (j - i === n - 2 && stones[j] - stones[i] === j - i) now += 1;

    least = Math.min(least, now);
  }

  most =
    Math.max(stones[n - 1] - stones[1], stones[n - 2] - stones[0]) - (n - 2);

  return [least, most];
};

console.log(numMovesStonesII([7, 4, 9]));
console.log(numMovesStonesII([6, 5, 4, 3, 10]));
console.log(numMovesStonesII([100, 101, 104, 102, 103]));
