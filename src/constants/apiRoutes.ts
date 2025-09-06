export enum apiRoutes {
  login = "/auth/login",

  boats = "/boats",
  editAndDelete = "/boats/:id",
  boatsPaginated = "/boats/paginated",
  boatTypes = "/boats/types",

  vehicles = "/vehicles",
  vehiclesPaginated = "/vehicles/paginated",
  vehicleTypes = "/vehicles/types",
  editAndDeleteVehicle = "/vehicles/:id",

  extraServices = "/services",
  extraServicesPaginated = "/services/paginated",
  editAndDeleteExtraService = "/services/:id",

  drivers = "/drivers",
  driversPaginated = "/drivers/paginated",
  driverTypes = "/drivers/types",
  driverStatus = "/drivers/status",
  editAndDeleteDriver = "/drivers/:id",
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
