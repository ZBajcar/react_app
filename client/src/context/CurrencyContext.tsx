import React from "react";
import { fetchExchangeRates, ExchangeRates } from "../services/exchangeRates";
import useLocalStorage from "../hooks/useLocalStorage";

export type Currency = "USD" | "EUR";

interface CurrencyContextType {
  currency: Currency;
  toggleCurrency: () => void;
  rates: ExchangeRates;
}

export const CurrencyContext = React.createContext<CurrencyContextType>({
  currency: "USD",
  toggleCurrency: () => {
    throw new Error("Toggle currency is not set up");
  },
  rates: { USD: 1, EUR: 0.85 },
});

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrency] = useLocalStorage<Currency>("currency", "USD");
  const [rates, setRates] = React.useState<ExchangeRates>({
    USD: 1,
    EUR: 0.85,
  });

  React.useEffect(() => {
    const loadRates = async () => {
      const data = await fetchExchangeRates();
      setRates(data);
    };
    loadRates();
  }, [currency]);

  const toggleCurrency = () => {
    setCurrency((curr) => (curr === "USD" ? "EUR" : "USD"));
  };

  return (
    <CurrencyContext.Provider value={{ currency, toggleCurrency, rates }}>
      {children}
    </CurrencyContext.Provider>
  );
}
