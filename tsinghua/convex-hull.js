// convex hull

const randomGenerate = (n, maxValue, offset) => {
  const points = [];
  for (let i = 0; i < n; i += 1) {
    points[i] = [
      (offset + Math.random() * maxValue) | 0,
      (offset + Math.random() * maxValue) | 0
    ];
  }

  return points;
};

const vectorArea = ([px, py], [qx, qy], [sx, sy]) =>
  px * qy - py * qx + qx * sy - qy * sx + sx * py - sy * px;

const scan = points => {
  const t = points.slice();
  const s = [];
  s.push(t.pop()); // 第一个点入栈
  s.push(t.pop()); // 第二个点入栈

  while (t.length) {
    const area = vectorArea(s[s.length - 2], s[s.length - 1], t[t.length - 1]);
    if (area > 0) {
      s.push(t.pop());
    } else {
      s.pop();
      if (area === 0 || s.length === 1) s.push(t.pop());
    }
  }

  return s;
};

const findPole = points => {
  const { length } = points;
  if (length === 0) return [];
  points.sort((a, b) => (a[0] === b[0] ? b[1] - a[1] : a[0] - b[0]));

  let index = 0;
  for (let i = 1; i < length; i += 1) {
    const curr = points[i];
    const prev = points[i - 1];
    if (curr[0] !== prev[0] || curr[1] !== prev[1]) points[(index += 1)] = curr;
  }
  points.length = index + 1;
  if (points.length < 3) return [];

  const tops = scan(points);
  const bottoms = scan(points.reverse());

  bottoms.length -= 1;
  tops.length -= 1;
  if (bottoms.length + tops.length < 3) return [];
  return bottoms.concat(tops);
};

console.log(
  findPole([
    [0, 5],
    [2, 5],
    [4, 2],
    [4, 3],
    [5, 7],
    [7, 4],
    [8, 9],
    [9, 5],
    [9, 6],
    [9, 9]
  ])
);
console.log(findPole(randomGenerate(1000, 1000, 0)));
