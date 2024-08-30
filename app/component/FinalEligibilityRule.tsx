import React, { useState } from 'react';
import { DivisonSelectRuleAppliedTo } from './DivisionSelectRuleAppliedTo';
import { SelectRounds } from './selectRound';


const FinalsEligibilityRule: React.FC<{ index: number; onRemove: (index: number) => void }> = ({ index, onRemove }) => {
  const [ruleAppliedDivison, setRuleAppliedDivison] = useState<string[]>(["Men's"]);
  const [minMatches, setMinMatches] = useState(10);
  const [includeBorrowedPlayers, setIncludeBorrowedPlayers] = useState(false);
  const [includeStartedMatchesOnly, setIncludeStartedMatchesOnly] = useState(false);
  const [eligibleRounds, setEligibleRounds] = useState('all');
  const [selectedRounds, setSelectedRounds] = useState<string[]>([]);

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mt-4">
      <div className="flex justify-between items-center">
        <DivisonSelectRuleAppliedTo
          selectedDivisions={ruleAppliedDivison}
          setSelectedDivisions={setRuleAppliedDivison}
        />
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
      
      <div className="mt-4">
        <label className="block mb-2">Min Number of Matches Played</label>
        <input
          type="number"
          className="form-input w-20"
          value={minMatches}
          onChange={(e) => setMinMatches(parseInt(e.target.value, 10))}
        />
      </div>

      <div className="mt-4">
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

      <div className="mt-4">
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

      <div className="mt-4">
        <label className="block mb-2">How are Eligible Rounds Determined</label>
        <div className="flex items-center">
          <label className="inline-flex items-center mr-4">
            <input
              type="radio"
              className="form-radio"
              name={`eligibleRounds-${index}`}
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
              name={`eligibleRounds-${index}`}
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
  );
};

export default FinalsEligibilityRule;
