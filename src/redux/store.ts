import { Action, applyMiddleware, combineReducers, createStore } from "redux";
import { thunk, ThunkAction } from "redux-thunk";
import authReducer from "./Auth/AuthReducer";
import vehiclesReducer from "./Vehicles/VehiclesReducer";
import extraServicesReducer from "./ExtraServices/ExtraServicesReducer";
import driversReducer from "./Drivers/DriversReducer";
import vehicleModelsReducer from "./VehicleModels/VehicleModelsReducer";
import inquiriesReducer from "./Inquiries/InquiriesReducer";
import rateCardsReducer from "./RateCards/RateCardsReducer";
import usersReducer from "./Users/UsersReducer";
import dashboardReducer from "./Dashboard/DashboardReducer";
import toursReducer from "./Tours/ToursReducer";
import imageReducer from "./Images/ImageReducer";
import weddingInquiriesReducer from "./WeddingInquiries/WeddingInquiriesReducer";
import costCategoriesReducer from "./CostCategories/CostCategoriesReducer";
import costsReducer from "./Costs/CostsReducer";
import reportsReducer from "./Reports/ReportsReducer";
import tourInquiriesReducer from "./TourInquiries/TourInquiryReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  vehicles: vehiclesReducer,
  extraServices: extraServicesReducer,
  drivers: driversReducer,
  vehicleModels: vehicleModelsReducer,
  inquiries: inquiriesReducer,
  rateCards: rateCardsReducer,
  users: usersReducer,
  dashboard: dashboardReducer,
  tours: toursReducer,
  images: imageReducer,
  weddingInquiries: weddingInquiriesReducer,
  costCategories: costCategoriesReducer,
  costs: costsReducer,
  reports: reportsReducer,
  tourInquiries: tourInquiriesReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

const store = createStore(rootReducer, {}, applyMiddleware(thunk));

export default store;
