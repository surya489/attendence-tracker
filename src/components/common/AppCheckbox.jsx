export const AppCheckbox = ({ checked, onChange, ariaLabel, className = '' }) => {
  return (
    <label className={['appCheckbox', className].filter(Boolean).join(' ')}>
      <input type="checkbox" checked={checked} onChange={onChange} aria-label={ariaLabel} />
      <span className="appCheckboxUi" />
    </label>
  );
};
