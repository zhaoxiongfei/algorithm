// https://leetcode-cn.com/problems/game-of-life/description/
// No 289. 生命游戏

/**
  根据百度百科，生命游戏，简称为生命，是英国数学家约翰·何顿·康威在1970年发明的细胞自动机。

  给定一个包含 m × n 个格子的面板，每一个格子都可以看成是一个细胞。
  每个细胞具有一个初始状态 live（1）即为活细胞， 或 dead（0）即为死细胞。
  每个细胞与其八个相邻位置（水平，垂直，对角线）的细胞都遵循以下四条生存定律：

  如果活细胞周围八个位置的活细胞数少于两个，则该位置活细胞死亡；
  如果活细胞周围八个位置有两个或三个活细胞，则该位置活细胞仍然存活；
  如果活细胞周围八个位置有超过三个活细胞，则该位置活细胞死亡；
  如果死细胞周围正好有三个活细胞，则该位置死细胞复活；
  根据当前状态，写一个函数来计算面板上细胞的下一个（一次更新后的）状态。
  下一个状态是通过将上述规则同时应用于当前状态下的每个细胞所形成的，其中细胞的出生和死亡是同时发生的。

  示例:

  输入:
  [
    [0,1,0],
    [0,0,1],
    [1,1,1],
    [0,0,0]
  ]
  输出:
  [
    [0,0,0],
    [1,0,1],
    [0,1,1],
    [0,1,0]
  ]
  进阶:

  你可以使用原地算法解决本题吗？请注意，面板上所有格子需要同时被更新：你不能先更新某些格子，然后使用它们的更新后的值再更新其他格子。
  本题中，我们使用二维数组来表示面板。原则上，面板是无限的，但当活细胞侵占了面板边界时会造成问题。你将如何解决这些问题？
*/

/**
 * @param {number[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
// 思路: 扫描第一遍，在原地记录周边的1的个数N，原来如果是 0 就记录 0 - N (即 -N)
// 如果原来是 1 就记录为 1 + N
// 第二次扫描根据规则来设置为 0， 1
const gameOfLife = board => {
  const m = board.length;
  if (m === 0) return;
  const n = board[0].length;
  if (n === 0) return;

  for (let i = 0; i < m; i += 1) {
    for (let j = 0; j < n; j += 1) {
      let lives = 0;
      if (board[i - 1] && board[i - 1][j - 1] >= 1) lives += 1; // LT
      if (board[i - 1] && board[i - 1][j] >= 1) lives += 1; // T
      if (board[i - 1] && board[i - 1][j + 1] >= 1) lives += 1; // RT
      if (board[i][j - 1] >= 1) lives += 1; // L
      if (board[i][j + 1] >= 1) lives += 1; // R
      if (board[i + 1] && board[i + 1][j - 1] >= 1) lives += 1; // LB
      if (board[i + 1] && board[i + 1][j] >= 1) lives += 1; // B
      if (board[i + 1] && board[i + 1][j + 1] >= 1) lives += 1; // RB
      board[i][j] = board[i][j] === 0 ? -lives : 1 + lives;
    }
  }

  for (let i = 0; i < m; i += 1) {
    for (let j = 0; j < n; j += 1) {
      const lives = board[i][j];
      if (lives >= 1) {
        // 原来是活细胞，周围的活细胞数为 lives - 1
        if (lives < 3) {
          // 如果活细胞周围八个位置的活细胞数少于两个，则该位置活细胞死亡；
          board[i][j] = 0;
        } else if (lives < 5) {
          // 如果活细胞周围八个位置有两个或三个活细胞，则该位置活细胞仍然存活；
          board[i][j] = 1;
        } else if (lives > 4) {
          // 如果活细胞周围八个位置有超过三个活细胞，则该位置活细胞死亡；
          board[i][j] = 0;
        }
      } else {
        // 如果死细胞周围正好有三个活细胞，则该位置死细胞复活；
        board[i][j] = lives === -3 ? 1 : 0;
      }
    }
  }
};

const board = [[0, 1, 0], [0, 0, 1], [1, 1, 1], [0, 0, 0]];

gameOfLife(board);
console.log(board);
gameOfLife(board);
console.log(board);
gameOfLife(board);
console.log(board);
gameOfLife(board);
console.log(board);
gameOfLife(board);
console.log(board);
gameOfLife(board);
console.log(board);
