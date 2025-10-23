export enum apiRoutes {
  login = "/auth/login",

  boats = "/boats",
  editAndDelete = "/boats/:id",
  boatsPaginated = "/boats/paginated",
  boatTypes = "/boats/types",

  vehicles = "/vehicles",
  vehiclesPaginated = "/vehicles/paginated",
  vehiclesByModelAndDate = "/vehicles/models/:modelId",
  vehicleTypes = "/vehicleModels/types",
  vehicleBrands = "/vehicleModels/brands",
  editAndDeleteVehicle = "/vehicles/:id",
  updateVehicleStatus = "/vehicles/:id/status",

  vehicleModels = "/vehicleModels",
  updateAndDeleteVehicleModel = "/vehicleModels/:id",

  vehicleModelsEssentials = "/vehicleModels/essentials",
  vehicleModelsPaginated = "/vehicleModels/paginated",

  extraServices = "/services",
  extraServicesPaginated = "/services/paginated",
  editAndDeleteExtraService = "/services/:id",

  drivers = "/drivers",
  driversPaginated = "/drivers/paginated",
  driverTypes = "/drivers/types",
  driverStatus = "/drivers/status",
  editAndDeleteDriver = "/drivers/:id",

  inquiriesPaginated = "/inquiries/paginated",
  assignVehicleToInquiry = "/inquiries/:inquiryId",
  updateActualDiatnace = "/inquiries/:inquiryId/actualTotalDistance",
  updateMeterValues = "/inquiries/:inquiryId/meterValues",
  updateDiscount = "/inquiries/:inquiryId/discounts",
  updateInquiryStatus = "/inquiries/:inquiryId/status",
  recentInquiries = "/inquiries/recents",
  metersByInquiry = "/inquiries/:inquiryId/meters",
  totalIncome = "/inquiries/total-income",
  monthlyIncome = "/inquiries/monthly-income",

  totalCost = "/costs/total-cost",

  weddingInquiriesPaginated = "/weddingInquiries/paginated",
  assignVehicleToWeddingInquiry = "/weddingInquiries/:inquiryId",
  updateTotalDistance = "/weddingInquiries/:inquiryId/totalDistance",
  updateWeddingInquiryMeterValues = "/weddingInquiries/:inquiryId/meterValues",
  metersByWeddingInquiry = "/weddingInquiries/:inquiryId/meters",
  updateWeddingInquiryStatus = "/weddingInquiries/:inquiryId/status",
  updateWeddingDiscount = "/weddingInquiries/:inquiryId/discounts",

  rateCards = "/rateCards",
  rateCardsPaginated = "/rateCards/paginated",
  editAndDeleteRateCard = "/rateCards/:id",
  weddingRateCards = "/rateCards/weddings",

  usersPaginated = "/users/paginated",
  createUser = "/auth/register",
  editAndDeleteUser = "/users/:id",
  resetPassword = "/users/:id/reset",

  toursPaginated = "/tours/paginated",
  tours = "/tours",
  editAndDeleteTour = "/tours/:id",

  files = "/files",

  costCategories = "/costCategories",

  costs = "/costs",
  costsByInquiryId = "/costs/:inquiryId",

  profitReport = "/reports/profit-cost-report",

  tourInquiriesPaginated = "/tourInquiries/paginated",
  assignVehicleToTourInquiry = "/tourInquiries/:inquiryId",
  updateTourTotalDistance = "/tourInquiries/:inquiryId/totalDistance",
  metersByTourInquiry = "/tourInquiries/:inquiryId/meters",
  updateTourInquiryMeterValues = "/tourInquiries/:inquiryId/meterValues",
  updateTourDiscount = "/tourInquiries/:inquiryId/discounts",
}

export const generateRoute = (
  route: apiRoutes,
  params?: Record<string, string | number>
): string => {
  let path = route.toString();

  // Replace path parameters (e.g., /editProducts/:id -> /editProducts/123)
  if (params) {
    Object.keys(params).forEach((key) => {
      const value = encodeURIComponent(String(params[key]));
      path = path.replace(`:${key}`, value);
    });
  }

  // Extract remaining parameters for query params
  const queryParams = Object.entries(params || {})
    .filter(([key]) => !route.toString().includes(`:${key}`)) // Exclude path params
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
    )
    .join("&");

  return queryParams ? `${path}?${queryParams}` : path;
};
