import React from 'react';
import { BarChart3, PieChart, TrendingUp, Calendar } from 'lucide-react';

const Analytics: React.FC = () => {
  const analyticsData = [
    { label: 'Page Views', value: '124,567', growth: '+15.3%', color: 'bg-blue-600' },
    { label: 'Sessions', value: '45,234', growth: '+12.8%', color: 'bg-green-600' },
    { label: 'Bounce Rate', value: '23.4%', growth: '-2.1%', color: 'bg-red-600' },
    { label: 'Avg. Duration', value: '4m 32s', growth: '+8.7%', color: 'bg-purple-600' },
  ];

  const topPages = [
    { page: '/dashboard', views: 12450, percentage: 35 },
    { page: '/analytics', views: 8920, percentage: 25 },
    { page: '/users', views: 6780, percentage: 19 },
    { page: '/settings', views: 4230, percentage: 12 },
    { page: '/profile', views: 3120, percentage: 9 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics Overview</h1>
          <p className="text-gray-600 mt-1">Track your website performance and user engagement</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Calendar className="w-4 h-4" />
            <span>Last 30 days</span>
          </button>
        </div>
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {analyticsData.map((item, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg ${item.color} bg-opacity-10`}>
                <BarChart3 className={`w-6 h-6 ${item.color.replace('bg-', 'text-')}`} />
              </div>
              <span className={`text-sm font-medium ${
                item.growth.startsWith('+') ? 'text-green-600' : 'text-red-600'
              }`}>
                {item.growth}
              </span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">{item.value}</h3>
            <p className="text-sm text-gray-600">{item.label}</p>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Traffic Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Traffic Overview</h3>
            <TrendingUp className="w-5 h-5 text-gray-400" />
          </div>
          <div className="h-64 flex items-end space-x-2">
            {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 88].map((height, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div 
                  className="w-full bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-md transition-all duration-500 hover:from-blue-700 hover:to-blue-500"
                  style={{ height: `${height}%` }}
                />
                <span className="text-xs text-gray-500 mt-2">
                  {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][index]}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Pages */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Top Pages</h3>
            <PieChart className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {topPages.map((page, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-900">{page.page}</span>
                    <span className="text-xs text-gray-500">{page.views.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${page.percentage}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Detailed Stats */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Performance Metrics</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
              <BarChart3 className="w-8 h-8 text-blue-600" />
            </div>
            <h4 className="text-2xl font-bold text-gray-900">98.5%</h4>
            <p className="text-sm text-gray-600">Uptime</p>
          </div>
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
              <TrendingUp className="w-8 h-8 text-green-600" />
            </div>
            <h4 className="text-2xl font-bold text-gray-900">1.2s</h4>
            <p className="text-sm text-gray-600">Load Time</p>
          </div>
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
              <PieChart className="w-8 h-8 text-purple-600" />
            </div>
            <h4 className="text-2xl font-bold text-gray-900">85</h4>
            <p className="text-sm text-gray-600">Performance Score</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;