/** Formats a numeric amount for display, e.g. "1,234.56 NGN". */
export function formatNairaPriceLabel(amount: number): string {
  const formatted = new Intl.NumberFormat("en-NG", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
  return `${formatted} NGN`;
}
