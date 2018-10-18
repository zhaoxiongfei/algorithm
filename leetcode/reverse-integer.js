const maxValue = 2 ** 32;
const reverse = x => {
  const lt0 = x < 0;
  const n = Math.abs(x)
    .toString()
    .split("")
    .reverse()
    .join("");
  console.log(n);
  if (n > maxValue) return 0;
  if (lt0) return 0 - n;
  return n;
};

console.log(reverse("1534236469"));
