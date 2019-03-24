/**
 * @param {number[]} A
 * @return {number}
 */

const maxScoreSightseeingPair = A => {
  const { length } = A;
  let curr = A[length - 1] - (length - 1);

  let ans = 0;
  for (let i = length - 2; 0 <= i; i -= 1) {
    ans = Math.max(ans, curr + A[i] + i);
    curr = Math.max(curr, A[i] - i);
  }

  return ans;
};

const maxScoreSightseeingPair2 = A => {
  const { length } = A;
  let best = -Infinity;
  let most = -Infinity;
  for (let i = 0; i < length; i += 1) {
    best = Math.max(best, A[i] - i + most);
    most = Math.max(most, A[i] + i);
  }

  return best;
};

console.log(
  maxScoreSightseeingPair([
    30,
    13,
    28,
    32,
    16,
    8,
    11,
    78,
    83,
    5,
    22,
    93,
    61,
    60,
    100,
    8,
    6,
    48,
    87,
    43,
    41,
    86,
    93,
    5,
    19,
    29,
    59,
    31,
    7,
    51,
    99,
    47,
    40,
    24,
    20,
    98,
    41,
    42,
    81,
    92,
    55,
    85,
    51,
    92,
    84,
    21,
    84,
    92,
    1,
    73,
    93,
    51,
    44,
    27,
    23,
    54,
    32,
    57,
    60,
    9,
    69,
    14,
    28,
    86,
    15,
    92,
    47,
    63,
    12,
    99,
    54,
    6,
    16,
    52,
    28,
    86,
    38,
    73,
    16,
    52,
    37,
    30,
    84,
    81,
    46,
    97,
    84,
    17,
    21,
    14,
    52,
    19,
    74,
    20,
    20,
    56,
    89,
    7,
    34,
    21
  ])
);
console.log(maxScoreSightseeingPair2([5, 7, 4, 10, 4]));
console.log(maxScoreSightseeingPair([6, 3, 7, 4, 7, 6, 6, 4, 9]));
console.log(maxScoreSightseeingPair2([7, 2, 6, 6, 9, 4, 3]));
console.log(maxScoreSightseeingPair([4, 7, 5, 8]));
console.log(maxScoreSightseeingPair2([8, 1, 5, 2, 6]));
