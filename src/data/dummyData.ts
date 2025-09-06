import { User, MetricCard, ChartData } from '../types';

export const users: User[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@example.com',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150',
    role: 'Admin',
    status: 'active',
    lastActive: '2 minutes ago'
  },
  {
    id: '2',
    name: 'Michael Chen',
    email: 'michael.chen@example.com',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150',
    role: 'Manager',
    status: 'active',
    lastActive: '1 hour ago'
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    email: 'emily.rodriguez@example.com',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
    role: 'Designer',
    status: 'inactive',
    lastActive: '3 days ago'
  },
  {
    id: '4',
    name: 'David Thompson',
    email: 'david.thompson@example.com',
    avatar: 'https://images.pexels.com/photos/1212984/pexels-photo-1212984.jpeg?auto=compress&cs=tinysrgb&w=150',
    role: 'Developer',
    status: 'active',
    lastActive: '30 minutes ago'
  }
];

export const dashboardMetrics: MetricCard[] = [
  {
    title: 'Total Revenue',
    value: '$124,500',
    change: '+12.5%',
    trend: 'up',
    icon: 'DollarSign'
  },
  {
    title: 'Active Users',
    value: '8,549',
    change: '+8.2%',
    trend: 'up',
    icon: 'Users'
  },
  {
    title: 'Conversion Rate',
    value: '3.84%',
    change: '-0.5%',
    trend: 'down',
    icon: 'TrendingUp'
  },
  {
    title: 'Growth',
    value: '24.7%',
    change: '+4.1%',
    trend: 'up',
    icon: 'BarChart3'
  }
];

export const revenueData: ChartData[] = [
  { name: 'Jan', value: 4000 },
  { name: 'Feb', value: 3000 },
  { name: 'Mar', value: 5000 },
  { name: 'Apr', value: 4500 },
  { name: 'May', value: 6000 },
  { name: 'Jun', value: 5500 }
];

export const trafficData: ChartData[] = [
  { name: 'Desktop', value: 45 },
  { name: 'Mobile', value: 35 },
  { name: 'Tablet', value: 20 }
];