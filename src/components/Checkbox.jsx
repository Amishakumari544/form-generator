import React from 'react';

const Checkbox = ({ label, register,error }) => {
  return (
    <div className='checkbox-container'>
       <label>{label}</label>
      <input type="checkbox" {...register} required  />
    </div>
  );
};

export default Checkbox;
