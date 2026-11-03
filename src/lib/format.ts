/**
 * Currency & Date formatting utilities for Crafted by Reet
 * Base Currency: Indian Rupee (INR) stored in integer paise
 */

export const FREE_SHIPPING_THRESHOLD_PAISE = 99900; // ₹999
export const STANDARD_SHIPPING_FEE_PAISE = 9900;     // ₹99

/**
 * Format integer paise into Indian Rupee string (e.g. 449900 -> "₹4,499")
 */
export function formatINR(paise: number, showDecimals: boolean = false): string {
  if (typeof paise !== 'number' || isNaN(paise)) return '₹0';
  const rupees = paise / 100;

  const hasDecimals = paise % 100 !== 0 || showDecimals;

  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: hasDecimals ? 2 : 0,
    maximumFractionDigits: hasDecimals ? 2 : 0,
  }).format(rupees);
}

/**
 * Convert integer paise to decimal rupees number
 */
export function paiseToRupees(paise: number): number {
  return Number((paise / 100).toFixed(2));
}

/**
 * Convert rupees to integer paise
 */
export function rupeesToPaise(rupees: number): number {
  return Math.round(rupees * 100);
}

/**
 * Format ISO date string into readable Indian / human date
 */
export function formatDate(dateString?: string): string {
  if (!dateString) return '—';
  try {
    const d = new Date(dateString);
    return new Intl.DateTimeFormat('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    }).format(d);
  } catch {
    return dateString;
  }
}
