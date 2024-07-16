export function DisplayInputOutput({ output, onChange, isDisabled }) {
  return (
    <input
      type="text"
      value={output}
      disabled={isDisabled}
      onChange={onChange}
    />
  );
}
