import { configureStore } from "@reduxjs/toolkit";
import authApi from "../services/auth/authApi";
import authSlice from "../services/auth/authSlice";
import buildingSlice from "../services/building/buildingSlice";
import sensorApi from "../services/sensor/sensorApi";
import buildingApi from "../services/building/buildingApi";

const store = configureStore({
  reducer: {
    [authSlice.name]: authSlice.reducer,
    [authApi.reducerPath]: authApi.reducer,

    [sensorApi.reducerPath]: sensorApi.reducer,

    [buildingSlice.name]: buildingSlice.reducer,
    [buildingApi.reducerPath]: buildingApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(sensorApi.middleware)
      .concat(buildingApi.middleware);
  },
});

export default store;
