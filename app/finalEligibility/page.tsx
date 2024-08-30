'use client'
import React, { useState, useEffect } from 'react';
import { SelectRounds } from '../component/selectRound';
import FinalsEligibilityRule from '../component/FinalEligibilityRule';

const FinalEligibility = () => {
  const [isEnabled, setIsEnabled] = useState(true);
  const [allDivisionsChecked, setAllDivisionsChecked] = useState(true);
  const [minMatches, setMinMatches] = useState(10);
  const [includeBorrowedPlayers, setIncludeBorrowedPlayers] = useState(false);
  const [includeStartedMatchesOnly, setIncludeStartedMatchesOnly] = useState(false);
  const [eligibleRounds, setEligibleRounds] = useState('all');
  const [selectedRounds, setSelectedRounds] = useState<string[]>([]);
  const [divisionRules, setDivisionRules] = useState<number[]>([]);

  const handleAddDivisionRule = () => {
    setDivisionRules([...divisionRules, divisionRules.length]);
  };

  const handleRemoveDivisionRule = (index: number) => {
    setDivisionRules(divisionRules.filter((_, i) => i !== index));
  };

  useEffect(() => {
    if (!allDivisionsChecked && divisionRules.length === 0) {
      handleAddDivisionRule(); // Automatically add the first division rule
    }
  }, [allDivisionsChecked]);

  return (
    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-3xl mx-auto">
      <h3 className="text-xl font-bold mb-4">Finals Eligibility</h3>

      <div className="mb-4">
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            className="form-checkbox"
            checked={isEnabled}
            onChange={() => setIsEnabled(!isEnabled)}
          />
          <span className="ml-2">Enable Finals Eligibility Rules</span>
        </label>
      </div>

      {isEnabled && (
        <>
          <div className="mb-4">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                className="form-checkbox"
                checked={allDivisionsChecked}
                onChange={() => setAllDivisionsChecked(!allDivisionsChecked)}
              />
              <span className="ml-2">All Divisions</span>
            </label>
          </div>

          {allDivisionsChecked ? (
            <div>
              <div className="flex space-x-6 mb-4">
                <label className="block mb-2">Min Number of Matches Played</label>
                <input
                  type="number"
                  className="form-input w-20 border-2"
                  value={minMatches}
                  onChange={(e) => setMinMatches(parseInt(e.target.value, 10))}
                />
              </div>

              <div className="mb-4">
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    className="form-checkbox"
                    checked={includeBorrowedPlayers}
                    onChange={() => setIncludeBorrowedPlayers(!includeBorrowedPlayers)}
                  />
                  <span className="ml-2">Include Borrowed Players</span>
                </label>
              </div>

              <div className="mb-4">
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    className="form-checkbox"
                    checked={includeStartedMatchesOnly}
                    onChange={() => setIncludeStartedMatchesOnly(!includeStartedMatchesOnly)}
                  />
                  <span className="ml-2">Include Started Matches Only</span>
                </label>
              </div>

              <div className="mb-4">
                <label className="block mb-2">How are Eligible Rounds Determined</label>
                <div className="flex items-center">
                  <label className="inline-flex items-center mr-4">
                    <input
                      type="radio"
                      className="form-radio"
                      name="eligibleRoundsAll"
                      value="all"
                      checked={eligibleRounds === 'all'}
                      onChange={() => setEligibleRounds('all')}
                    />
                    <span className="ml-2">All Rounds</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      className="form-radio"
                      name="eligibleRoundsAll"
                      value="select"
                      checked={eligibleRounds === 'select'}
                      onChange={() => setEligibleRounds('select')}
                    />
                    <span className="ml-2">Select Rounds</span>
                  </label>
                </div>
              </div>

              {eligibleRounds === 'select' && (
                <SelectRounds
                  selectedRounds={selectedRounds}
                  setSelectedRounds={setSelectedRounds}
                />
              )}
            </div>
          ) : (
            <div>
              {divisionRules.map((rule, index) => (
                <FinalsEligibilityRule
                  key={index}
                  index={index}
                  onRemove={handleRemoveDivisionRule}
                />
              ))}
              <p
                className="text-red-600 mt-4 hover:cursor-pointer"
                onClick={handleAddDivisionRule}
              >
                + Add Another Division Rule
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default FinalEligibility;
