import { RouteObject } from "react-router-dom";
import { DynamicRoute, MainRoutes } from "../data/route.data";

import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import Layout from "../layout/Layout";
import Vehicles from "../pages/Vehicles";
import ExtraServices from "../pages/ExtraServices";
import Drivers from "../pages/Drivers";
import Inquiries from "../pages/Inquiries";
import VehicleModels from "../pages/VehicleModels";
import RateCards from "../pages/RateCards";

export const routes: RouteObject[] = [
  {
    path: MainRoutes.login,
    element: <Login />,
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: MainRoutes.dashboard,
        element: <Dashboard />,
      },
      {
        path: MainRoutes.vehicles,
        element: <Vehicles />,
      },
      {
        path: `${MainRoutes.vehicles}/${DynamicRoute.pageNumber}`,
        element: <Vehicles />,
      },
      {
        path: MainRoutes.extraServices,
        element: <ExtraServices />,
      },
      {
        path: `${MainRoutes.extraServices}/${DynamicRoute.pageNumber}`,
        element: <ExtraServices />,
      },
      {
        path: MainRoutes.drivers,
        element: <Drivers />,
      },
      {
        path: `${MainRoutes.drivers}/${DynamicRoute.pageNumber}`,
        element: <Drivers />,
      },
      {
        path: MainRoutes.inquiries,
        element: <Inquiries />,
      },
      {
        path: `${MainRoutes.inquiries}/${DynamicRoute.pageNumber}`,
        element: <Inquiries />,
      },
      {
        path: MainRoutes.vehicleModels,
        element: <VehicleModels />,
      },
      {
        path: `${MainRoutes.vehicleModels}/${DynamicRoute.pageNumber}`,
        element: <VehicleModels />,
      },
      {
        path: MainRoutes.rateCards,
        element: <RateCards />,
      },
      {
        path: `${MainRoutes.rateCards}/${DynamicRoute.pageNumber}`,
        element: <RateCards />,
      },
    ],
  },
];
