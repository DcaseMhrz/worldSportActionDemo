'use client'
import React, { useState, useRef, useEffect } from "react";

// DivisionSelect Component
export const DivisionSelect: React.FC<{
  selectedDivisions: string[];
  setSelectedDivisions: (divisions: string[]) => void;
}> = ({ selectedDivisions, setSelectedDivisions }) => {
  const divisions = [
    "All",
    "Men's",
    "Women's",
    "Women's U23",
    "Men's U23",
    "Men's (FQPL1)",
    "Men's (FQPL2)",
  ];

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleDivisionChange = (division: string) => {
    if (division === "All") {
      if (selectedDivisions.includes("All")) {
        setSelectedDivisions([]);
      } else {
        setSelectedDivisions(["All"]);
      }
    } else {
      let updatedDivisions = selectedDivisions.includes(division)
        ? selectedDivisions.filter((d) => d !== division)
        : [...selectedDivisions, division];
      // If any other division is selected, remove "All"
      if (updatedDivisions.includes("All")) {
        updatedDivisions = updatedDivisions.filter((d) => d !== "All");
      }
      setSelectedDivisions(updatedDivisions);
    }
  };

  const handleRemoveChip = (division: string) => {
    setSelectedDivisions(selectedDivisions.filter((d) => d !== division));
  };

  return (
    <div ref={dropdownRef} className="relative w-full max-w-md ">
      <p className="text-left mb-2">Select Divisions Players can be borrowed from:</p>

      <div
        className="border rounded-md p-2 flex flex-wrap cursor-pointer"
        onClick={toggleDropdown}
      >
        {selectedDivisions.map((division) => (
          <div
            key={division}
            className="bg-gray-200 text-gray-800 rounded-full px-2 py-1 m-1 flex items-center"
          >
            <span className="mr-2">{division}</span>
            <button
              className="text-gray-500 hover:text-gray-700"
              onClick={(e) => {
                e.stopPropagation();
                handleRemoveChip(division);
              }}
            >
              &#x2715;
            </button>
          </div>
        ))}
        <div className="ml-2 text-gray-500">
          {selectedDivisions.length === 0 ? "Select divisions" : ""}
        </div>
      </div>

      {dropdownOpen && (
        <div className="absolute left-0 w-full mt-1 border bg-white rounded-md shadow-lg z-10">
          {divisions.map((division) => (
            <div key={division} className="p-2 hover:bg-gray-100">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={selectedDivisions.includes(division)}
                  onChange={() => handleDivisionChange(division)}
                  className="form-checkbox"
                />
                <span className="ml-2">{division}</span>
              </label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};