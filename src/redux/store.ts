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
