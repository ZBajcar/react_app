import { ExchangeRates } from "../services/exchangeRates";
import { Currency } from "../context/CurrencyContext";

export const formatPrice = (
  price: number,
  currency: Currency,
  rates: ExchangeRates
) => {
  const exchangeRate = rates ? rates[currency] : 1;

  const amount = currency === "EUR" ? price * exchangeRate : price;

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
  }).format(amount);
};
