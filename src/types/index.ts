import { IconType } from "react-icons";

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: string;
  status: "active" | "inactive";
  lastActive: string;
}

export interface MetricCardType {
  title: string;
  value: number | null;
  change: string;
  trend: "up" | "down";
  icon: string;
}

export interface ChartData {
  name: string;
  value: number;
}

export interface NavigationItem {
  id: string;
  name: string;
  icon: IconType | string;
  path: string;
  onClick?: () => void;
}
