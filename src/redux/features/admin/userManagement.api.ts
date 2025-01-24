import { TQueryPram, TResponseRedux, TStudent } from '../../../types';
import { baseApi } from '../../api/baseApi';

const userManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllStudents: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryPram) => {
            params.append(item.name, item.value as string);
          });
        }

        return { url: '/students', method: 'GET', params: params };
      },
      transformResponse: (response: TResponseRedux<TStudent[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
      providesTags: ['Student'],
    }),

    getSingleStudent: builder.query({
      query: (id) => {
        return { url: `/students/${id}`, method: 'GET' };
      },
      providesTags: ['singleStudent'],
    }),

    updateStudent: builder.mutation({
      query: ({ updatedStudent, studentId }) => {
        return {
          url: `/students/${studentId}`,
          method: 'PATCH',
          body: updatedStudent,
        };
      },

      invalidatesTags: ['Student', 'singleStudent'],
    }),

    addStudent: builder.mutation({
      query: (data) => ({
        url: '/users/create-student',
        method: 'POST',
        body: data,
      }),
    }),

    blockUser: builder.mutation({
      query: ({ userId, status }) => ({
        url: `/users/change-status/${userId}`,
        method: 'PATCH',
        body: status,
      }),
    }),

    getAllFaculties: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryPram) => {
            params.append(item.name, item.value as string);
          });
        }

        return { url: '/faculties', method: 'GET', params: params };
      },
      transformResponse: (response: TResponseRedux<any>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
      // providesTags: ['Student'],
    }),
  }),
});

export const {
  useGetAllStudentsQuery,
  useGetSingleStudentQuery,
  useUpdateStudentMutation,
  useAddStudentMutation,
  useGetAllFacultiesQuery,
  useBlockUserMutation,
} = userManagementApi;
