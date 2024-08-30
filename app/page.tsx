'use client'
import React, { useState, useEffect } from "react";
import EachDivisonRule from "./component/EachDivisonRule";
import { DivisionSelect } from "./component/DivisonSelect";

export default function Home() {
  const [allDivisionsChecked, setAllDivisionsChecked] = useState(true);
  const [borrowingAllowed, setBorrowingAllowed] = useState(true);
  const [selectedDivisions, setSelectedDivisions] = useState<string[]>(["All"]);
  const [divisionRules, setDivisionRules] = useState<number[]>([]);
  const [messages, setMessages] = useState<string[]>([]);

  const handleAddDivisionRule = () => {
    setDivisionRules([...divisionRules, divisionRules.length]);
  };

  const handleRemoveDivisionRule = (index: number) => {
    setDivisionRules(divisionRules.filter((_, i) => i !== index));
    setMessages(messages.filter((_, i) => i !== index));
  };

  useEffect(() => {
    if (!allDivisionsChecked && divisionRules.length === 0) {
      handleAddDivisionRule(); // Automatically add the first division rule
    }
  }, [allDivisionsChecked]);

  const updateMessage = (index: number, message: string) => {
    const newMessages = [...messages];
    newMessages[index] = message;
    setMessages(newMessages);
  };

  const handleSave = () => {
    let finalMessage = "";

    if (allDivisionsChecked) {
      if (borrowingAllowed) {
        finalMessage += `All Divisions: Borrowing allowed. Divisions applied: ${selectedDivisions.join(", ")}\n`;
      } else {
        finalMessage += `All Divisions: No Borrowing allowed.\n`;
      }
    } else {
      finalMessage = messages.join("\n");
    }

    alert(finalMessage);
  };

  return (
    <div className="flex justify-center mt-10">
      <div className="bg-white p-8 rounded-lg shadow-md w-4/5">
        <h3 className="text-xl font-bold mb-4">Player Borrowing Restriction</h3>

        <div className="flex items-center justify-between w-full">
          <div className="space-y-10 items-center">
            <label>
              <input
                type="checkbox"
                className="form-checkbox"
                checked={allDivisionsChecked}
                onChange={() => setAllDivisionsChecked(!allDivisionsChecked)}
              />
              <span className="ml-2">All Divisions</span>
            </label>
          </div>

          {allDivisionsChecked && (
            <div className="items-center space-y-8">
              <div className="flex items-center">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    className="form-radio"
                    name="borrowing"
                    checked={borrowingAllowed}
                    onChange={() => setBorrowingAllowed(true)}
                  />
                  <span className="ml-2">Borrowing</span>
                </label>
                <label className="inline-flex items-center ml-4">
                  <input
                    type="radio"
                    className="form-radio"
                    name="borrowing"
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
          )}
        </div>

        {!allDivisionsChecked && (
          <div>
            {divisionRules.map((rule, index) => (
              <EachDivisonRule
                key={index}
                index={index}
                onRemove={handleRemoveDivisionRule}
                updateMessage={updateMessage}
              />
            ))}
            <p
              className="text-red-600 mt-20 hover:cursor-pointer"
              onClick={handleAddDivisionRule}
            >
              + Age Group/Division
            </p>
          </div>
        )}

        <div className="flex justify-center mt-6">
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
