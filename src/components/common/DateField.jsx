import { CalendarDays } from 'lucide-react';

export const DateField = ({ label, value, onChange, className = '' }) => {
  return (
    <label className={['dateField', className].filter(Boolean).join(' ')}>
      {label ? <span className="dateFieldLabel">{label}</span> : null}
      <div className="dateFieldControl">
        <CalendarDays size={15} />
        <input type="date" value={value} onChange={onChange} />
      </div>
    </label>
  );
};
