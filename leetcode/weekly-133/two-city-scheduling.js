/**
 * @param {number[][]} costs
 * @return {number}
 */
const twoCitySchedCost = costs => {
  const { length } = costs;
  let min = 0;

  costs.sort((a, b) => b[1] - b[0] - (a[1] - a[0]));

  min = costs.slice(0, length / 2).reduce((m, x) => m + x[0], 0);
  min = costs.slice(length / 2).reduce((m, x) => m + x[1], min);

  return min;
};

console.log(twoCitySchedCost([[10, 20], [30, 200], [400, 50], [30, 20]]));
