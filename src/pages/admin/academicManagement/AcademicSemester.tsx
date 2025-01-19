import { useGetAcademicSemesterQuery } from '../../../redux/features/admin/academicManagement.api';

export default function AcademicSemester() {
  const { data } = useGetAcademicSemesterQuery(undefined);
  console.log(data);
  return (
    <div>
      <h1>All Academic Semesters</h1>
    </div>
  );
}
