import { baseApi } from '../../api/baseApi';

const academicSemester = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAcademicSemester: builder.query({
      query: () => ({
        url: '/academic-semesters',
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetAcademicSemesterQuery } = academicSemester;
