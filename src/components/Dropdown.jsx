import React from 'react';

const Dropdown = ({ label, options, register,error }) => {
  return (
    <div className='drop-down-style'>
      <label>{label}</label>
      <select {...register} required>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
