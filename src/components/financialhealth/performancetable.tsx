import React, { useState, useMemo } from 'react';
import { HealthRecord } from '@/types';

interface TokenPerformanceTableProps {
  transactions: HealthRecord[];
}

const TokenPerformanceTable: React.FC<TokenPerformanceTableProps> = ({ transactions }) => {
  const [filterToken, setFilterToken] = useState<string>('all');
  
  // Get unique token symbols for filter dropdown
  const uniqueTokens = useMemo(() => {
    const tokens = new Set(transactions.map(tx => tx.token.symbol));
    return ['all', ...Array.from(tokens)];
  }, [transactions]);
  
  // Filter transactions based on selected token
  const filteredTransactions = useMemo(() => {
    if (filterToken === 'all') {
      return transactions;
    }
    return transactions.filter(tx => tx.token.symbol === filterToken);
  }, [transactions, filterToken]);
  
  // Calculate summary values
  const summary = useMemo(() => {
    let totalPositive = 0;
    let totalNegative = 0;
    
    filteredTransactions.forEach(tx => {
      const diff = tx.transfer.value_diff;
      if (diff >= 0) {
        totalPositive += diff;
      } else {
        totalNegative -= diff;
      }
    });
    
    return {
      Positive: totalPositive,
      Negative: totalNegative,
      Total: (totalPositive - totalNegative)
    };
  }, [filteredTransactions]);
  
  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };
  
  return (
    <div className="p-4 max-w-6xl mx-auto">
      {/* Summary Cards */}
      <div className="sticky top-20 dark:bg-black/90 bg-white/90 p-2 m-2 rounded-md">
        <div className='flex flex-col md:flex-row justify-between items-center'>
            <h1 className="text-2xl font-bold mb-6 text-amber-600">Financial Health Status</h1>
            <div className="mb-4 sticky top-28 dark:bg-black/90 bg-white/90 p-2 m-2 rounded-md">
                <label htmlFor="tokenFilter" className="mr-2 font-medium">Filter by Token:</label>
                <select 
                id="tokenFilter"
                value={filterToken}
                onChange={(e) => setFilterToken(e.target.value)}
                className="border border-gray-300 rounded px-3 py-1"
                >
                {uniqueTokens.map(token => (
                    <option key={token} value={token}>
                    {token === 'all' ? 'All Tokens' : token}
                    </option>
                ))}
                </select>
            </div>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-6'>
            <div className="bg-green-100 p-4 rounded shadow">
            <h2 className="text-lg font-semibold text-green-800">Profits</h2>
            <p className="text-2xl font-bold text-green-600">${summary.Positive.toFixed(2)}</p>
            </div>
            <div className="bg-red-100 p-4 rounded shadow">
            <h2 className="text-lg font-semibold text-red-800">Losses</h2>
            <p className="text-2xl font-bold text-red-600">-${summary.Negative.toFixed(2)}</p>
            </div>
            <div className={`p-4 rounded shadow ${summary.Total >= 0 ? 'bg-blue-100' : 'bg-orange-100'}`}>
            <h2 className={`text-lg font-semibold ${summary.Total >= 0 ? 'text-blue-700' : 'text-orange-700'}`}>Net Performance</h2>
            <p className={`text-2xl font-bold ${summary.Total >= 0 ? 'text-blue-600' : 'text-orange-600'}`}>
                {summary.Total >= 0 ? `$${summary.Total.toFixed(2)}` : `-$${-summary.Total.toFixed(2)}`}
            </p>
            </div>
        </div>
      </div>
      
      {/* Transactions Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border-gray-600 shadow-md rounded-lg overflow-x-scroll">
          <thead className="">
            <tr>
              <th className="py-3 px-4 text-left border-b">Token</th>
              <th className="py-3 px-4 text-left border-b">Symbol</th>
              <th className="py-3 px-4 text-left border-b">Date</th>
              <th className="py-3 px-4 text-right border-b">Amount</th>
              <th className="py-3 px-4 text-right border-b">Value Then ($)</th>
              <th className="py-3 px-4 text-right border-b">Value Now ($)</th>
              <th className="py-3 px-4 text-right border-b">Value Diff ($)</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.map((tx, index) => {
              const valueDiff = tx.transfer.value_diff;
              return (
                <tr key={index}>
                  <td className="py-3 px-4 border-b">{tx.token.name}</td>
                  <td className="py-3 px-4 border-b">{tx.token.symbol}</td>
                  <td className="py-3 px-4 border-b">{formatDate(tx.formattedDate)}</td>
                  <td className="py-3 px-4 text-right border-b">{tx.transfer.tokenAmount}</td>
                  <td className="py-3 px-4 text-right border-b">{tx.transfer.value_then}</td>
                  <td className="py-3 px-4 text-right border-b">{tx.transfer.value_now}</td>
                  <td className={`py-3 px-4 text-right border-b font-medium ${
                    valueDiff >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {tx.transfer.value_diff}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      
      {filteredTransactions.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No transactions found for the selected filter.
        </div>
      )}
    </div>
  );
};

export default TokenPerformanceTable;
