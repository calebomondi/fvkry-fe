import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, PieChart, Pie, Cell, LineChart, Line, CartesianGrid, ResponsiveContainer } from 'recharts';
import { UserVaultDashboardProps } from '@/types';

const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(value);
};

const COLORS: string[] = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

const UserVaultDashboard: React.FC<UserVaultDashboardProps> = ({ data }) => {
  const [selectedTab, setSelectedTab] = useState<'overview' | 'assets' | 'analytics'>('overview');
  
  if (!data) {
    return <p>No Data!</p>
  }

  const renderOverview = (): JSX.Element => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {/* Total value card */}
      <div className="dark:bg-base-300 rounded-lg p-6 shadow-md">
        <h3 className="text-lg font-medium dark:text-gray-600">Total Locked Value</h3>
        <p className="text-3xl font-bold text-blue-600 mt-2">{formatCurrency(data.totalValueUSD)}</p>
        <p className="text-sm text-gray-500 mt-1">Across {data.totalVaults} vaults</p>
      </div>
      
      {/* Average lock time */}
      <div className="dark:bg-base-300 rounded-lg shadow-md p-6">
        <h3 className="text-lg font-medium dark:text-gray-600">Average Lock Time</h3>
        <p className="text-3xl font-bold text-green-600 mt-2">{Math.round(data.avgLockDays)} days</p>
        <p className="text-sm text-gray-500 mt-1">All assets combined</p>
      </div>
      
      {/* Lock Types */}
      <div className="dark:bg-base-300 rounded-lg shadow-md p-6">
        <h3 className="text-lg font-medium dark:text-gray-600">Lock Types</h3>
        <div className="flex justify-around items-center mt-2">
          <div className="text-center">
            <p className="text-2xl font-bold text-indigo-600">{data.lockTypeCounts.fixed}</p>
            <p className="text-sm text-gray-500">Fixed</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-purple-600">{data.lockTypeCounts.goal}</p>
            <p className="text-sm text-gray-500">Goal</p>
          </div>
        </div>
      </div>
      
      {/* Upcoming unlocks */}
      <div className="dark:bg-base-300 rounded-lg shadow-md p-6 md:col-span-2">
        <h3 className="text-lg font-medium dark:text-gray-600">Upcoming Unlocks (Next 7 Days)</h3>
        {data.upcomingUnlocks.length > 0 ? (
          <div className="mt-2 overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Asset</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unlock Date</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Days Left</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {data.upcomingUnlocks.map((unlock) => (
                  <tr key={unlock.id}>
                    <td className="px-4 py-2 whitespace-nowrap">{unlock.title}</td>
                    <td className="px-4 py-2 whitespace-nowrap">{unlock.asset}</td>
                    <td className="px-4 py-2 whitespace-nowrap">{unlock.amount}</td>
                    <td className="px-4 py-2 whitespace-nowrap">{new Date(unlock.unlockDate).toLocaleDateString()}</td>
                    <td className="px-4 py-2 whitespace-nowrap">
                      <span className="px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
                        {unlock.daysRemaining} days
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500 mt-2">No unlocks expriring in the next 7 days</p>
        )}
      </div>
      
      {/* Asset distribution */}
      <div className="dark:bg-base-300 rounded-lg shadow-md p-6">
        <h3 className="text-lg font-medium dark:text-gray-600">Asset Distribution</h3>
        <div className="h-64 mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data.assetValues}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="valueUSD"
                nameKey="symbol"
                label={({ symbol, percent }) => `${symbol} ${(percent * 100).toFixed(0)}%`}
              >
                {data.assetValues.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => formatCurrency(Number(value))} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
  
  const renderAssets = (): JSX.Element => (
    <div className="space-y-6">
      <h3 className="text-xl font-medium text-gray-600">Asset Overview</h3>
      
      {/* Asset details table */}
      <div className="dark:bg-base-300 rounded-lg shadow-md overflow-hidden">
        <table className="min-w-full divide-y divide-gray-600">
          <thead className="b">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Asset</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Amount</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current Value</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Avg Lock Period</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lock Types</th>
            </tr>
          </thead>
          <tbody className="dark:bg-base-300 divide-y divide-gray-200">
            {data.assetValues.map((asset) => {
              const avgDaysAsset = data.avgLockDaysByAsset.find(a => a.symbol === asset.symbol);
              const avgDays = avgDaysAsset ? avgDaysAsset.avgDays : 0;
              const lockTypes = data.lockTypeByAsset[asset.symbol] || { fixed: 0, goal: 0 };
              
              return (
                <tr key={asset.address}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 rounded-lg border dark:border-gray-600 flex items-center justify-center text-lg font-bold">
                        {asset.symbol.charAt(0)}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-600">{asset.symbol}</div>
                        <div className="text-xs text-gray-500 truncate w-32" title={asset.address}>
                          {asset.address.substring(0, 6)}...{asset.address.substring(asset.address.length - 4)}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-600">{asset.totalAmount} {asset.symbol}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-600">{formatCurrency(asset.valueUSD)}</div>
                    <div className="text-xs text-gray-500">@ {formatCurrency(asset.price)} per {asset.symbol}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-600">{Math.round(avgDays)} days</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex space-x-2">
                      <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                        Fixed: {lockTypes.fixed}
                      </span>
                      <span className="px-2 py-1 text-xs rounded-full bg-purple-100 text-purple-800">
                        Goal: {lockTypes.goal}
                      </span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      
      {/* Asset lock duration chart */}
      <div className="mt-6 dark:bg-base-300 rounded-lg shadow-md p-6">
        <h3 className="text-lg font-medium dark:text-gray-600">Average Lock Duration by Asset</h3>
        <div className="h-64 mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data.avgLockDaysByAsset}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="symbol" />
              <YAxis label={{ value: 'Days', angle: -90, position: 'insideLeft' }} />
              <Tooltip formatter={(value) => [`${Math.round(Number(value))} days`, 'Avg Lock Period']} />
              <Bar dataKey="avgDays" fill="#8884d8" name="Average Lock Days" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
  
  const renderAnalytics = (): JSX.Element => (
    <div className="space-y-6">
      <h3 className="text-xl font-medium text-gray-600">Lock Analytics</h3>
      {/* Lock Type Distribution */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="dark:bg-base-300 rounded-lg shadow-md p-6">
          <h3 className="text-lg font-medium dark:text-gray-600">Lock Type Distribution</h3>
          <div className="h-64 mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={[
                    { name: 'Fixed', value: data.lockTypeCounts.fixed },
                    { name: 'Goal', value: data.lockTypeCounts.goal }
                  ]}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={70}
                  fill="#8884d8"
                  dataKey="value"
                  nameKey="name"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  <Cell fill="#4f46e5" />
                  <Cell fill="#7c3aed" />
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Lock Duration Distribution */}
        <div className="dark:bg-base-300 rounded-lg shadow-md p-6">
          <h3 className="text-lg font-medium dark:text-gray-600">Lock Duration Type</h3>
          <div className="h-64 mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={[
                  { name: 'Days', value: data.durationDistribution.days },
                  { name: 'Weeks', value: data.durationDistribution.weeks },
                  { name: 'Months', value: data.durationDistribution.months }
                ]}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#00C49F" name="Number of Vaults" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      {/* Monthly Activity Chart */}
      <div className="dark:bg-base-300 rounded-lg shadow-md p-6">
        <h3 className="text-lg font-medium dark:text-gray-600">Monthly Locking Activity</h3>
        <div className="h-64 mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data.monthlyActivity.sort((a, b) => a.month.localeCompare(b.month))}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="count" stroke="#8884d8" name="New Locks" activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
  
  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-2 lg:px-8 py-2 min-h-screen">
      {/* Navigation tabs */}
      <div className="border-b border-gray-600 mb-6 sticky top-20 dark:bg-black bg-white shadow-md dark:bg-opacity-70 px-3 rounded-sm z-10">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'overview' as const, label: 'Overview' }, 
            { id: 'assets' as const, label: 'Assets' }, 
            { id: 'analytics' as const, label: 'Analytics' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedTab(tab.id)}
              className={`
                py-4 px-1 border-b-2 font-medium text-sm
                ${selectedTab === tab.id
                  ? 'border-amber-500 text-amber-600'
                  : 'border-transparent text-amber-400  hover:dark:text-gray-600 hover:border-gray-300'}
              `}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
      
      {/* Tab content */}
      <div className="mt-6">
        {selectedTab === 'overview' && renderOverview()}
        {selectedTab === 'assets' && renderAssets()}
        {selectedTab === 'analytics' && renderAnalytics()}
      </div>
    </div>
  );
};

export default UserVaultDashboard;