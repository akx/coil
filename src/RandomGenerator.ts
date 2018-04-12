function hashString(string: String) {
  let seed = 0;
  for (var i = 0; i < string.length; i++) {
    seed ^= (i % 16) << string.charCodeAt(i);
  }
  return seed;
}

// Based on https://gist.github.com/blixt/f17b47c62508be59987b
// which is based on http://www.firstpr.com.au/dsp/rand31/


export type RandomGenerator = () => number;

export default function createRandomGenerator(seedString?: string): RandomGenerator {
  let seed = (seedString ? hashString(seedString) : (Math.random() * 2147483647));

  const next = () => {
    return seed = seed * 16807 % 2147483647;
  };

  return function nextFloat() {
    return (next() - 1) / 2147483646;
  };
}
