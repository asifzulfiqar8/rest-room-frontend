import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import getEnv from "../../config/config";

const buildingApi = createApi({
  reducerPath: "buildingApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${getEnv("SERVER_URL")}/api/building`,
    credentials: "include",
  }),

  endpoints: (builder) => ({
    // add new building
    addNewBuilding: builder.mutation({
      query: (building) => ({
        url: "/create",
        method: "POST",
        body: building,
      }),
    }),
  }),
});

export const { useAddNewBuildingMutation } = buildingApi;
export default buildingApi;
