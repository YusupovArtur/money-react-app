export const getLeveledIconsOptions = (iconOptions: string[][], rowLength: number): string[][][] => {
  const leveledIconOptions: string[][][] = [];

  iconOptions.forEach((row) => {
    const newRow: string[][] = [];
    for (let i = 0; i <= Math.floor((row.length - 1) / rowLength); i++) {
      newRow.push(row.slice(i * rowLength, (i + 1) * rowLength));
    }
    leveledIconOptions.push(newRow);
  });

  return leveledIconOptions;
};
