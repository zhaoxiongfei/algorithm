/**
 * @param {number} K
 * @return {number}
 */
const smallestRepunitDivByK = K => {
  const set = new Set([1, 3, 7, 9]);
  if (!set.has(K % 10)) return -1;
  let i = 0;
  let mod = 0;
  let lastMod = 1;
  while (i < Infinity) {
    const curr = 10 * lastMod;
    lastMod = curr % K;
    mod += lastMod;
    // console.log("mod: %d, curr: %d, i: %d", mod, curr, i);
    i += 1;
    if (mod === 0 || mod % K === 0) return i;
  }
  return -1;
};

console.log(smallestRepunitDivByK(3));
console.log(smallestRepunitDivByK(27));
console.log(smallestRepunitDivByK(7));
console.log(smallestRepunitDivByK(1));
console.log(smallestRepunitDivByK(2));
