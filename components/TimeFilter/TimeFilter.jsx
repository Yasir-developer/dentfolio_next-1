import React from "react";

const TimeFilter = ({ selectedOption, onSelectOption }) => {
  const options = [
    { label: "Last 24 hours", value: "last24" },
    { label: "Last week", value: "lastWeek" },
    { label: "Last month", value: "lastMonth" },
    { label: "Last year", value: "lastYear" },
  ];

  return (
    <div className="flex flex-wrap items-center gap-4">
      {options.map((option) => (
        <button
          key={option.value}
          className={`py-2  lg:text-[14px] text-[12px] ${
            selectedOption === option.value
              ? "text-custom-blue font-medium underline decoration-solid decoration-2"
              : "text-[#858585]"
          }`}
          onClick={() => onSelectOption(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};

export default TimeFilter;
