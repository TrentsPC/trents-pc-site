export let TSH = (s: string = "") => {
  for (var i = 0, h = 9; i < s.length; )
    h = Math.imul(h ^ s.charCodeAt(i++), 9 ** 9);
  return Math.abs(h ^ (h >>> 9));
};
