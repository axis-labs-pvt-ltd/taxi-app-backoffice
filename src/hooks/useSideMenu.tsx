import { useMemo, useState, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { NavigationItem } from "../types";
import { MainRoutes } from "../data/route.data";
import { logout } from "../redux/Auth/AuthAction";
import { useDispatch } from "react-redux";
import { IoBoatOutline } from "react-icons/io5";
import { LuLayoutDashboard } from "react-icons/lu";
import { TbLogout2 } from "react-icons/tb";

export const useSidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isNavigateConfirmOpen, setIsNavigateConfirmOpen] = useState(false);

  const navigation: NavigationItem[] = useMemo(
    () => [
      {
        id: "dashboard",
        name: "Dashboard",
        icon: LuLayoutDashboard,
        path: "/",
      },
      {
        id: "inquiries",
        name: "Inquiries",
        icon: IoBoatOutline,
        path: MainRoutes.inquiries,
      },
      {
        id: "vehicles",
        name: "Vehicles",
        icon: IoBoatOutline,
        path: MainRoutes.vehicles,
      },
      {
        id: "extraService",
        name: "Extra Services",
        icon: IoBoatOutline,
        path: MainRoutes.extraServices,
      },
      {
        id: "drivers",
        name: "Drivers",
        icon: IoBoatOutline,
        path: MainRoutes.drivers,
      },
      {
        id: "vehicleModels",
        name: "Vehicle Models",
        icon: IoBoatOutline,
        path: MainRoutes.vehicleModels,
      },
      {
        id: "rateCards",
        name: "Rate Cards",
        icon: IoBoatOutline,
        path: MainRoutes.rateCards,
      },
      {
        id: "logout",
        name: "Logout",
        icon: TbLogout2,
        path: "#",
        onClick: () => setIsConfirmOpen(true),
      },
    ],
    []
  );

  const handleMenuClick = useCallback(
    (item: NavigationItem) => {
      if (item.id === "logout") {
        setIsConfirmOpen(true);
      } else {
        navigate(item.path);
      }

      // if (item.onClick) {
      //   item.onClick(item.path);
      // }
    },
    [navigate]
  );

  const onConfirmLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return {
    navigation,
    handleMenuClick,
    location,
    isConfirmOpen,
    setIsConfirmOpen,
    onConfirmLogout,
    isNavigateConfirmOpen,
    setIsNavigateConfirmOpen,
  };
};
