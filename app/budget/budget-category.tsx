'use client'

import { useState } from 'react';

interface BudgetCategoryProps {
  group: {
    name: string;
    totalSpent: number;
    budgetLimit: number;
    transactions: Array<{
      date: string;
      place: string;
      amount: number;
    }>;
  };
}

export default function BudgetCategory({ group }: BudgetCategoryProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [newLimit, setNewLimit] = useState(group.budgetLimit.toString());
  const [loading, setLoading] = useState(false);
  const [budgetLimit, setBudgetLimit] = useState(group.budgetLimit);

  const percentUsed = Math.min(
    (group.totalSpent / budgetLimit) * 100,
    100
  );

  async function handleSave() {
    setLoading(true);
    try {
      const res = await fetch('/api/budget', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          category: group.name,
          budgetLimit: parseFloat(newLimit),
        }),
      });

      if (res.ok) {
        setBudgetLimit(parseFloat(newLimit));
        setIsEditing(false);
      } else {
        alert('Failed to update budget limit');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error updating budget limit');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition">
      <div className="flex justify-between items-start">
        <h2 className="text-lg font-semibold">{group.name}</h2>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="text-sm bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded"
          >
            Edit
          </button>
        )}
      </div>

      {isEditing ? (
        <div className="mt-2 space-y-2">
          <label className="block text-sm text-gray-700">
            Budget Limit: $
            <input
              type="number"
              value={newLimit}
              onChange={(e) => setNewLimit(e.target.value)}
              step="0.01"
              min="0"
              className="w-24 ml-2 px-2 py-1 border border-gray-300 rounded"
            />
          </label>
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              disabled={loading}
              className="bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white px-3 py-1 rounded text-sm"
            >
              {loading ? 'Saving...' : 'Save'}
            </button>
            <button
              onClick={() => {
                setIsEditing(false);
                setNewLimit(budgetLimit.toString());
              }}
              className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <p className="text-gray-600">
          Spent: ${group.totalSpent.toFixed(2)} / ${budgetLimit.toFixed(2)}
        </p>
      )}

      <div className="mt-2 h-2 w-full bg-gray-200 rounded-full">
        <div
          className={`h-2 rounded-full ${
            percentUsed > 100 ? 'bg-red-500' : percentUsed > 80 ? 'bg-red-500' : 'bg-blue-500'
          }`}
          style={{ width: `${Math.min(percentUsed, 100)}%` }}
        />
      </div>

      {percentUsed > 100 && (
        <p className="text-red-500 text-sm mt-1">Over budget by ${(group.totalSpent - budgetLimit).toFixed(2)}</p>
      )}

      <ul className="mt-4 space-y-1 text-sm text-gray-700">
        {group.transactions.map((tx, i) => (
          <li key={i}>
            {tx.date} — {tx.place} — ${tx.amount.toFixed(2)}
          </li>
        ))}
      </ul>
    </div>
  );
}
