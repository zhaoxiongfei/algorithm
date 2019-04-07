/**
 * @param {string[]} queries
 * @param {string} pattern
 * @return {boolean[]}
 */
const camelMatch = (queries, pattern) => {
  let p = Array.from(pattern).join("[a-z]*");
  p = `[a-z]*${p}[a-z]*`;
  const exp = new RegExp(`^${p}$`);
  console.log(exp);
  return queries.map(q => exp.test(q));
};

console.log(
  camelMatch(
    [
      "IXfGawluvnCa",
      "IsXfGaxwulCa",
      "IXfGawlqtCva",
      "IXjfGawlmeCa",
      "IXfGnaynwlCa",
      "IXfGcamwelCa"
    ],
    "IXfGawlCa"
  )
);
console.log(
  camelMatch(
    [
      "aksvbjLiknuTzqon",
      "ksvjLimflkpnTzqn",
      "mmkasvjLiknTxzqn",
      "ksvjLiurknTzzqbn",
      "ksvsjLctikgnTzqn",
      "knzsvzjLiknTszqn"
    ],
    "ksvjLiknTzqn"
  )
);

console.log(
  camelMatch(["CompetitiveProgramming", "CounterPick", "ControlPanel"], "CooP")
);

console.log(
  camelMatch(
    ["FooBar", "FooBarTest", "FootBall", "FrameBuffer", "ForceFeedBack"],
    "FB"
  )
);
console.log(
  camelMatch(
    ["FooBar", "FooBarTest", "FootBall", "FrameBuffer", "ForceFeedBack"],
    "FoBa"
  )
);
console.log(
  camelMatch(
    ["FooBar", "FooBarTest", "FootBall", "FrameBuffer", "ForceFeedBack"],
    "FoBaT"
  )
);
