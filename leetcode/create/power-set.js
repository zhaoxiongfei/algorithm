/**
  [Easy]

  This problem was asked by Google.

  The power set of a set is the set of all its subsets.
  Write a function that, given a set, generates its power set.

  For example,
  given the set {1, 2, 3},
  it should return {{}, {1}, {2}, {3}, {1, 2}, {1, 3}, {2, 3}, {1, 2, 3}}.

  You may also use a list or array to represent a set.
 */

const powerSet = list => {
  const { length } = list;
  const power = [[]]; // 空集

  const dfs = (l, pre, start) => {
    if (start === length) return;
    for (let i = start; i < length; i += 1) {
      const next = pre.concat(l[i]);
      power.push(next);
      dfs(l, next, i + 1);
    }
  };

  dfs(list, [], 0);
  return power;
};

const powerSet2 = list => {
  const { length } = list;
  const total = 2 ** (length - 1);
  const power = Array(total);

  for (let i = 0; i < total; i += 1) {
    const curr = [];
    for (let j = 0; j < length; j += 1) {
      if (i & (1 << j)) curr.push(list[j]);
    }
    power.push(curr);
  }

  return power;
};

const list = [
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
  19,
  20
];
console.time("1");
console.log(powerSet(list).length);
console.timeEnd("1");

console.time("2");
console.log(powerSet2(list).length);
console.timeEnd("2");
