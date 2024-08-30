import React, { useState, useEffect } from "react";
import { DivisonSelectRuleAppliedTo } from "./DivisionSelectRuleAppliedTo";
import { DivisionSelect } from "./DivisonSelect";

const EachDivisonRule: React.FC<{ index: number; onRemove: (index: number) => void; updateMessage: (index: number, message: string) => void }> = ({ index, onRemove, updateMessage }) => {
  const [borrowingAllowed, setBorrowingAllowed] = useState(true);
  const [ruleAppliedDivison, setRuleAppliedDivison] = useState<string[]>(["Men's"]);
  const [selectedDivisions, setSelectedDivisions] = useState<string[]>(["All"]);

  useEffect(() => {
    let message = `Rule ${index + 1}: Divisions applied: ${ruleAppliedDivison.join(", ")}. `;
    message += borrowingAllowed ? "Borrowing allowed." : "No Borrowing allowed.";
    updateMessage(index, message);
  }, [borrowingAllowed, ruleAppliedDivison, updateMessage, index]);

  return (
    <div className="flex justify-between mt-10">
      <DivisonSelectRuleAppliedTo
        selectedDivisions={ruleAppliedDivison}
        setSelectedDivisions={setRuleAppliedDivison}
      />
      <div>
        <div className="flex items-center">
          <label className="inline-flex items-center">
            <input
              type="radio"
              className="form-radio"
              name={`borrowing-${index}`}
              checked={borrowingAllowed}
              onChange={() => setBorrowingAllowed(true)}
            />
            <span className="ml-2">Borrowing</span>
          </label>
          <label className="inline-flex items-center ml-4">
            <input
              type="radio"
              className="form-radio"
              name={`borrowing-${index}`}
              checked={!borrowingAllowed}
              onChange={() => setBorrowingAllowed(false)}
            />
            <span className="ml-2">No Borrowing</span>
          </label>
        </div>
        {borrowingAllowed && (
          <DivisionSelect
            selectedDivisions={selectedDivisions}
            setSelectedDivisions={setSelectedDivisions}
          />
        )}
      </div>
      <div
        className="text-red-500 inline-flex items-center hover:cursor-pointer"
        onClick={() => onRemove(index)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
          />
        </svg>
      </div>
    </div>
  );
};

export default EachDivisonRule;
