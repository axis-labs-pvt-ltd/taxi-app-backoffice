import { Action, applyMiddleware, combineReducers, createStore } from "redux";
import { thunk, ThunkAction } from "redux-thunk";
import authReducer from "./Auth/AuthReducer";
import vehiclesReducer from "./Vehicles/VehiclesReducer";
import extraServicesReducer from "./ExtraServices/ExtraServicesReducer";
import driversReducer from "./Drivers/DriversReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  vehicles: vehiclesReducer,
  extraServices: extraServicesReducer,
  drivers: driversReducer,
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
