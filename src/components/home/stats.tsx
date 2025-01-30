import { Lock, Activity, Coins, Users } from 'lucide-react';

// First, enhance the Statistic component
const Statistic = ({ value, label, description, icon, trend }:{ value:string, label:string, description:string, icon:any, trend: { type: string, value: number } }) => (
    <div className="p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <div className="p-2 bg-navy/5 rounded-lg">
          {icon}
        </div>
        {trend && (
          <div className={`flex items-center ${trend.type === 'up' ? 'text-green-500' : 'text-red-500'}`}>
            {trend.type === 'up' ? '↑' : '↓'} {trend.value}%
          </div>
        )}
      </div>
      <div className="text-3xl font-bold text-navy mb-2">{value}</div>
      <div className="text-gray-600 font-medium mb-2">{label}</div>
      <p className="text-sm text-gray-500">{description}</p>
    </div>
  );
  
  // Enhanced Statistics Section
  const StatisticsSection = () => {
    const stats = [
      {
        value: "$12.5M",
        label: "Total Value Locked",
        description: "Total assets secured in our smart contracts",
        icon: <Coins className="w-6 h-6 text-amber-500" />,
        trend: { type: 'up', value: 23 }
      },
      {
        value: "15,000+",
        label: "Active Users",
        description: "Trusted by thousands of crypto savers worldwide",
        icon: <Users className="w-6 h-6 text-amber-500" />,
        trend: { type: 'up', value: 12 }
      },
      {
        value: "99.99%",
        label: "Uptime",
        description: "Reliable platform performance and availability",
        icon: <Activity className="w-6 h-6 text-amber-500" />,
        trend: { type: 'up', value: 0.01 }
      },
      {
        value: "45,000+",
        label: "Successful Locks",
        description: "Successfully completed savings goals",
        icon: <Lock className="w-6 h-6 text-amber-500" />,
        trend: { type: 'up', value: 15 }
      }
    ];
  
    return (
      <section id="stats" className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-2xl font-bold text-navy mb-4">
              Platform Statistics
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our platform's growth and performance metrics showcase our commitment to providing a secure and reliable savings solution for the crypto community.
            </p>
          </div>
  
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <Statistic key={index} {...stat} />
            ))}
          </div>
  
          {/* Additional Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="bg-navy p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Security First</h3>
              <p className="">
                Multiple security audits and continuous monitoring ensure your assets remain safe.
              </p>
            </div>
            <div className="bg-golden text-navy p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Growing Community</h3>
              <p>
                Join our rapidly expanding community of smart crypto savers.
              </p>
            </div>
            <div className="bg-navy p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Transparent Operations</h3>
              <p className="">
                Real-time statistics and open-source code for complete transparency.
              </p>
            </div>
          </div>
  
          {/* Call to Action */}
          <div className="text-center mt-10">
            <button className="bg-navy px-8 py-3 rounded-lg hover:text-amber-600 transition-all">
              View Detailed Analytics
            </button>
            <p className="text-sm text-gray-500 mt-4">
              Statistics updated every 24 hours. Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>
      </section>
    );
  };
  
  export default StatisticsSection;