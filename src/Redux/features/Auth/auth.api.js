import { baseApi } from "../../../Redux/Api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (payload) => ({
        url: "/user/login",
        method: "POST",
        body: payload,
      }),
    }),
    getMe: builder.query({
      query: () => ({
        url: "/user/geMe",
        method: "GET",
      }),
    }),
    registerStudent: builder.mutation({
      query: (payload) => ({
        url: "/student/create",
        method: "POST",
        body: payload,
      }),
    }),
    passwordChange: builder.mutation({
      query: (payload) => ({
        url: "/user/password-change",
        method: "POST",
        body: payload,
      }),
    }),
    getBanner: builder.query({
      query: () => ({
        url: "/banner",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useLoginUserMutation,
  useGetMeQuery,
  useRegisterStudentMutation,
  usePasswordChangeMutation,
  useGetBannerQuery,
} = authApi;
