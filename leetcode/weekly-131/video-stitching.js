/**
 * @param {number[][]} clips
 * @param {number} T
 * @return {number}
 */
const videoStitching = (clips, T) => {
  if (T === 0) return 0;
  const map = new Map();
  for (const clip of clips) {
    const cs = map.get(clip[0]) || [];
    if (cs.length === 0) map.set(clip[0], cs);
    cs.push(clip);
  }

  for (const x of map) {
    x[1].sort((a, b) => b[1] - a[1]);
  }

  if (!map.get(0)) return -1;
  let start = map.get(0)[0];
  let count = 1;
  while (start[1] < T) {
    const maybe = [];
    for (let i = start[1]; start[0] < i; i -= 1) {
      const cs = map.get(i);
      if (cs && start[1] < cs[0][1]) maybe.push(cs[0]);
    }

    if (maybe.length === 0) return -1;
    maybe.sort((a, b) => b[1] - a[1]);
    start = maybe[0];
    count += 1;
  }

  return count;
};

console.log(
  videoStitching(
    [
      [16, 18],
      [16, 20],
      [3, 13],
      [1, 18],
      [0, 8],
      [5, 6],
      [13, 17],
      [3, 17],
      [5, 6]
    ],
    15
  )
);
console.log(
  videoStitching([[0, 2], [4, 6], [8, 10], [1, 9], [1, 5], [5, 9]], 10)
);
console.log(videoStitching([[0, 1], [1, 2]], 5));
console.log(
  videoStitching(
    [
      [0, 1],
      [6, 8],
      [0, 2],
      [5, 6],
      [0, 4],
      [0, 3],
      [6, 7],
      [1, 3],
      [4, 7],
      [1, 4],
      [2, 5],
      [2, 6],
      [3, 4],
      [4, 5],
      [5, 7],
      [6, 9]
    ],
    9
  )
);
console.log(videoStitching([[0, 4], [2, 8]], 5));
