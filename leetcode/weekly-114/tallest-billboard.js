// https://leetcode-cn.com/contest/weekly-contest-114/problems/tallest-billboard/
const canPartition = nums => {
  const total = nums.reduce((m, x) => m + x, 0);
  if (total % 2) return false;
  const half = total / 2;

  const dp = Array(half + 1).fill(0);
  dp[0] = 1;
  for (let i = 0; i < nums.length; i += 1) {
    for (let j = half; j >= nums[i]; j -= 1) {
      dp[j] = dp[j] || dp[j - nums[i]];
    }
  }

  return dp[half] === 1 ? half : 0;
};
/**
 * @param {number[]} rods
 * @return {number}
 */
// 虽然测试都通过了，但是这个解法有bug，只是测试用例没有测出来，只要需要剩余两个或以上的钢条这个代码就会出错
const tallestBillboard1 = rods => {
  const { length } = rods;
  const f = canPartition(rods);
  if (f) return f;
  rods.sort((a, b) => a - b);
  let i = 1;
  let j = 0;
  while (i < length - 1) {
    const t = rods[j];
    rods[j] = 0;
    const res = canPartition(rods);
    if (res) return res;
    rods[j] = t;
    if (j === rods.length - 1) {
      j = 0;
      i += 1;
    } else {
      j += 1;
    }
  }

  return 0;
};

// 修正第一个方案的bug，但是性能出现了问题
// 这里本质上是深度优先搜索，但是这个题目其实广度优先搜索更适合
const tallestBillboard = (rods, selected = [], start = 0) => {
  if (start === rods.length) {
    return canPartition(selected);
  }
  return Math.max(
    tallestBillboard(rods, selected.concat(rods[start]), start + 1),
    tallestBillboard(rods, selected, start + 1)
  );
};

// 优化第二个方案，修改为广度优先
// 事实上广度优先遇到最快的情况将和深度优先的方案性能完全一样
// 代码完成，事实证明不可取 例如: 去掉两个小的可以平衡，去掉一个大的也可以平衡，
// 显然当这两个小的之和比这个大的还小，则出错
const tallestBillboard3 = rods => {
  const set = new Set();
  const solution = [rods];
  while (solution.length) {
    const case1 = solution.shift();
    const value = canPartition(case1);
    if (value) return value;
    if (case1.length < 2) continue;
    for (let i = 0; i < case1.length; i += 1) {
      const case2 = case1.slice(0, i).concat(case1.slice(i + 1));
      const key = case2.join("_");
      if (!set.has(key)) {
        set.add(key);
        solution.push(case2);
      }
    }
  }

  return 0;
};

/**
 来自 leetcode https://leetcode.com/johnkram/ 大神的解答
  class Solution {
  public:
      int d[25][5005];
      int tallestBillboard(vector<int>& rods) {
          int n=rods.size(),i,j;
          memset(d,-1,sizeof(d));
          d[0][0]=0;
          for(i=0;i<n;i++)for(j=0;j<=5000;j++)if(~d[i][j])
          {
              d[i+1][j]=max(d[i+1][j],d[i][j]);
              d[i+1][j+rods[i]]=max(d[i+1][j+rods[i]],d[i][j]+rods[i]);
              if(j>=rods[i])d[i+1][j-rods[i]]=max(d[i+1][j-rods[i]],d[i][j]);
              else d[i+1][rods[i]-j]=max(d[i+1][rods[i]-j],d[i][j]+rods[i]-j);
          }
          return d[n][0];
      }
  };
 */
const tallestBillboard2 = rods => {
  const { length } = rods;
  const dp = Array(21);
  for (let i = 0; i < 21; i += 1) dp[i] = Array(5001).fill(-1);

  dp[0][0] = 0;
  for (let i = 0; i < length; i += 1) {
    for (let j = 0; j <= 5000; j += 1) {
      if (dp[i][j] === -1) continue;
      dp[i + 1][j] = Math.max(dp[i + 1][j], dp[i][j]);
      dp[i + 1][j + rods[i]] = Math.max(
        dp[i + 1][j + rods[i]],
        dp[i][j] + rods[i]
      );
      if (j > rods[i]) {
        dp[i + 1][j - rods[i]] = Math.max(dp[i + 1][j - rods[i]], dp[i][j]);
      } else {
        dp[i + 1][rods[i] - j] = Math.max(
          dp[i + 1][rods[i] - j],
          dp[i][j] + rods[i] - j
        );
      }
    }
  }

  return dp[length][0];
};

console.log(
  tallestBillboard2([
    1,
    2,
    4,
    8,
    16,
    32,
    64,
    128,
    256,
    512,
    50,
    50,
    50,
    150,
    150,
    150,
    100,
    100,
    100,
    123
  ])
);
process.exit(0);
console.log(tallestBillboard3([1, 2, 4, 8]));
console.log(tallestBillboard3([1, 2, 4, 8, 16, 32, 64, 128, 256, 512]));
console.log(tallestBillboard([1, 2, 3, 4, 5, 6]));
console.log(tallestBillboard2([3, 4, 3, 3, 2]));
console.log(tallestBillboard1([3, 4, 3, 3, 2]));
console.log(tallestBillboard([3, 4, 3, 3, 2]));
console.log(tallestBillboard2([3, 4, 3, 3, 2, 128]));
console.log(tallestBillboard1([3, 4, 3, 3, 2, 128]));
console.log(tallestBillboard([3, 4, 3, 3, 2, 128]));
// console.log(tallestBillboard([1, 2, 4, 8, 16, 32, 64, 128, 256, 512]));
// console.log(tallestBillboard([2, 4, 8, 16]));
// console.log(tallestBillboard([1, 2, 3, 4, 5, 6]));
// console.log(tallestBillboard([1, 2, 3, 6]));
// console.log(tallestBillboard([1, 2]));
