import { useEffect, useState } from "react";

export function useCurrency(query, fromCurrency, toCurrency) {
  const [isLoading, setIsLoading] = useState(false);
  const [output, setOutput] = useState(0);
  useEffect(
    function () {
      async function handleCurrency() {
        try {
          setIsLoading(true);
          const response = await fetch(
            `https://api.frankfurter.app/latest?amount=${query}}&from=${fromCurrency}&to=${toCurrency}`
          );
          if (!response.ok) throw new Error("Error");
          const data = await response.json();
          setOutput(data.rates[toCurrency]);
          setIsLoading(false);
        } catch (err) {}
      }
      if (fromCurrency === toCurrency) return setOutput(query);

      handleCurrency();
    },
    [query, fromCurrency, toCurrency]
  );
  return {
    output,
    isLoading,
    exchangeRate: output,
  };
}
