import React from "react";
import MetricCard from "../../components/MetricCard";
import { Activity } from "lucide-react";
import useDashboard from "../../hooks/useDashboard";
import DateRangeFilter from "../../components/Reusable/DateRangeFilter";
import { ChartData, MetricCardType } from "../../types";
import SubHeader from "../../components/SubHeader";

const Dashboard: React.FC = () => {
  const {
    recentInquiries,
    totalIncome,
    monthlyIncome,
    showPopup,
    setShowPopup,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    setSelectedDateRange,
  } = useDashboard();

  const dashboardMetrics: MetricCardType[] = [
    {
      title: "Total Revenue (LKR)",
      value: totalIncome.data?.totalIncome ?? 0,
      change: "+12.5%",
      trend: "up",
      icon: "DollarSign",
    },
    {
      title: "Completed Inquiries",
      value: totalIncome.data?.totalCompletedInquiries ?? 0,
      change: "+8.2%",
      trend: "up",
      icon: "Users",
    },
    {
      title: "Pending Inquiries",
      value: totalIncome.data?.totalPendingInquiries ?? 0,
      change: "-0.5%",
      trend: "down",
      icon: "TrendingUp",
    },
    {
      title: "Cancelled Inquiries",
      value: totalIncome.data?.totalcancelledInquiries ?? 0,
      change: "+4.1%",
      trend: "up",
      icon: "BarChart3",
    },
  ];

  const inquiryData: ChartData[] = [
    {
      name: "Completed",
      value: totalIncome.data?.totalCompletedInquiries ?? 0,
    },
    { name: "Pending", value: totalIncome.data?.totalPendingInquiries ?? 0 },
    {
      name: "Cancelled",
      value: totalIncome.data?.totalcancelledInquiries ?? 0,
    },
  ];

  const totalInquiries =
    (totalIncome.data?.totalCompletedInquiries ?? 0) +
    (totalIncome.data?.totalPendingInquiries ?? 0) +
    (totalIncome.data?.totalcancelledInquiries ?? 0);

  return (
    <div className="space-y-6">
      <div>
        <SubHeader topic="Dashboard" />
        <div className="flex items-center justify-end w-full -mt-20">
          <div className="w-fit z-10 px-10 py-2">
            <DateRangeFilter
              showPopup={showPopup}
              setShowPopup={setShowPopup}
              startDate={startDate}
              setStartDate={setStartDate}
              endDate={endDate}
              setEndDate={setEndDate}
              setSelectedDateRange={setSelectedDateRange}
            />
          </div>
        </div>
      </div>

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
            {monthlyIncome?.data?.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600">
                  {item.month}
                </span>
                <div className="flex items-center space-x-3">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${(item.totalIncome / 500000) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium text-gray-900 w-20 text-right">
                    LKR {item.totalIncome.toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Traffic Sources */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Inquiry Rates
          </h3>
          <div className="space-y-4">
            {inquiryData.map((item, index) => {
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
                    {((item.value / totalInquiries) * 100).toFixed(2)}%
                  </span>
                </div>
              );
            })}
          </div>
          <div className="mt-4 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full flex">
              <div
                className="bg-blue-600"
                style={{
                  width: `${
                    ((totalIncome.data?.totalCompletedInquiries ?? 0) /
                      totalInquiries) *
                    100
                  }%`,
                }}
              />
              <div
                className="bg-green-600"
                style={{
                  width: `${
                    ((totalIncome.data?.totalPendingInquiries ?? 0) /
                      totalInquiries) *
                    100
                  }%`,
                }}
              />
              <div
                className="bg-purple-600"
                style={{
                  width: `${
                    ((totalIncome.data?.totalcancelledInquiries ?? 0) /
                      totalInquiries) *
                    100
                  }%`,
                }}
              />
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
