export const formatXAF = (amount: number): string => {
  return new Intl.NumberFormat("fr-CM", {
    style: "currency",
    currency: "XAF",
    minimumFractionDigits: 0,
  }).format(amount)
}

export const XAF = (amount: number): string => formatXAF(amount)
