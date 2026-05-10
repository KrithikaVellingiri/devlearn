export function formatPrice(amount: number | string): string {
  // Convert string to number if needed, removing any existing currency symbols
  const numericAmount = typeof amount === 'string' 
    ? parseFloat(amount.replace(/[^0-9.]/g, '')) 
    : amount;

  if (isNaN(numericAmount)) {
    return "₹0.00";
  }

  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0, // Don't show .00 if it's a whole number, wait actually let's standardise on 0 fraction digits if it's whole, but 2 if it has cents
  }).format(numericAmount);
}
