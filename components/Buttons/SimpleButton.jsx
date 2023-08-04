import { React, useState } from 'react';
function SimpleButton({ text, className = '', onClick }) {
  return (
    <button
      className={`bg-transparent px-3 py-0 ${className}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}

export default SimpleButton;
