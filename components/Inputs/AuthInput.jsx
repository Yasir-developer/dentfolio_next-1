import React, { forwardRef, useState } from 'react';
// import from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

import { HiEye, HiEyeOff } from 'react-icons/hi';
const AuthInput = forwardRef(function AuthInput(
  {
    type,
    id,
    placeholder,
    value,
    onChange,
    className,
    containerClassName,
    btnStyle,
    maxLength,
    required,
    disabled,
    label,
    ...rest
  },
  ref
) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    // <div className="relative">
    <>
      {type !== 'password' ? (
        <div
          className={`${containerClassName ? ` ${containerClassName}` : ''}`}
        >
          {label ? <p>{label}</p> : <></>}
          <input
            type={showPassword ? 'text' : type}
            // pattern={type == 'tel' ? '[0-9]{3}-[0-9]{2}-[0-9]{3}' : ''}
            id={id}
            placeholder={placeholder}
            value={value}
            ref={ref}
            onChange={onChange}
            required={required ? required : null}
            disabled={disabled ? disabled : null}
            {...rest}
            style={btnStyle}
            maxLength={maxLength}
            // place
            className={`focus:outline-none border w-full border-custom-grey rounded-[7px] p-3 bg-custom-dashboard-bg placeholder-slate-400 lg:text-[16px] text-[14px] font-normal mb-5 ${className}`}
          />

          {/* <button
          type="button"
          className="absolute top-1/2 right-3 transform -translate-y-1/2 focus:outline-none"
          onClick={togglePasswordVisibility}
        >
          {showPassword ? (
            <HiEyeOff className="text-gray-400" />
          ) : (
            <HiEye className="text-gray-400" />
          )}
        </button> */}
        </div>
      ) : (
        <div
          className={`relative flex items-center border border-custom-grey rounded-[7px] p-3 placeholder-slate-400 bg-custom-dashboard-bg font-light mb-5 ${containerClassName}`}
        >
          <>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              value={value}
              onChange={onChange}
              placeholder={placeholder ? placeholder : 'Password'}
              required
              maxLength={maxLength}
              className={`focus:outline-none w-[100%] lg:w-[100%] lg:text-[16px] text-[14px] font-light bg-custom-dashboard-bg ${className}`}
            />
            {showPassword ? (
              <FaEye
                style={{
                  color: '#9F9F9F',
                  width: '17px',
                  height: '17px',
                  cursor: 'pointer',
                }}
                onClick={() => togglePasswordVisibility()}
              />
            ) : (
              <FaEyeSlash
                style={{
                  color: '#9F9F9F',
                  width: '17px',
                  height: '17px',
                  cursor: 'pointer',
                }}
                onClick={() => togglePasswordVisibility()}
              />
            )}
          </>
        </div>
      )}
    </>
  );
});

export default AuthInput;
