import { React, useState } from 'react';
function SimpleButton({ text, className = '', onClick, disabled }) {
  console.log(text, 'disabled');
  return (
    <button
      className={`bg-transparent px-3 py-0 ${className}`}
      onClick={onClick}
      disabled={disabled ? disabled : null}
    >
      {text}
    </button>
  );
}

export default SimpleButton;
