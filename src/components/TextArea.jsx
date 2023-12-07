import React from 'react';

const TextArea = ({ label, register, error, value }) => {
  return (
    <div className='textarea-container'>
      <label>{label}</label>
      <textarea {...register} value={value} />
    </div>
  );
};

export default TextArea;
