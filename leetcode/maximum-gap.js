// https://leetcode-cn.com/problems/cc/description/
// No 164. 最大间距

/**
  给定一个无序的数组，找出数组在排序之后，相邻元素之间最大的差值。

  如果数组元素个数小于 2，则返回 0。

  示例 1:

  输入: [3,6,9,1]
  输出: 3
  解释: 排序后的数组是 [1,3,6,9], 其中相邻元素 (3,6) 和 (6,9) 之间都存在最大差值 3。
  示例 2:

  输入: [10]
  输出: 0
  解释: 数组元素个数小于 2，因此返回 0。
  说明:

  你可以假设数组中所有元素都是非负整数，且数值在 32 位有符号整数范围内。
  请尝试在线性时间复杂度和空间复杂度的条件下解决此问题。
 */

/**
 * @param {number[]} nums
 * @return {number}
 */
// 思路: 这个题的最大难度在于要求时间复杂度是 O(n)
// 参考了网上的文章，采用桶排序
// 循环依次把数字放入对应的桶内
const maximumGap1 = nums => {
  const { length } = nums;
  if (length < 2) return 0;
  if (length === 2) return Math.abs(nums[1] - nums[0]);
  const bucket = [];
  for (const num of nums) {
    bucket[num] = true;
  }

  let gap = 0;
  let last = -1;
  bucket.forEach((x, i) => {
    if (last !== -1) {
      gap = Math.max(gap, i - last);
    }
    last = i;
  });

  return gap;
};

// 思路二: 上面的思路遇到数字特别大的时候直接爆掉了内存, 想想看申请一个长度为42亿的数组是什么概念
// 所以换思路
const maximumGap = nums => {
  const { length } = nums;
  if (length < 2) return 0;
  if (length === 2) return Math.abs(nums[1] - nums[0]);

  let min = nums[0];
  let max = nums[0];
  for (const num of nums) {
    if (num > max) max = num;
    if (num < min) min = num;
  }
  const set = new Set(nums);
  let gap = 0;
  let last = min;
  for (let start = min; start <= max; start += 1) {
    if (!set.has(start)) continue;
    gap = Math.max(gap, start - last);
    last = start;
  }

  return gap;
};

const maximumGap2 = nums => {
  const { length } = nums;
  if (length < 2) return 0;
  if (length === 2) return Math.abs(nums[1] - nums[0]);

  nums.sort((a, b) => a - b);
  let gap = 0;
  for (let i = 1; i < length; i += 1) {
    gap = Math.max(gap, nums[i] - nums[i - 1]);
  }

  return gap;
};

/**
 * @param {number[]} nums
 * @return {number}
 */
// 参考leetcode网友，利用了桶排序，说实话，不理解原理
const maximumGap3 = nums => {
  const { length } = nums;
  if (length < 2) return 0;
  let max = nums[0];
  let min = nums[0];
  for (let i = 1; i < length; i += 1) {
    max = Math.max(max, nums[i]);
    min = Math.min(min, nums[i]);
  }

  const gap = Math.floor((max - min) / length) + 1;
  const bucketMax = new Array(length).fill(-Infinity);
  const bucketMin = new Array(length).fill(Infinity);
  for (let i = 0; i < length; i += 1) {
    const index = Math.floor((nums[i] - min) / gap);
    bucketMax[index] = Math.max(bucketMax[index], nums[i]);
    bucketMin[index] = Math.min(bucketMin[index], nums[i]);
  }
  let ans = 0;
  let pre = bucketMax[0];
  for (let i = 1; i < length; i += 1) {
    if (bucketMin[i] !== Infinity) {
      ans = Math.max(ans, bucketMin[i] - pre);
      pre = bucketMax[i];
    }
  }
  return ans;
};

console.log(maximumGap3([1, 1, 1, 1, 1, 5, 5, 5, 5, 5]));
console.log(maximumGap2([1, 1, 1, 1, 1, 5, 5, 5, 5, 5]));
console.log(maximumGap1([1, 5, 9, 20]));
console.log(maximumGap([1, 5, 9, 20]));
console.log(
  maximumGap3([
    601408776,
    63967816,
    431363697,
    242509930,
    15970592,
    60284088,
    228037800,
    147629558,
    220782926,
    55455864,
    456541040,
    106650540,
    17290078,
    52153098,
    103139530,
    294196042,
    16568100,
    426864152,
    61916064,
    657788565,
    166159446,
    1741650,
    101791800,
    28206276,
    6223796,
    524849590,
    125389882,
    84399672,
    153834912,
    164568204,
    1866165,
    283209696,
    560993994,
    16266096,
    219635658,
    9188983,
    485969304,
    782013650,
    120332636,
    44659356,
    444517408,
    36369045,
    47370708,
    18542592,
    98802990,
    137690000,
    124889895,
    56062800,
    265421676,
    309417680,
    4634176,
    801661539,
    510541206,
    258227892,
    398938089,
    47255754,
    152260962,
    409663140,
    102847688,
    45756553,
    377936600,
    269498,
    375738702,
    263761134,
    53797945,
    329493948,
    224442208,
    508336845,
    189507850,
    40944620,
    127879560,
    119629476,
    186894520,
    62409156,
    693721503,
    4289916,
    523899936,
    28955240,
    266488028,
    20356650,
    40769391,
    483694272,
    97988044,
    84102,
    67246047,
    310688630,
    41288643,
    58965588,
    42881432,
    152159462,
    94786355,
    174917835,
    119224652,
    525034376,
    261516,
    274800528,
    62643819,
    23613832,
    8397240,
    797832131,
    855155367,
    337066320,
    26341480,
    61932200,
    20661075,
    515542796,
    390337500,
    522552030,
    43538516,
    150800550,
    116747540,
    152989123,
    488640056,
    700610304,
    233604,
    344277340,
    21439176,
    9397864,
    16365822,
    73027584,
    453041413,
    197374275,
    157735188,
    15273822,
    187081152,
    379611084,
    865005504,
    223099767,
    80478651,
    377729400,
    186738219,
    34738263,
    16634072,
    112791343,
    99631856,
    119364960,
    477106486,
    583953920,
    624509809,
    188442472,
    294181256,
    213023715,
    146645884,
    149530380,
    497592753,
    132170327,
    72770643,
    126683010,
    405141255,
    590214306,
    26670714,
    95582385,
    162080790,
    231120099,
    8946432,
    204967980,
    592849110,
    54120698,
    375915096,
    602145859,
    5346440,
    226337825,
    425156369,
    653591624,
    578483360,
    572410800,
    32290700,
    381384563,
    149939976,
    183225375,
    155695620,
    38307636,
    457513760,
    97085778,
    75200576,
    8068176,
    221650296,
    556889418,
    252495726,
    895020231,
    19932465,
    156334887,
    191383314,
    348432526,
    368701264,
    14315598,
    148936587,
    279419435,
    237325542,
    252587218,
    322929504,
    26331343,
    355297676,
    600420786,
    652017765,
    51673622,
    159015675
  ])
);
