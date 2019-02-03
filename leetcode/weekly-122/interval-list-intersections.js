/**
 * Definition for an interval.
 */
function Interval(start, end) {
  this.start = start;
  this.end = end;
}
/**
 * @param {Interval[]} A
 * @param {Interval[]} B
 * @return {Interval[]}
 */
const intervalIntersection = (A, B) => {
  const ans = [];
  let i = 0;
  let j = 0;
  while (i < A.length && j < B.length) {
    const a = A[i];
    const b = B[j];
    if (a.start <= b.end && b.start <= a.end) {
      ans.push(
        new Interval(Math.max(a.start, b.start), Math.min(a.end, b.end))
      );
      if (a.end < b.end) {
        i += 1;
      } else {
        j += 1;
      }
      continue;
    }
    if (b.end < a.start) {
      j += 1;
      continue;
    }
    if (a.end < b.start) {
      i += 1;
      continue;
    }
  }

  return ans;
};

const A = [[0, 2], [5, 10], [13, 23], [24, 25]].map(x => new Interval(...x));
const B = [[1, 5], [8, 12], [15, 24], [25, 26]].map(x => new Interval(...x));
console.log(intervalIntersection(A, B));
