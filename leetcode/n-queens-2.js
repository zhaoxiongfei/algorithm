/**
 * @param {number} n
 * @return {string[][]}
 */
const solveNQueens = n => {
  let solutions = 0;
  const queens = [];

  const search = () => {
    if (queens.length === n) {
      solutions += 1;
    } else {
      // 逐个判断，寻找可能的下一个皇后的位置
      for (let i = 0; i < n; i += 1) {
        let next = true;
        for (let j = 0; j < queens.length; j += 1) {
          if (
            queens[j] === i ||
            queens[j] - j === i - queens.length ||
            queens[j] + j === i + queens.length
          ) {
            next = false;
            break;
          }
        }
        if (next) {
          queens.push(i);
          search();
          queens.pop();
        }
      }
    }
  };

  search();
  return solutions;
};

console.log(solveNQueens(12));
