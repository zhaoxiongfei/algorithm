// https://leetcode-cn.com/problems/heaters/
// No 475. 供暖器

/**
  冬季已经来临。 你的任务是设计一个有固定加热半径的供暖器向所有房屋供暖。

  现在，给出位于一条水平线上的房屋和供暖器的位置，
  找到可以覆盖所有房屋的最小加热半径。

  所以，你的输入将会是房屋和供暖器的位置。你将输出供暖器的最小加热半径。

  说明:

  给出的房屋和供暖器的数目是非负数且不会超过 25000。
  给出的房屋和供暖器的位置均是非负数且不会超过10^9。
  只要房屋位于供暖器的半径内(包括在边缘上)，它就可以得到供暖。
  所有供暖器都遵循你的半径标准，加热的半径也一样。
  示例 1:

  输入: [1,2,3],[2]
  输出: 1
  解释: 仅在位置2上有一个供暖器。
  如果我们将加热半径设为1，那么所有房屋就都能得到供暖。
  示例 2:

  输入: [1,2,3,4],[1,4]
  输出: 1
  解释: 在位置1, 4上有两个供暖器。我们需要将加热半径设为1，这样所有房屋就都能得到供暖。
 */

/**
 * @param {number[]} houses
 * @param {number[]} heaters
 * @return {number}
 */
const findRadius = (houses, heaters) => {
  houses.sort((a, b) => a - b);
  heaters.sort((a, b) => a - b);
  let min = 0;
  let i = 0;
  for (const h of houses) {
    if (heaters[i] === h) {
      // 铁定能取到暖，直接跳过
      i += 1;
      continue;
    }
    while (heaters[i] < h && i < heaters.length) i += 1;
    const pred = heaters[i - 1];
    const succ = heaters[i];
    if (!pred) {
      // 如果前面的不存在，则只能从后面的一个群暖
      min = Math.max(succ - h, min);
      continue;
    }

    if (!succ) {
      // 如果后面的不存在，则只能从前面的一个取暖
      min = Math.max(h - pred, min);
      continue;
    }

    min = Math.max(Math.min(succ - h, h - pred), min);
  }

  return min;
};

console.log(
  findRadius(
    [
      282475249,
      622650073,
      984943658,
      144108930,
      470211272,
      101027544,
      457850878,
      458777923
    ],
    [
      823564440,
      115438165,
      784484492,
      74243042,
      114807987,
      137522503,
      441282327,
      16531729,
      823378840,
      143542612
    ]
  )
);
console.log(findRadius([1, 5], [2]));
console.log(findRadius([1, 2, 3, 4, 5, 6], [2]));
console.log(findRadius([1, 2, 3, 4], [1, 4]));
