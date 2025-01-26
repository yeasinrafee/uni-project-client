import { useGetAllOfferedCoursesQuery } from '../../redux/features/student/studentCourseManagement.api';

export default function OfferedCourse() {
  const { data } = useGetAllOfferedCoursesQuery(undefined);
  console.log(data);
  return (
    <div>
      <h1>Student offered Course</h1>
    </div>
  );
}
