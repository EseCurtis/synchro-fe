"use client";

import React, { useState, InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string;
    label?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const CurrencyConverter: React.FC<InputProps> = ({ name, label, onChange, ...rest }) => {
  const [amount, setAmount] = useState<any | ''>('');
  const [selectedCurrency, setSelectedCurrency] = useState<string>('USD');

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Validate that the value is a number or an empty string (for clearing the field)
    if (/^\d*\.?\d*$/.test(value) || value === '') {
      // Use parseFloat to convert the value to a number or NaN
      const numericValue = parseFloat(value);
      // Check if it's a valid number or NaN
      if (!isNaN(numericValue) || value === '') {
        setAmount(value);
      }
    }
  };
  

  const handleCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCurrency(e.target.value);
  };

  return (
    <div className="">
      <div className="flex items-center border rounded-md h-[48px] mt-3">
        <select
          className="p-2 my-1 mr-2 outline-none border-left rounded-l w-20"
          value={selectedCurrency}
          onChange={handleCurrencyChange}
        >
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="GBP">GBP</option>
          {/* Add more currency options as needed */}
        </select>
        <input
          name={name}
          className=" my-[5px] px-[39px] pl-2 w-[100%] sm:w-[461px]  outline-none  "
          style={{
            border: "none",
            borderLeft: "1px solid #DDE2E5",
          }}
          value={amount}
          onChange={handleAmountChange}
          {...rest}
        />
      </div>
    </div>
  );
};

export default CurrencyConverter;
