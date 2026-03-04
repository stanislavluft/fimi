export const toMinor = (value: string | number): number => {
  const numericValue = typeof value === 'number' ? value : Number(value);
  return Math.round(numericValue * 100);
};

export const fromMinor = (amountMinor: number): string => {
  return (amountMinor / 100).toFixed(2);
};
