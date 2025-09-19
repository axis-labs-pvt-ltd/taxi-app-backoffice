import React from "react";
import {
  dashboardMetrics,
  revenueData,
  trafficData,
} from "../../data/dummyData";
import MetricCard from "../../components/MetricCard";
import { Activity } from "lucide-react";
import useDashboard from "../../hooks/useDashboard";

const Dashboard: React.FC = () => {
  const { recentInquiries } = useDashboard();

  console.log(recentInquiries);
  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      {/* <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 rounded-xl text-white">
        <h1 className="text-2xl font-bold mb-2">Welcome back, John!</h1>
        <p className="text-blue-100">
          Here's what's happening with your business today.
        </p>
      </div> */}

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {dashboardMetrics.map((metric, index) => (
          <MetricCard key={index} metric={metric} />
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Revenue Trends
          </h3>
          <div className="space-y-4">
            {revenueData.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600">
                  {item.name}
                </span>
                <div className="flex items-center space-x-3">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${(item.value / 6000) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium text-gray-900 w-16 text-right">
                    ${item.value.toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Traffic Sources */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Traffic Sources
          </h3>
          <div className="space-y-4">
            {trafficData.map((item, index) => {
              const colors = ["bg-blue-600", "bg-green-600", "bg-purple-600"];
              return (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${colors[index]}`} />
                    <span className="text-sm font-medium text-gray-600">
                      {item.name}
                    </span>
                  </div>
                  <span className="text-sm font-medium text-gray-900">
                    {item.value}%
                  </span>
                </div>
              );
            })}
          </div>
          <div className="mt-4 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full flex">
              <div className="bg-blue-600 flex-1 max-w-[45%]" />
              <div className="bg-green-600 flex-1 max-w-[35%]" />
              <div className="bg-purple-600 flex-1 max-w-[20%]" />
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Recent Inquiries
        </h3>
        <div className="space-y-4">
          {recentInquiries?.data?.map((inquiry, index) => (
            <div key={index} className="flex items-center space-x-4">
              <div className={`p-2 rounded-lg bg-gray-100 text-blue-500`}>
                <Activity className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">
                  New inquiry received from {inquiry?.fullName}
                </p>
                <p className="text-xs text-gray-500">
                  Tour date: {inquiry?.tourDate.split("T")[0]}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
