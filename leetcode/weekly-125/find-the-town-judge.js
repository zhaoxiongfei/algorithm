/**
 * @param {number} N
 * @param {number[][]} trust
 * @return {number}
 */
const findJudge = (N, trust) => {
  if (trust.length === 0 && N === 1) return 1;
  const map1 = new Map();
  const map2 = new Map();
  for (const [a, b] of trust) {
    map1.set(b, (map1.get(b) || new Set()).add(a));
    map2.set(a, (map2.get(a) || new Set()).add(b));
  }

  if (map2.size < N - 1) return -1;
  const ls = [];
  for (const x of map1) {
    if (x[1].size === N - 1) {
      if (!map2.get(x[0])) ls.push(x[0]);
    }
  }

  if (ls.length !== 1) return -1;
  return ls[0];
};

console.log(findJudge(2, [[1, 2]]));
console.log(findJudge(3, [[1, 3], [2, 3]]));
console.log(findJudge(3, [[1, 3], [2, 3], [3, 1]]));
console.log(findJudge(3, [[1, 2], [2, 3]]));
console.log(findJudge(4, [[1, 3], [1, 4], [2, 3], [2, 4], [4, 3]]));
