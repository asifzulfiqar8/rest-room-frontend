import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import getEnv from "../../config/config";

const sensorApi = createApi({
  reducerPath: "sensorApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${getEnv("SERVER_URL")}/api/sensor`,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    // add new sensor
    addNewSensor: builder.mutation({
      query: (sensor) => ({
        url: "/create",
        method: "POST",
        body: sensor,
      }),
    }),

    // get all sensors
    getAllSensors: builder.query({
      query: () => ({
        url: "/all",
        method: "GET",
      }),
    }),

    // update single sensor
    updateSingleSensor: builder.mutation({
      query: (sensor) => ({
        url: `/single/${sensor.sensorId}`,
        method: "PUT",
        body: sensor,
      }),
    }),

    // delete single sensor
    deleteSingleSensor: builder.mutation({
      query: (sensorId) => ({
        url: `/single/${sensorId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useAddNewSensorMutation,
  useGetAllSensorsQuery,
  useUpdateSingleSensorMutation,
  useDeleteSingleSensorMutation,
} = sensorApi;
export default sensorApi;
