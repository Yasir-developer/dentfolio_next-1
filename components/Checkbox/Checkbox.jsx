import React, { useState } from 'react';
import { FaCheck } from 'react-icons/fa';

const Checkbox = ({ label, checked, onChange }) => {
  return (
    <label className="flex items-center space-x-2 cursor-pointer ml-5 mb-5">
      <div className="relative">
        <input
          type="checkbox"
          className="form-checkbox rounded-full border-2 border-gray-300 appearance-none w-5 h-5 checked:bg-custom-blue checked:border-transparent focus:outline-none"
          checked={checked}
          onChange={onChange}
        />
        {/* {checked && (
          <svg
            className="absolute top-0 left-0 ml-1 mt-1 w-3 h-3 text-white fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
          </svg>
        )} */}
        <FaCheck className="absolute top-0 left-0 ml-1 mt-1 w-3 h-3 text-white fill-current" />
      </div>
      <span className="ml-2 text-[14px] lg:text-[16px] font-light mb-1">
        {label}
      </span>
    </label>
  );
};
export default Checkbox;
