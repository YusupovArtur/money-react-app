export const isSubset = (set1: Set<any>, set2: Set<any>): boolean => {
  for (const elem of set2) {
    if (!set1.has(elem)) {
      return false;
    }
  }
  return true;
};
