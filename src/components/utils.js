// currency formatter
//undefined defaults to current user locale
export const currencyFormatter = new Intl.NumberFormat(undefined, {
    currency: "gbp",
    style: "currency",
    minimumFractionDigits: 0 // omit decimals when not intended
})