const dict = {
  2: ["a", "b", "c"],
  3: ["d", "e", "f"],
  4: ["g", "h", "i"],
  5: ["j", "k", "l"],
  6: ["m", "n", "o"],
  7: ["p", "q", "r", "s"],
  8: ["t", "u", "v"],
  9: ["w", "x", "y", "z"]
};

const letterCombinations = digits => {
  const string = digits.toString().split("");
  let combinations = [];
  while (string.length) {
    const ch = string.shift();
    const letters = dict[ch];
    if (!combinations.length) {
      // 组合表为空的情况
      combinations = [].concat(letters);
    } else {
      // 组合表不为空，则以此组合 letters 的每一个元素
      const old = combinations.slice();
      combinations.length = 0;
      for (let i = 0; i < old.length; i += 1) {
        for (let j = 0; j < letters.length; j += 1) {
          combinations.push(old[i] + letters[j]);
        }
      }
    }
  }

  return combinations;
};

console.log(letterCombinations(29));
console.log(letterCombinations(23));
