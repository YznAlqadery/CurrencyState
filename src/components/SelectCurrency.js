export function SelectCurrency({ value, onChange, isLoading, children }) {
  return (
    <select value={value} onChange={(e) => onChange(e)} disabled={isLoading}>
      {children}
    </select>
  );
}
