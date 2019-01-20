/**
 * @param {number[]} A
 * @return {number[]}
 */
const sortedSquares = A => A.map(x => x * x).sort((a, b) => a - b);

console.log(sortedSquares([-4, -1, 0, 3, 10]));
