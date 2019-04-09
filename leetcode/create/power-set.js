/**
  [Easy]

  This problem was asked by Google.

  The power set of a set is the set of all its subsets. Write a function that, given a set, generates its power set.

  For example, given the set {1, 2, 3}, it should return {{}, {1}, {2}, {3}, {1, 2}, {1, 3}, {2, 3}, {1, 2, 3}}.

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

console.log(powerSet([1, 2, 3, 4]));
