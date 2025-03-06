import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import getEnv from "../../config/config";

const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${getEnv("SERVER_URL")}/api/auth`, credentials: "include" }),
  endpoints: (builder) => ({
    // sign up
    signup: builder.mutation({
      query: (userData) => ({
        url: "/register",
        method: "POST",
        body: userData,
      }),
    }),
    // login
    login: builder.mutation({
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        body: credentials,
      }),
    }),
    // get profile
    getMyProfile: builder.query({
      query: () => ({
        url: "/my-profile",
        method: "GET",
      }),
    }),
    // update profile
    updateMyProfile: builder.mutation({
      query: (profile) => ({
        url: "/my-profile",
        method: "PUT",
        body: profile,
      }),
    }),

    // logout
    logout: builder.mutation({
      query: () => ({
        url: "/logout",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useSignupMutation,
  useLoginMutation,
  useGetMyProfileQuery,
  useLogoutMutation,
  useUpdateMyProfileMutation,
} = authApi;
export default authApi;
