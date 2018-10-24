// https://leetcode-cn.com/problems/word-search/description/

/**
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
/**
 * 思路: 笨办法 遍历 board 找到和 word 第一个字符相同的，之后扫描word的每一个字符
 * 记录已经匹配上的坐标，后续不能使用已经用过的坐标

 board = [
   ['A','B','C','E'],
   ['S','F','C','S'],
   ['A','D','E','E']
 ]

 给定 word = "ABCCED", 返回 true.
 给定 word = "SEE", 返回 true.
 给定 word = "ABCB", 返回 false.
 */
const exist = (board, word) => {
  const m = board.length;
  if (m === 0) return false;
  const n = board[0].length;
  if (n === 0) return false;
  const { length } = word;
  if (length === 0) return true;

  // 给board 包裹一圈，这样判断起来么有特殊情况，都是中间点，四个邻居
  for (let i = 0; i < m; i += 1) {
    board[i].unshift("");
    board[i].push("");
  }
  board.unshift(Array(n + 2).fill(""));
  board.push(Array(n + 2).fill(""));

  const adjacentMatch = (i, j, ch, without) => {
    // 邻居们的坐标
    const neighbors = [
      [i, j - 1], //  左边的
      [i, j + 1], // 右边的
      [i - 1, j], // 上边的
      [i + 1, j] // 下边的
    ];
    return neighbors.filter(([r, c]) => {
      if (ch !== board[r][c]) return false;
      const key = `${r}_${c}`;
      return !without.has(key);
    });
  };

  // 从 r, c 验证是否匹配
  // 这里可以保证 r, c位置和word[0] 匹配
  const check = (r, c, i = 0, without) => {
    const key = `${r}_${c}`;
    if (without.has(key)) return false;
    without.add(key);
    if (i === length - 1) {
      console.log("xxxxxxx");
      console.log("i: %d, length: %d, r: %d, c: %d", i, length, r, c);
      return true;
    }

    const points = adjacentMatch(r, c, word[i + 1], without);
    if (!points.length) {
      without.delete(key);
      return false;
    }
    for (const [row, col] of points) {
      without.add(key);
      if (!check(row, col, i + 1, without)) {
        without.delete(key);
      } else {
        return true;
      }
    }
    /*
    console.log(
      "without.size: %d, without: %s",
      without.size,
      Array.from(without)
    );
    */
    return false;
  };

  for (let i = 1; i < m + 1; i += 1) {
    for (let j = 1; j < n + 1; j += 1) {
      const ch = board[i][j];
      if (ch !== word[0]) continue;
      const without = new Set();
      if (check(i, j, 0, without)) return true;
    }
  }

  return false;
};

let board = [["A", "B", "C", "E"], ["S", "F", "C", "S"], ["A", "D", "E", "E"]];
console.log(exist(board, "ABCCED"));
console.log(exist(board, "SEE"));
console.log(exist(board, "ABCB"));
board = [["A", "B", "C", "E"], ["S", "F", "E", "S"], ["A", "D", "E", "E"]];
console.log(exist(board, "ABCESEEEFS"));
board = [["a", "a", "a", "a"], ["a", "a", "a", "a"], ["a", "a", "a", "a"]];
console.log(exist(board, "aaaaaaaaaaaaa"));
