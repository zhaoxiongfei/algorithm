/**
 * @param {number[]} time
 * @return {number}
 */
const numPairsDivisibleBy60 = time => {
  let count = 0;
  for (let i = 0; i < time.length; i += 1) {
    for (let j = i + 1; j < time.length; j += 1) {
      if ((time[i] + time[j]) % 60 === 0) count += 1;
    }
  }

  return count;
};

console.log(numPairsDivisibleBy60([30, 20, 150, 100, 40]));
console.log(numPairsDivisibleBy60([60, 60, 60]));
