export const formatNumber = (
  num: number,
  options?: {
    minimumFractionDigits?: number;
    maximumFractionDigits?: number;
    style?: 'decimal' | 'currency' | 'percent';
    currency?: string;
  },
): string => {
  const formatter = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: options?.minimumFractionDigits || 0,
    maximumFractionDigits: options?.maximumFractionDigits || 2,
    style: options?.style || 'decimal',
    currency: options?.style === 'currency' ? options?.currency : undefined,
  });

  return formatter.format(num);
};
