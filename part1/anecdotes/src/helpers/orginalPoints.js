/* helper to create initial points state object, creates array the length of
arr.length, then uses reduce to create object with arr[*] as the keys set to value of 0 */
export const originalPoints = (arr) => {
  return Array.from({ length: arr.length }, (_, i) => i).reduce(
    (acc, curr) => ((acc[curr] = 0), acc),
    {}
  );
};
