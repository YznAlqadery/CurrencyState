import { useEffect, useState } from "react";
import { DisplayCurrencies } from "./components/DisplayCurrencies";
import { DisplayContainers } from "./components/DisplayContainers";
import { DisplayInputOutput } from "./components/DisplayInputOutput";
import { AppHeader } from "./components/AppHeader";
import { SelectCurrency } from "./components/SelectCurrency";
import { useCurrency } from "./hooks/useCurrency";

export default function App() {
  const [currencies, setCurrencies] = useState([]);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [query, setQuery] = useState(1);

  const { output, isLoading } = useCurrency(query, fromCurrency, toCurrency);

  const { exchangeRate } = useCurrency(1, fromCurrency, toCurrency);
  console.log(exchangeRate);
  useEffect(function () {
    async function handleCurrencies() {
      const response = await fetch("https://api.frankfurter.app/currencies");
      const data = await response.json();
      setCurrencies(Object.keys(data));
    }
    handleCurrencies();
  }, []);

  function handleFromChange(e) {
    setFromCurrency(e.target.value);
  }

  function handleToChange(e) {
    setToCurrency(e.target.value === fromCurrency ? "EUR" : e.target.value);
  }

  function handleQueryChange(e) {
    setQuery((query) => (query >= 0 ? e.target.value : 0));
  }
  return (
    <main className="App">
      <div className="container">
        <AppHeader />
        <div className="currency-container">
          <DisplayContainers>
            <div className="from-container">
              <p>Amount</p>
              <div className="flex-container">
                <SelectCurrency
                  value={fromCurrency}
                  onChange={handleFromChange}
                  isLoading={isLoading}
                >
                  <DisplayCurrencies currencies={currencies} />
                </SelectCurrency>

                <DisplayInputOutput
                  output={query}
                  onChange={handleQueryChange}
                  isDisabled={false}
                />
              </div>
            </div>
          </DisplayContainers>

          <div className="to-container">
            <p>Converted Amount</p>
            <div className="flex-container">
              <SelectCurrency
                value={toCurrency}
                onChange={handleToChange}
                isLoading={isLoading}
              >
                <DisplayCurrencies currencies={currencies} />
              </SelectCurrency>

              {query > 0 ? (
                <DisplayInputOutput
                  output={output}
                  isDisabled={true}
                  isLoading={isLoading}
                />
              ) : (
                <DisplayInputOutput output={0} isDisabled={true} />
              )}
            </div>
          </div>
        </div>
        <div className="footer">
          <p>Indicative Exchange Rate</p>
          <p className="exchange-rates">
            1 {fromCurrency} = {exchangeRate} {toCurrency}
          </p>
        </div>
      </div>
    </main>
  );
}
