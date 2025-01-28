
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
    name: 'zeta',
    symbol: 'BTC',
    icon: '₿',
    category: ['all', 'meme'],
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
];

export const categories = [
    { id: 'all', name: 'All', count: tokens.length },
    { id: 'stablecoins', name: 'Stablecoins', count: tokens.filter(t => t.category.includes('stablecoins')).length },
    { id: 'defi', name: 'DeFi Tokens', count: tokens.filter(t => t.category.includes('defi')).length },
    { id: 'meme', name: 'Meme Tokens', count: tokens.filter(t => t.category.includes('popular')).length }
];

  export const faqs = [
    {
      question: "How does FVKRY PRVNTA work?",
      answer: "Our platform allows you to lock your crypto assets for a specified period, helping you achieve your savings goals while earning rewards."
    },
    {
      question: "Is it safe to lock my assets?",
      answer: "Yes, our smart contracts are audited by leading security firms and we implement industry best practices for asset security."
    },
    {
      question: "What are the fees?",
      answer: "We charge a minimal 0.3% fee only upon withdrawal to maintain platform sustainability and development."
    },
    {
      question: "Can I withdraw early?",
      answer: "Early withdrawals are possible in emergency situations, subject to a higher fee to discourage premature withdrawals."
    }
  ];