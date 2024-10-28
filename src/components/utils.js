// currency formatter - to be reused across the application where currency will be displayed
//undefined defaults currency value to current user locale
export const currencyFormatter = new Intl.NumberFormat(undefined, {
    currency: "gbp",
    style: "currency",
    minimumFractionDigits: 0 // omit decimals when not intended
})