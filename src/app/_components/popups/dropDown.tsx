//@ts-nocheck
import { DROPDOWN_STYLE } from "@/constant";
import React, { useState, useEffect, useRef, ReactNode, FC } from "react";

interface IDropdown {
  view: ReactNode;
  children: ReactNode;
}

const Dropdown: FC<IDropdown> = ({ view, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const closeDropdown = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", closeDropdown);

    return () => {
      document.removeEventListener("mousedown", closeDropdown);
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <div onClick={toggleDropdown} className="cursor-pointer z-10">
        {view}
      </div>

      {isOpen && (
        <div
          className="origin-top-right z-50 absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
        >
          <div className={`${DROPDOWN_STYLE}`} role="none">
            <ul className="cursor-pointer">{children}</ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
