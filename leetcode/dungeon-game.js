// https://leetcode-cn.com/problems/dungeon-game/description/
// No 174. 地下城游戏

/**
  一些恶魔抓住了公主（P）并将她关在了地下城的右下角。地下城是由 M x N 个房间组成的二维网格。我们英勇的骑士（K）最初被安置在左上角的房间里，他必须穿过地下城并通过对抗恶魔来拯救公主。

  骑士的初始健康点数为一个正整数。如果他的健康点数在某一时刻降至 0 或以下，他会立即死亡。

  有些房间由恶魔守卫，因此骑士在进入这些房间时会失去健康点数（若房间里的值为负整数，则表示骑士将损失健康点数）；
  其他房间要么是空的（房间里的值为 0），要么包含增加骑士健康点数的魔法球（若房间里的值为正整数，则表示骑士将增加健康点数）。

  为了尽快到达公主，骑士决定每次只向右或向下移动一步。

  编写一个函数来计算确保骑士能够拯救到公主所需的最低初始健康点数。

  例如，考虑到如下布局的地下城，如果骑士遵循最佳路径 右 -> 右 -> 下 -> 下，则骑士的初始健康点数至少为 7。

  -2(K) -3    3
  -5    -10   1
  10    30    -5(P)


  说明:

  骑士的健康点数没有上限。

  任何房间都可能对骑士的健康点数造成威胁，也可能增加骑士的健康点数，包括骑士进入的左上角房间以及公主被监禁的右下角房间。
 */

/**
 * @param {number[][]} dungeon
 * @return {number}
 */
// 思路: 动态规划，令 dp[i][j] 为起始经过i, j点所需的最少点数
// 参考: https://blog.csdn.net/tbsjianjian/article/details/52453004
// 逆着从终点反推
const calculateMinimumHP = dungeon => {
  const m = dungeon.length;
  const n = dungeon[0].length;

  const dp = [];
  for (let i = 0; i < m; i += 1) dp[i] = [];
  // 特殊处理最后一点
  dp[m - 1][n - 1] = dungeon[m - 1][n - 1] >= 0 ? 0 : 0 - dungeon[m - 1][n - 1];
  // 特殊处理最后一行
  for (let i = n - 2; i >= 0; i -= 1)
    dp[m - 1][i] =
      dungeon[m - 1][i] >= dp[m - 1][i + 1]
        ? 0
        : dp[m - 1][i + 1] - dungeon[m - 1][i];

  // 特殊处理最后一列
  for (let i = m - 2; i >= 0; i -= 1)
    dp[i][n - 1] =
      dungeon[i][n - 1] >= dp[i + 1][n - 1]
        ? 0
        : dp[i + 1][n - 1] - dungeon[i][n - 1];

  for (let i = m - 2; i >= 0; i -= 1) {
    for (let j = n - 2; j >= 0; j -= 1) {
      const right =
        dungeon[i][j] >= dp[i][j + 1] ? 0 : dp[i][j + 1] - dungeon[i][j];
      const bottom =
        dungeon[i][j] >= dp[i + 1][j] ? 0 : dp[i + 1][j] - dungeon[i][j];
      dp[i][j] = Math.min(right, bottom);
    }
  }

  return dp[0][0] + 1;
};

// 正推试一下
// 不可行
const calculateMinimumHP2 = dungeon => {
  const m = dungeon.length;
  const n = dungeon[0].length;

  const dp = [];
  for (let i = 0; i < m; i += 1) dp[i] = [];
  // 特殊处理最后一点
  dp[0][0] = dungeon[0][0] >= 0 ? 0 : 0 - dungeon[0][0];
  // 特殊处理第一行
  for (let i = 1; i < n; i += 1)
    dp[0][i] = dungeon[0][i] >= dp[0][i - 1] ? 0 : dp[0][i - 1] - dungeon[0][i];

  // 特殊处理第一列
  for (let i = 1; i < m; i += 1)
    dp[i][0] = dungeon[i][0] >= dp[i - 1][0] ? 0 : dp[i - 1][0] - dungeon[i][0];

  for (let i = 1; i < m; i += 1) {
    for (let j = 1; j < n; j += 1) {
      const left =
        dungeon[i][j] >= dp[i][j - 1] ? 0 : dp[i][j - 1] - dungeon[i][j];
      const up =
        dungeon[i][j] >= dp[i - 1][j] ? 0 : dp[i - 1][j] - dungeon[i][j];
      dp[i][j] = Math.min(left, up);
    }
  }

  console.log(dp);
  return dp[m - 1][n - 1] + 1;
};

console.log(calculateMinimumHP([[-2, -3, 3], [-5, -10, 1], [10, 30, -5]]));
console.log(calculateMinimumHP2([[-2, -3, 3], [-5, -10, 1], [10, 30, -5]]));
