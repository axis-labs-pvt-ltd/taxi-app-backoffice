export enum MainRoutes {
  login = "/login",
  signup = "/signup",
  home = "/",
  dashboard = "/",
  boats = "/boats/page",
  vehicles = "/vehicles/page",
  extraServices = "/extra-services/page",
  drivers = "/drivers/page",
  logout = MainRoutes.login,

  // Error Routes
  notFound = "/404",
  unauthorized = "/401",
  forbidden = "/403",
  internalServerError = "/500",
  badRequest = "/400",
  serviceUnavailable = "/503",
  gatewayTimeout = "/504",
  networkConnectTimeout = "/599",
}

export enum DynamicRoute {
  id = ":id",
  action = ":action",
  pageNumber = ":pageNumber",
}
