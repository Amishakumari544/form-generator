import React from 'react';

const Checkbox = ({ label, register,error, value}) => {
  return (
    <div className='checkbox-container'>
       <label>{label}</label>
      <input type="checkbox" value={value} {...register} required  />
    </div>
  );
};

export default Checkbox;
