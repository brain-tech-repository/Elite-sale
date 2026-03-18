export const formatNumber = (value: number | string | null | undefined) => {
  const num = Number(value ?? 0);

  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(num);
};
