import React from 'react';

const TextInput = ({ label, register, error, value }) => {
  return (
    <div className='input-container'>
      <label>{label}</label>
      <input
        type='text'
        {...register}
        value={value}
        required
      />
    </div>
  );
};

export default TextInput;
