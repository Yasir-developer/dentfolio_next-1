// import clsx from 'clsx';
import { forwardRef } from "react";
// import { Form } from "react-bootstrap";
// import styles from "./Input.module.css";

const CheckInput = ({
  type,
  id,
  placeholder,
  value,
  onChange,
  checked,
  label,
}) => {
  return (
    <div className="flex items-center">
      <input
        type={type}
        id={id}
        checked={checked}
        onChange={onChange}
        className="checkbox-round"
        // className="appearance-none rounded bg-black  border-gray-300 text-blue-500 focus:ring-blue-500 focus:border-blue-500"
      />
      <label htmlFor={id} className="ml-2 text-sm text-gray-700">
        {label}
      </label>
    </div>
  );
};

export default CheckInput;
