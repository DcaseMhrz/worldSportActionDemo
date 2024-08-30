import React, { useState, useRef, useEffect } from 'react';

export const SelectRounds: React.FC<{
  selectedRounds: string[];
  setSelectedRounds: (rounds: string[]) => void;
}> = ({ selectedRounds, setSelectedRounds }) => {
  const rounds = Array.from({ length: 12 }, (_, i) => `R${i + 1}`);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleRoundChange = (round: string) => {
    let updatedRounds = selectedRounds.includes(round)
      ? selectedRounds.filter((r) => r !== round)
      : [...selectedRounds, round];
    setSelectedRounds(updatedRounds);
  };

  const handleRemoveChip = (round: string) => {
    setSelectedRounds(selectedRounds.filter((r) => r !== round));
  };

  return (
    <div ref={dropdownRef} className="relative w-full max-w-md mt-4">
      <p className="text-left mb-2">Select Rounds:</p>

      <div
        className="border rounded-md p-2 flex flex-wrap cursor-pointer"
        onClick={toggleDropdown}
      >
        {selectedRounds.map((round) => (
          <div
            key={round}
            className="bg-gray-200 text-gray-800 rounded-full px-2 py-1 m-1 flex items-center"
          >
            <span className="mr-2">{round}</span>
            <button
              className="text-gray-500 hover:text-gray-700"
              onClick={(e) => {
                e.stopPropagation();
                handleRemoveChip(round);
              }}
            >
              &#x2715;
            </button>
          </div>
        ))}
        <div className="ml-2 text-gray-500">
          {selectedRounds.length === 0 ? 'Select rounds' : ''}
        </div>
      </div>

      {dropdownOpen && (
        <div className="absolute left-0 w-full mt-1 border bg-white rounded-md shadow-lg z-10">
          {rounds.map((round) => (
            <div key={round} className="p-2 hover:bg-gray-100">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={selectedRounds.includes(round)}
                  onChange={() => handleRoundChange(round)}
                  className="form-checkbox"
                />
                <span className="ml-2">{round}</span>
              </label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
