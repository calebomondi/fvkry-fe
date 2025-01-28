
export const tokens = [
{
    name: 'Bitcoin',
    symbol: 'BTC',
    icon: '₿',
    category: ['all', 'popular'],
    lockCount: '12.5K',
    totalLocked: '$245M',
    minLockPeriod: '1 hour',
    maxLockPeriod: '5 years',
    networkFee: '0.0001 BTC',
    riskLevel: 'Medium',
    marketCap: '$800B',
    supported: true
},
{
    name: 'Bitcoin',
    symbol: 'BTC',
    icon: '₿',
    category: ['all', 'new'],
    lockCount: '12.5K',
    totalLocked: '$245M',
    minLockPeriod: '1 hour',
    maxLockPeriod: '5 years',
    networkFee: '0.0001 BTC',
    riskLevel: 'Medium',
    marketCap: '$800B',
    supported: true
    },
    {
    name: 'Bitcoin',
    symbol: 'BTC',
    icon: '₿',
    category: ['all', 'stablecoins'],
    lockCount: '12.5K',
    totalLocked: '$245M',
    minLockPeriod: '1 hour',
    maxLockPeriod: '5 years',
    networkFee: '0.0001 BTC',
    riskLevel: 'Medium',
    marketCap: '$800B',
    supported: true
    },
    {
    name: 'zeta',
    symbol: 'BTC',
    icon: '₿',
    category: ['all', 'defi'],
    lockCount: '12.5K',
    totalLocked: '$245M',
    minLockPeriod: '1 hour',
    maxLockPeriod: '5 years',
    networkFee: '0.0001 BTC',
    riskLevel: 'Medium',
    marketCap: '$800B',
    supported: true
    },
// Add more tokens as needed
];

export const categories = [
{ id: 'all', name: 'All Tokens', count: tokens.length },
{ id: 'stablecoins', name: 'Stablecoins', count: tokens.filter(t => t.category.includes('stablecoins')).length },
{ id: 'defi', name: 'DeFi Tokens', count: tokens.filter(t => t.category.includes('defi')).length },
{ id: 'popular', name: 'Popular', count: tokens.filter(t => t.category.includes('popular')).length },
{ id: 'new', name: 'Recently Added', count: tokens.filter(t => t.category.includes('new')).length }
];