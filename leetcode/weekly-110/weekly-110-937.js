//
//
//
/**
 * @param {string[]} logs
 * @return {string[]}
 */
const reorderLogFiles = logs => {
  const arr = logs.map(x => x.split(" "));
  const strs = [];
  const nums = [];
  for (let i = 0; i < arr.length; i += 1) {
    if (parseInt(arr[i][1]) == arr[i][1]) {
      nums.push(arr[i]);
    } else {
      strs.push(arr[i]);
    }
  }
  strs.sort((a, b) => (a.slice(1).join(" ") > b.slice(1).join(" ") ? 1 : -1));
  return strs.map(x => x.join(" ")).concat(nums.map(x => x.join(" ")));
};

console.log(reorderLogFiles(["j mo", "5 m w", "g 07", "o 2 0", "t q h"]));
