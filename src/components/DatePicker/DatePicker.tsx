import React from 'react';
import styles from './DatePicker.module.css';

// Explicitly type the component's API
interface DatePickerProps {
  label?: string;
  value: string; // Formatted as YYYY-MM-DD
  onChange: (date: string) => void;
  minDate?: string; // Optional boundaries
  maxDate?: string;
}

export default function DatePicker({
  label = 'Select Date',
  value,
  onChange,
  minDate,
  maxDate
}: DatePickerProps): React.JSX.Element {
  
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    onChange(e.target.value);
  };

  const formatFriendlyDate = (dateString: string): string => {
    if (!dateString) return '';
    const date = new Date(dateString);
    
    // Check for invalid date strings gracefully
    if (isNaN(date.getTime())) return '';
    
    return date.toLocaleDateString('en-AU', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className={styles.container}>
      <label htmlFor="custom-date" className={styles.label}>
        {label}
      </label>
      <div className={styles.inputWrapper}>
        <input
          id="custom-date"
          type="date"
          className={styles.dateInput}
          value={value}
          onChange={handleDateChange}
          min={minDate}
          max={maxDate}
        />
      </div>
      <div className={styles.displayValue}>
        {value ? formatFriendlyDate(value) : 'No date selected'}
      </div>
    </div>
  );
}
