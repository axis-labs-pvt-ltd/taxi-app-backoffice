import React from 'react';
import { MetricCard as MetricCardType } from '../types';
import { 
  DollarSign, 
  Users, 
  TrendingUp, 
  BarChart3,
  ArrowUp,
  ArrowDown
} from 'lucide-react';

interface MetricCardProps {
  metric: MetricCardType;
}

const getIcon = (iconName: string) => {
  const icons = {
    DollarSign,
    Users,
    TrendingUp,
    BarChart3
  };
  const IconComponent = icons[iconName as keyof typeof icons];
  return IconComponent ? <IconComponent className="w-6 h-6" /> : null;
};

const MetricCard: React.FC<MetricCardProps> = ({ metric }) => {
  const isPositive = metric.trend === 'up';
  
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className={`
            p-3 rounded-lg
            ${isPositive ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'}
          `}>
            {getIcon(metric.icon)}
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">{metric.title}</p>
            <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
          </div>
        </div>
        <div className={`
          flex items-center space-x-1 text-sm font-medium
          ${isPositive ? 'text-green-600' : 'text-red-600'}
        `}>
          {isPositive ? (
            <ArrowUp className="w-4 h-4" />
          ) : (
            <ArrowDown className="w-4 h-4" />
          )}
          <span>{metric.change}</span>
        </div>
      </div>
    </div>
  );
};

export default MetricCard;