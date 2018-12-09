// https://www.bilibili.com/video/av1430384?from=search&seid=12446851207563910234

const subset = (s, pre = "", solution = []) => {
  if (!s) {
    solution.push(pre);
  } else {
    subset(s.slice(1), pre + s[0], solution);
    subset(s.slice(1), pre, solution);
  }

  return solution;
};

console.log(subset(process.argv[2]));
