export function formatPrice(price: number | null | undefined): string {
  if (price == null) return "Price not available"

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price)
}

export function formatPriceShort(price: number | null | undefined): string {
  if (price == null) return "Price not available"

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    unitDisplay: "short",
    compactDisplay: "short",
    notation: "compact",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price)
}
