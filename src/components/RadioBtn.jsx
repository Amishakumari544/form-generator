import React from 'react';

const Radio = ({ label, value, options, register }) => {
  return (
    <div className="radio-container">
      <span className="label-text">{label}</span>
      {options.map((option) => (
        <label key={option.value}>
         <span className='option-label'>{option.label}</span> 
          <input type="radio" value={option.value} {...register} checked={option.value === value} />
        </label>
      ))}
    </div>
  );
};

export default Radio;
