import { baseApi } from "../../Api/baseApi";

const studentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllEnrolledCourse: builder.query({
      query: () => ({
        url: "/courses/student/specific",
        method: "GET",
      }),
    }),
    getCourseBatch: builder.query({
      query: (id) => ({
        url: `/batches/student/${id}`,
        method: "GET",
      }),
    }),
    getStudentMetaData: builder.query({
      query: () => ({
        url: `/student/meta-data`,
        method: "GET",
      }),
    }),
    getAllScheduleOfStudent: builder.query({
      query: ({ id, args }) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item) => {
            params.append(item.name, item.value);
          });
        }
        return {
          url: `/schedules/students/${id}`,
          method: "GET",
          params,
        };
      },
    }),
    createSubmissionOfStudent: builder.mutation({
      query: (payload) => {
        return {
          url: `/submission/create`,
          method: "POST",
          body: payload,
        };
      },
      invalidatesTags: ["submission"],
    }),
    getAllSubmissionOfStudent: builder.query({
      query: (batchId) => {
        return {
          url: `/submission/student/${batchId}`,
          method: "GET",
        };
      },
      providesTags: ["submission"],
    }),
    getAllExamOfStudent: builder.query({
      query: (batchId) => {
        return {
          url: `/exam/student/${batchId}`,
          method: "GET",
        };
      },
    }),
    getSingleExamOfStudent: builder.query({
      query: (examId) => {
        return {
          url: `/exam/student/specific/${examId}`,
          method: "GET",
        };
      },
    }),
    getAllQuizesByBatchId: builder.query({
      query: (batchId) => ({
        url: `/quizes/by-batch/${batchId}`,
        method: "GET",
      }),
      providesTags: ["quiz"],
    }),
    getSingleQuiz: builder.query({
      query: (id) => ({
        url: `/quizes/${id}`,
        method: "GET",
      }),
      providesTags: ["quiz"],
    }),
    checkQuizResponse: builder.mutation({
      query: (payload) => ({
        url: `/quizes/check-quiz/${payload.quizId}`,
        method: "POST",
        body: payload.data,
      }),
      invalidatesTags: ["payment", "enroll"],
    }),
    getSingleEnrollment: builder.query({
      query: (enrollmentId) => ({
        url: `/enrollments/student/${enrollmentId}`,
        method: "GET",
      }),
      providesTags: ["enroll"],
    }),
    getAStudentEnrollment: builder.query({
      query: (enrollmentId) => ({
        url: `/enrollments/${enrollmentId}`,
        method: "GET",
      }),
      providesTags: ["enroll"],
    }),
    createPayment: builder.mutation({
      query: (payload) => ({
        url: `/payments/create`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["payment"],
    }),
    getAllPaymentForStudent: builder.query({
      query: (payload) => ({
        url: `/payments/student/specific`,
        method: "GET",
        body: payload,
      }),
      providesTags: ["payment"],
    }),
    getAllCourseForUser: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item) => {
            params.append(item.name, item.value);
          });
        }
        return {
          url: "/courses/user/specific",
          method: "GET",
          params,
        };
      },
      transformResponse: (response) => {
        return {
          data: response.data,
          // meta: response.data.meta,
        };
      },
      providesTags: ["course"],
    }),
  }),
});

export const {
  useGetAllEnrolledCourseQuery,
  useGetCourseBatchQuery,
  useGetAllScheduleOfStudentQuery,
  useGetAllSubmissionOfStudentQuery,
  useGetAllExamOfStudentQuery,
  useGetSingleExamOfStudentQuery,
  useCreateSubmissionOfStudentMutation,
  useGetAllQuizesByBatchIdQuery,
  useGetSingleQuizQuery,
  useCheckQuizResponseMutation,
  useGetSingleEnrollmentQuery,
  useCreatePaymentMutation,
  useGetAllPaymentForStudentQuery,
  useGetStudentMetaDataQuery,
  useGetAllCourseForUserQuery,
  useGetAStudentEnrollmentQuery,
} = studentApi;
