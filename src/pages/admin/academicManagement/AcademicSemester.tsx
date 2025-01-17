import { useGetAcademicSemesterQuery } from '../../../redux/features/academicSemester/academicSemester';

export default function AcademicSemester() {
  const { data } = useGetAcademicSemesterQuery(undefined);
  console.log(data);
  return (
    <div>
      <h1>All Academic Semesters</h1>
    </div>
  );
}
