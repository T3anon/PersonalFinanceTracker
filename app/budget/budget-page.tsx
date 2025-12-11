'use client'

import { useState, useMemo } from 'react';
import BudgetCategory from './budget-category';

interface Transaction {
  id: number;
  category: string;
  cost: number;
  place: string;
  date: string;
  userId: number;
}

interface Budget {
  id: number;
  userId: number;
  category: string;
  budgetLimit: number;
}

interface BudgetPageProps {
  transactions: Transaction[];
  budgets: Budget[];
}

export default function BudgetPage({ transactions, budgets }: BudgetPageProps) {
  // Extract unique months and sort by most recent
  const availableMonths = useMemo(() => {
    const months = new Set<string>();
    transactions.forEach((tx) => {
      const date = new Date(tx.date);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      months.add(monthKey);
    });
    return Array.from(months).sort().reverse();
  }, [transactions]);

  const [selectedMonth, setSelectedMonth] = useState<string>(availableMonths[0] || '');

  // Filter transactions by selected month
  const filteredTransactions = useMemo(() => {
    if (!selectedMonth) return transactions;
    
    return transactions.filter((tx) => {
      const date = new Date(tx.date);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      return monthKey === selectedMonth;
    });
  }, [transactions, selectedMonth]);

  // Create a map of category to budget limit
  const budgetMap = new Map(budgets.map((b) => [b.category, b.budgetLimit]));

  // Group filtered transactions by category
  const categoryMap = new Map<
    string,
    {
      name: string;
      totalSpent: number;
      budgetLimit: number;
      transactions: Array<{
        date: string;
        place: string;
        amount: number;
      }>;
    }
  >();

  filteredTransactions.forEach((tx) => {
    if (!categoryMap.has(tx.category)) {
      const budgetLimit = budgetMap.get(tx.category) ?? 500;
      categoryMap.set(tx.category, {
        name: tx.category,
        totalSpent: 0,
        budgetLimit: budgetLimit,
        transactions: [],
      });
    }

    const group = categoryMap.get(tx.category)!;
    group.totalSpent += tx.cost;
    group.transactions.push({
      date: new Date(tx.date).toLocaleDateString(),
      place: tx.place,
      amount: tx.cost,
    });
  });

  const budgetGroups = Array.from(categoryMap.values());

  const getMonthLabel = (monthKey: string) => {
    const [year, month] = monthKey.split('-');
    const date = new Date(parseInt(year), parseInt(month) - 1);
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  return (
    <>
      <h1 className="text-2xl font-bold text-center my-6">Budget Overview</h1>

      <div className="text-center mb-6">
        <a
          href="/budget/create-transaction"
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition"
        >
          + Create Transaction
        </a>
      </div>

      {/* Month Selector */}
      {availableMonths.length > 0 && (
        <div className="max-w-2xl mx-auto mb-6">
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          >
            {availableMonths.map((month) => (
              <option key={month} value={month}>
                {getMonthLabel(month)}
              </option>
            ))}
          </select>
          <p className="text-xs text-gray-600 mt-2 text-center">
            Showing {getMonthLabel(selectedMonth)}
          </p>
        </div>
      )}

      {budgetGroups.length === 0 ? (
        <p className="text-center text-gray-500">No transactions found for this month.</p>
      ) : null}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {budgetGroups.map((group, index) => (
          <BudgetCategory key={index} group={group} />
        ))}
      </div>
    </>
  );
}
