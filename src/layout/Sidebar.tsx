import React from "react";
import { X } from "lucide-react";
import { useSidebar } from "../hooks/useSideMenu";
import ConfirmDialog from "../components/Reusable/ConfrimDialog";
import Logo from "../assets/Logo.png";

interface SidebarProps {
  isOpen: boolean;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  closeSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  setActiveTab,
  closeSidebar,
}) => {
  const {
    navigation,
    handleMenuClick,
    location,
    isConfirmOpen,
    setIsConfirmOpen,
    onConfirmLogout,
  } = useSidebar();

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 lg:hidden z-30"
          onClick={closeSidebar}
        />
      )}

      <aside
        className={`
        fixed lg:sticky top-0 left-0 h-screen bg-white border-r border-gray-200 z-40
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0 w-64
      `}
      >
        <div className="flex flex-col h-full">
          {/* Logo section */}
          <div className="flex items-center justify-between pl-8 p-[13px] border-b border-gray-200">
            {/* <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">M</span>
              </div>
              <span className="text-xl font-bold text-gray-800">MARINE</span>
            </div> */}
            <img
              src={Logo}
              alt="Logo"
              className="items-center justify-center w-24 max-sm:w-28 object-fill"
            />
            <button
              onClick={closeSidebar}
              className="lg:hidden p-1 rounded-md hover:bg-gray-100"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4">
            <ul className="space-y-2">
              {navigation.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => {
                      setActiveTab(item.id);
                      closeSidebar();
                      handleMenuClick(item);
                    }}
                    className={`
          w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200
          ${
            item.path === "/"
              ? location.pathname === "/" // only exact match for Dashboard
                ? "bg-red-50 text-[#EB1F25] border-r-2 border-red-500"
                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              : location.pathname.startsWith(item.path) // startsWith for others
              ? "bg-red-50 text-[#EB1F25] border-r-2 border-red-500"
              : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
          }
        `}
                  >
                    <span
                      className={
                        item.path === "/"
                          ? location.pathname === "/"
                            ? "text-[#EB1F25]"
                            : "text-gray-400"
                          : location.pathname.startsWith(item.path)
                          ? "text-[#EB1F25]"
                          : "text-gray-400"
                      }
                    >
                      {<item.icon />}
                    </span>
                    <span className="font-medium">{item.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </aside>

      {isConfirmOpen && (
        <ConfirmDialog
          title="Confirm Logout"
          message="Are you sure you want to logout?"
          isOpen={isConfirmOpen}
          onClose={() => setIsConfirmOpen(false)}
          onConfirm={onConfirmLogout}
        />
      )}
    </>
  );
};

export default Sidebar;
