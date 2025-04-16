import { baseApi } from "./../../Api/baseApi";

const adminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUser: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item) => {
            params.append(item.name, item.value);
          });
        }
        return {
          url: "/user",
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
      providesTags: ["user"],
    }),
    getAllTeachers: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item) => {
            params.append(item.name, item.value);
          });
        }
        return {
          url: "/teachers",
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
      providesTags: ["user"],
    }),
    getAllAgreements: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item) => {
            params.append(item.name, item.value);
          });
        }
        return {
          url: "/honorarium-agreements",
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
      providesTags: ["agreement"],
    }),
    getAllScheduleModification: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item) => {
            params.append(item.name, item.value);
          });
        }
        return {
          url: "/schedule-modifier",
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
    updateScheduleModification: builder.mutation({
      query: ({ id, payload }) => ({
        url: `/schedule-modifier/${id}`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["modification"],
    }),
    getAllStudents: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item) => {
            params.append(item.name, item.value);
          });
        }
        return {
          url: "/student",
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
      providesTags: ["user"],
    }),
    getAllPayment: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item) => {
            params.append(item.name, item.value);
          });
        }
        return {
          url: "/payments",
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
      providesTags: ["payment"],
    }),
    getAllEnrollment: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item) => {
            params.append(item.name, item.value);
          });
        }
        return {
          url: "/enrollments",
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
      providesTags: ["payment", "enroll"],
    }),
    createEnroll: builder.mutation({
      query: (payload) => ({
        url: `/enrollments/create`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["payment", "enroll"],
    }),
    deleteAEnrollment: builder.mutation({
      query: (id) => {
        return {
          url: `/enrollments/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["enroll"],
    }),
    updatePayment: builder.mutation({
      query: (payload) => ({
        url: `/payments/${payload.id}`,
        method: "PATCH",
        body: payload.data,
      }),
      invalidatesTags: ["payment"],
    }),
    createPayment: builder.mutation({
      query: (payload) => ({
        url: `/payments/admin/create`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["payment"],
    }),
    // createPaymentUser: builder.mutation({
    //   query: (payload) => ({
    //     url: `/payments/create`,
    //     method: "POST",
    //     body: payload,
    //   }),
    //   invalidatesTags: ["payment"],
    // }),
    roleChange: builder.mutation({
      query: (payload) => ({
        url: `/user/${payload.id}`,
        method: "PATCH",
        body: { role: payload.payload },
      }),
      invalidatesTags: ["user"],
    }),
    getAllTeacher: builder.query({
      query: () => {
        return {
          url: "/user/teacher",
          method: "GET",
        };
      },
    }),
    getAllCourse: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item) => {
            params.append(item.name, item.value);
          });
        }
        return {
          url: "/courses",
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
    getAllBanner: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item) => {
            params.append(item.name, item.value);
          });
        }
        return {
          url: "/banner/admin/specific",
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
      providesTags: ["banner"],
    }),
    createBanner: builder.mutation({
      query: (payload) => {
        return {
          url: `/banner/create`,
          method: "POST",
          body: payload,
        };
      },
      invalidatesTags: ["banner"],
    }),
    updateBanner: builder.mutation({
      query: ({ id, payload }) => {
        return {
          url: `/banner/${id}`,
          method: "PATCH",
          body: payload,
        };
      },
      invalidatesTags: ["banner"],
    }),
    deleteBanner: builder.mutation({
      query: (id) => {
        return {
          url: `/banner/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["banner"],
    }),
    getAllCourseForStudent: builder.query({
      query: (id) => {
        return {
          url: `/courses/admin/specific/${id}`,
          method: "GET",
        };
      },
    }),
    getAllStudentData: builder.query({
      query: (id) => {
        return {
          url: `/batches/admin/${id}`,
          method: "GET",
        };
      },
    }),

    getSingleCourse: builder.query({
      query: (id) => {
        return {
          url: `/courses/${id}`,
          method: "GET",
        };
      },
      transformResponse: (response) => {
        return {
          data: response.data,
        };
      },
      providesTags: ["course"],
    }),
    deleteACourse: builder.mutation({
      query: (id) => {
        return {
          url: `/course/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["course"],
    }),
    createCourseFromDB: builder.mutation({
      query: (payload) => {
        return {
          url: "/courses/create",
          method: "POST",
          body: payload,
        };
      },
      invalidatesTags: ["course"],
    }),
    updateCourseFromDB: builder.mutation({
      query: ({ id, payload }) => {
        return {
          url: `/courses/${id}`,
          method: "PATCH",
          body: payload,
        };
      },
      invalidatesTags: ["course"],
    }),
    courseStatusChange: builder.mutation({
      query: (payload) => {
        return {
          url: `/course/status/${payload}`,
          method: "PATCH",
        };
      },
      invalidatesTags: ["course"],
    }),
    createSchedule: builder.mutation({
      query: (payload) => ({
        url: `/schedules/create`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["schedule"],
    }),
    getAllScheduleByBatchId: builder.query({
      query: (payload) => {
        const params = new URLSearchParams();
        if (payload.args) {
          payload.args.forEach((item) => {
            params.append(item.name, item.value);
          });
        }
        console.log(payload);
        return {
          url: `/schedules/admin/${payload.id}`,
          method: "GET",
          params,
        };
      },
      providesTags: ["schedule"],
    }),
    editSchedule: builder.mutation({
      query: ({ id, payload }) => ({
        url: `/schedules/${id}`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["schedule"],
    }),
    deleteSchedule: builder.mutation({
      query: (id) => ({
        url: `/course/schedule/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["course"],
    }),
    getClassBySchedule: builder.query({
      query: (id) => ({
        url: `/class/${id}`,
        method: "GET",
      }),
      providesTags: ["class"],
    }),
    createClass: builder.mutation({
      query: (payload) => ({
        url: `/class/create`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["class"],
    }),
    deleteClass: builder.mutation({
      query: (id) => ({
        url: `/class/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["class"],
    }),
    subjectCreate: builder.mutation({
      query: (payload) => ({
        url: "/subjects/create",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["subject"],
    }),
    getAllSubject: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item) => {
            params.append(item.name, item.value);
          });
        }
        return {
          url: "/subjects",
          method: "GET",
          params,
        };
      },
      providesTags: ["subject"],
    }),
    updateSubject: builder.mutation({
      query: (payload) => ({
        url: `/subjects/${payload.id}`,
        method: "PATCH",
        body: payload.data,
      }),
      invalidatesTags: ["subject"],
    }),
    deleteSubject: builder.mutation({
      query: (id) => ({
        url: `/subjects/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["subject"],
    }),
    deleteAgreement: builder.mutation({
      query: (id) => ({
        url: `/honorarium-agreements/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["agreement"],
    }),
    createBatchByCourseId: builder.mutation({
      query: (payload) => ({
        url: `/batches/create`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["batch"],
    }),
    getAllBatchByCourseId: builder.query({
      query: (id) => ({
        url: `/batches/${id}`,
        method: "GET",
      }),
      providesTags: ["batch"],
    }),
    deleteBatch: builder.mutation({
      query: (payload) => ({
        url: `/batches/${payload}`,
        method: "DELETE",
      }),
      invalidatesTags: ["batch"],
    }),
    updateBatch: builder.mutation({
      query: (payload) => ({
        url: `/batches/${payload.id}`,
        method: "PATCH",
        body: payload.data,
      }),
      invalidatesTags: ["batch"],
    }),
    createTeacher: builder.mutation({
      query: (payload) => ({
        url: `/teachers/create`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["user"],
    }),
    createAgreement: builder.mutation({
      query: (payload) => ({
        url: `/honorarium-agreements/create`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["agreement"],
    }),
    updateAgreement: builder.mutation({
      query: (payload) => ({
        url: `/honorarium-agreements/${payload.id}`,
        method: "PATCH",
        body: payload.data,
      }),
      invalidatesTags: ["agreement"],
    }),
    createUser: builder.mutation({
      query: (payload) => ({
        url: `/user/create`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["user"],
    }),
    createAdmissionDB: builder.mutation({
      query: (payload) => ({
        url: `/student/create`,
        method: "POST",
        body: payload,
      }),
    }),
    getAStudentData: builder.query({
      query: (id) => ({
        url: `/student/admin/${id}`,
        method: "GET",
      }),
    }),
    getAllMetaData: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item) => {
            params.append(item.name, item.value);
          });
        }
        return {
          url: `/user/admin/metaData`,
          method: "GET",
          params,
        };
      },
    }),
    getSyllabus: builder.query({
      query: (id) => {
        return {
          url: `/syllabus/${id}`,
          method: "GET",
        };
      },
      providesTags: ["syllabus"],
    }),
    createSyllabus: builder.mutation({
      query: (payload) => {
        return {
          url: `/syllabus/create`,
          method: "POST",
          body: payload,
        };
      },
      invalidatesTags: ["syllabus"],
    }),
    deleteSyllabus: builder.mutation({
      query: (id) => {
        return {
          url: `/syllabus/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["syllabus"],
    }),
    updateSyllabus: builder.mutation({
      query: ({ id, payload }) => {
        return {
          url: `/syllabus/${id}`,
          method: "PATCH",
          body: payload,
        };
      },
      invalidatesTags: ["syllabus"],
    }),
  }),
});
export const {
  useGetAllTeachersQuery,
  useEditScheduleMutation,
  useGetAllPaymentQuery,
  useUpdatePaymentMutation,
  useCreateEnrollMutation,
  useGetAllEnrollmentQuery,
  useDeleteAEnrollmentMutation,
  useCreatePaymentMutation,
  useGetAllStudentsQuery,
  useGetAllUserQuery,
  useGetAllAgreementsQuery,
  useRoleChangeMutation,
  useCreateCourseFromDBMutation,
  useGetAllTeacherQuery,
  useGetAllCourseQuery,
  useGetSingleCourseQuery,
  useCreateScheduleMutation,
  useDeleteScheduleMutation,
  useDeleteACourseMutation,
  useDeleteAgreementMutation,
  useUpdateAgreementMutation,
  useGetClassByScheduleQuery,
  useCreateClassMutation,
  useDeleteClassMutation,
  useCourseStatusChangeMutation,
  useGetAllBatchByCourseIdQuery,
  useCreateBatchByCourseIdMutation,
  useSubjectCreateMutation,
  useGetAllSubjectQuery,
  useDeleteBatchMutation,
  useUpdateBatchMutation,
  useUpdateSubjectMutation,
  useDeleteSubjectMutation,
  useCreateTeacherMutation,
  useCreateAgreementMutation,
  useCreateUserMutation,
  useGetAllScheduleByBatchIdQuery,
  useCreateAdmissionDBMutation,
  useGetAStudentDataQuery,
  useGetAllCourseForStudentQuery,
  useGetAllStudentDataQuery,
  useGetAllMetaDataQuery,
  useGetAllScheduleModificationQuery,
  useUpdateScheduleModificationMutation,
  useGetAllBannerQuery,
  useCreateBannerMutation,
  useDeleteBannerMutation,
  useUpdateBannerMutation,
  // useCreatePaymentUserMutation,
  useGetSyllabusQuery,
  useCreateSyllabusMutation,
  useDeleteSyllabusMutation,
  useUpdateSyllabusMutation,
  useUpdateCourseFromDBMutation,
} = adminApi;
