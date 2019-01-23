// https://leetcode-cn.com/problems/boats-to-save-people/
// No 881. 救生艇

/**
  第 i 个人的体重为 people[i]，每艘船可以承载的最大重量为 limit。

  每艘船最多可同时载两人，但条件是这些人的重量之和最多为 limit。

  返回载到每一个人所需的最小船数。(保证每个人都能被船载)。

  示例 1：

  输入：people = [1,2], limit = 3
  输出：1
  解释：1 艘船载 (1, 2)
  示例 2：

  输入：people = [3,2,2,1], limit = 3
  输出：3
  解释：3 艘船分别载 (1, 2), (2) 和 (3)
  示例 3：

  输入：people = [3,5,3,4], limit = 5
  输出：4
  解释：4 艘船分别载 (3), (3), (4), (5)
  提示：

  1 <= people.length <= 50000
  1 <= people[i] <= limit <= 30000
 */

/**
 * @param {number[]} people
 * @param {number} limit
 * @return {number}
 */
// 思路: 利用栈来做
const numRescueBoats1 = (people, limit) => {
  people.sort((a, b) => a - b);

  const stack = [];
  let count = 0;
  while (people.length) {
    const one = people.pop();
    const diff = limit - one;
    while (people.length && people[0] <= diff) stack.push(people.shift());
    stack.pop();
    count += 1;
    if (people.length === 0 && stack.length) {
      count += Math.ceil(stack.length / 2);
      break;
    }
  }

  return count;
};

// 思路: 同样的思路，用双指针来做
const numRescueBoats = (people, limit) => {
  people.sort((a, b) => a - b);
  let i = 0;
  let j = people.length - 1;
  let res = 0;
  while (i <= j) {
    if (i === j) {
      res += 1;
      i += 1;
    } else if (people[i] + people[j] <= limit) {
      res += 1;
      i += 1;
      j -= 1;
    } else {
      res += 1;
      j -= 1;
    }
  }
  return res;
};

console.log(numRescueBoats([1, 2, 9, 10], 7));
console.log(numRescueBoats([1, 5, 3, 5], 7));
console.log(numRescueBoats([5, 1, 7, 4, 2, 4], 7));
console.log(numRescueBoats1([1, 2], 3));
console.log(numRescueBoats([3, 2, 2, 1], 3));
console.log(numRescueBoats([3, 5, 3, 4], 5));
