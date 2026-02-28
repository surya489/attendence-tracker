import { useEffect, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';

export const UiSelect = ({
  label,
  value,
  options = [],
  onChange,
  placeholder = 'Select',
  startIcon: StartIcon,
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const onClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  return (
    <div className={`uiSelect ${className}`.trim()} ref={containerRef}>
      {label ? <span className="uiSelectLabel">{label}</span> : null}
      <button
        type="button"
        className="uiSelectButton"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span className="uiSelectValue">
          {StartIcon ? <StartIcon size={14} /> : null}
          {value || placeholder}
        </span>
        <ChevronDown size={14} className={`uiSelectArrow ${isOpen ? 'isOpen' : ''}`} />
      </button>

      {isOpen ? (
        <div className="uiSelectMenu" role="listbox">
          {options.map((option) => (
            <button
              key={option}
              type="button"
              className={`uiSelectOption ${value === option ? 'isActive' : ''}`}
              onClick={() => {
                onChange(option);
                setIsOpen(false);
              }}
            >
              {option}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
};
