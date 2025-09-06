import React from "react";
import { Bell, Search, User, Settings, LogOut } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  const { user } = useSelector((state: RootState) => state.auth);
  return (
    <header className="bg-white border-b border-gray-200 h-[63px] flex items-center justify-between px-6 sticky top-0 z-40">
      <div className="flex items-center space-x-4">
        <button
          onClick={toggleSidebar}
          className="lg:hidden p-2 rounded-md hover:bg-gray-100 transition-colors"
        >
          <div className="w-6 h-6 flex flex-col justify-center items-center">
            <span className="w-4 h-0.5 bg-gray-600 mb-1 transition-all"></span>
            <span className="w-4 h-0.5 bg-gray-600 mb-1 transition-all"></span>
            <span className="w-4 h-0.5 bg-gray-600 transition-all"></span>
          </div>
        </button>

        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search..."
            className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
          />
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <button className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors">
          <Bell className="w-5 h-5 text-gray-600" />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
            3
          </span>
        </button>

        <div className="relative group">
          <button className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 transition-colors">
            <img
              src="https://images.pexels.com/photos/1212984/pexels-photo-1212984.jpeg?auto=compress&cs=tinysrgb&w=100"
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover"
            />
            <span className="hidden md:block text-sm font-medium text-gray-700">
              {user?.firstName}  {user?.lastName}
            </span>
          </button>

          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
            <a
              href="#"
              className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
            >
              <User className="w-4 h-4" />
              <span>Profile</span>
            </a>
            <a
              href="#"
              className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
            >
              <Settings className="w-4 h-4" />
              <span>Settings</span>
            </a>
            <hr className="my-1" />
            <a
              href="#"
              className="flex items-center space-x-2 px-4 py-2 text-sm text-red-600 hover:bg-gray-50"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign out</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
