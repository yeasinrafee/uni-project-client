import { useParams } from 'react-router-dom';
import { useGetSingleStudentQuery } from '../../../../redux/features/admin/userManagement.api';

export default function StudentDetails() {
  const { studentId } = useParams();
  const { data: studentData, isLoading } = useGetSingleStudentQuery(studentId);
  console.log(studentData?.data);

  if (isLoading) return <h1>Loading....</h1>;
  return (
    <div>
      <h1>Student Details: {studentId}</h1>
    </div>
  );
}
