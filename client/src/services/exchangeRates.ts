import { Currency } from "../context/CurrencyContext";
const BASE_URL = "https://open.er-api.com/v6/latest/USD";

export type ExchangeRates = {
  USD: number;
  EUR: number;
};

export const fetchExchangeRates = async (): Promise<ExchangeRates> => {
  try {
    const response = await fetch(BASE_URL);
    const data = await response.json();

    return {
      EUR: data.rates.EUR,
      USD: 1,
    };
  } catch (error) {
    console.error("Failed to fetch exchange rates:", error);
    return {
      EUR: 0.85,
      USD: 1,
    };
  }
};
