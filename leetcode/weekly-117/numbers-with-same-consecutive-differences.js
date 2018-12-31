/**
 * @param {number} N
 * @param {number} K
 * @return {number[]}
 */
const numsSameConsecDiff = (N, K) => {
  const ans = [];

  let first = N === 1 ? 0 : 1;
  while (first <= 9) {
    const items = [[first]];
    for (let i = 1; i < N; i += 1) {
      const { length } = items;
      for (let j = 0; j < length; j += 1) {
        const item = items[j];
        if (item[i - 1] + K < 10) {
          item.push(item[i - 1] + K);
        }
        if (0 <= item[i - 1] - K) {
          if (10 <= item[i - 1] + K) {
            item.push(item[i - 1] - K);
          } else if (item[i - 1] !== item[i - 1] - K) {
            const newItem = item.slice(0, -1);
            newItem.push(item[i - 1] - K);
            items.push(newItem);
          }
        }
      }
    }
    for (const item of items) {
      if (item.length === N) ans.push(+item.join(""));
    }
    first += 1;
  }

  return ans;
};

console.log(numsSameConsecDiff(2, 0));
console.log(numsSameConsecDiff(1, 2));
console.log(numsSameConsecDiff(3, 7));
console.log(numsSameConsecDiff(2, 1));
