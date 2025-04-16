import { baseApi } from "../../../Redux/Api/baseApi";

const teacherApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTeacherCourse: builder.query({
      query: () => ({
        url: "/course/teacher",
        method: "GET",
      }),
    }),
    getAllSchedule: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item) => {
            params.append(item.name, item.value);
          });
        }
        return {
          url: "/schedules/teachers",
          method: "GET",
          params,
        };
      },
      transformResponse: (response) => {
        return {
          data: response.data.result,
          meta: response.data.meta,
        };
      },
    }),
    getAllCourseForTeacher: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item) => {
            params.append(item.name, item.value);
          });
        }
        return {
          url: "/courses/teacher/specific",
          method: "GET",
          params,
        };
      },
      transformResponse: (response) => {
        return {
          data: response.data.result,
          meta: response.data.meta,
        };
      },
    }),
    getAllBatchForTeacher: builder.query({
      query: (id) => {
        return {
          url: `/batches/teacher/${id}`,
          method: "GET",
        };
      },
    }),
    getAllEnrolledCoursesStudent: builder.query({
      query: (scheduleId) => {
        return {
          url: `/student/teacher/${scheduleId}`,
          method: "GET",
        };
      },
    }),
    getAllSubmissionForTeacher: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item) => {
            params.append(item.name, item.value);
          });
        }
        return {
          url: "/submission/teacher",
          method: "GET",
          params,
        };
      },
      transformResponse: (response) => {
        return {
          data: response.data.result,
          meta: response.data.meta,
        };
      },
      providesTags: ["submission"],
    }),
    getAllExamsForTeacher: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item) => {
            params.append(item.name, item.value);
          });
        }
        return {
          url: "/exam/teacher/specific",
          method: "GET",
          params,
        };
      },
      transformResponse: (response) => {
        return {
          data: response.data.result,
          meta: response.data.meta,
        };
      },
      providesTags: ["exam"],
    }),
    createExam: builder.mutation({
      query: (payload) => {
        return {
          url: `/exam/create`,
          method: "POST",
          body: payload,
        };
      },
      invalidatesTags: ["exam"],
    }),
    getAllScheduleModificationForTeacher: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item) => {
            params.append(item.name, item.value);
          });
        }
        return {
          url: "/schedule-modifier/teacher",
          method: "GET",
          params,
        };
      },
      transformResponse: (response) => {
        return {
          data: response.data.result,
          meta: response.data.meta,
        };
      },
      providesTags: ["modification"],
    }),
    createScheduleModifier: builder.mutation({
      query: (payload) => {
        return {
          url: `/schedule-modifier/create`,
          method: "POST",
          body: payload,
        };
      },
      invalidatesTags: ["modification"],
    }),
    updateExam: builder.mutation({
      query: ({ id, data }) => {
        return {
          url: `/exam/${id}`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["exam"],
    }),
    updateSubmission: builder.mutation({
      query: ({ id, data }) => {
        return {
          url: `/submission/teacher/${id}`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["submission"],
    }),
    createAttendance: builder.mutation({
      query: (payload) => {
        return {
          url: `/attendance/create`,
          method: "POST",
          body: payload,
        };
      },
      // invalidatesTags: ["submission"],
    }),

    getAllQuizes: builder.query({
      query: () => ({
        url: "/quizes",
        method: "GET",
      }),
      providesTags: ["quiz"],
    }),
    updateQuizStatus: builder.mutation({
      query: (payload) => ({
        url: `/quizes/${payload.id}`,
        method: "PATCH",
        body: payload.data,
      }),
      invalidatesTags: ["quiz"],
    }),
    createQuiz: builder.mutation({
      query: (payload) => ({
        url: `/quizes/create`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["quiz"],
    }),
    getSingleQuiz: builder.query({
      query: (id) => {
        return {
          url: `/quizes/${id}`,
          method: "GET",
        };
      },
      transformResponse: (response) => {
        return {
          data: response?.data,
        };
      },
      providesTags: ["quiz"],
    }),
  }),
});

export const {
  useGetTeacherCourseQuery,
  useGetAllScheduleQuery,
  useUpdateSubmissionMutation,
  useGetAllCourseForTeacherQuery,
  useGetAllBatchForTeacherQuery,
  useCreateExamMutation,
  useCreateQuizMutation,
  useGetSingleQuizQuery,
  useUpdateQuizStatusMutation,
  useGetAllQuizesQuery,
  useGetAllExamsForTeacherQuery,
  useUpdateExamMutation,
  useGetAllSubmissionForTeacherQuery,
  useGetAllEnrolledCoursesStudentQuery,
  useCreateAttendanceMutation,
  useCreateScheduleModifierMutation,
  useGetAllScheduleModificationForTeacherQuery,
} = teacherApi;
