export function formatINR(value, decimals = 2) {
  const rate = 83; // USD -> INR conversion rate (adjust as needed)
  const num = Number(value) || 0;
  const inr = num * rate;
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: decimals,
  }).format(inr);
}
