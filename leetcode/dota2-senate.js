// https://leetcode-cn.com/problems/dota2-senate/
// No 649. Dota2 参议院

/**
 * @param {string} senate
 * @return {string}
 */
const predictPartyVictory = senate => {
  const { length } = senate;
  const list = Array.from(senate);

  let flag = true;
  while (flag) {
    for (let i = 0; i < length; i += 1) {
      if (list[i] === "-") continue;
      flag = false;
      for (let j = 0; j < length; j += 1) {
        const o = (i + 1 + j) % length;
        if (list[o] !== "-" && list[i] !== list[o]) {
          list[o] = "-";
          flag = true;
          break;
        }
      }
      if (flag === false) {
        if (list[i] === "R") return "Radiant";
        return "Dire";
      }
    }
  }
  return "Dire";
};

console.log(predictPartyVictory("RD"));
console.log(predictPartyVictory("RDD"));
console.log(predictPartyVictory("DDRRRR"));
