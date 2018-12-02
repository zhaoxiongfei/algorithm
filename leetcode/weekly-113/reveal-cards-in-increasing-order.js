// https://leetcode-cn.com/contest/weekly-contest-113/problems/reveal-cards-in-increasing-order/

/**
 * @param {number[]} deck
 * @return {number[]}
 */
// 思路: 反其道而行之
const deckRevealedIncreasing = deck => {
  const { length } = deck;
  deck.sort((a, b) => b - a);
  const ans = [deck[0]];

  for (let i = 1; i < length; i += 1) {
    const last = ans.pop();
    ans.unshift(last);
    ans.unshift(deck[i]);
  }

  return ans;
};

console.log(deckRevealedIncreasing([17, 13, 11, 2, 3, 5, 7]));
