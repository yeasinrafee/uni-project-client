import OfferedCourse from '../pages/student/OfferedCourse';
import StudentDashboard from '../pages/student/StudentDashboard';

export const studentPaths = [
  {
    name: 'DashBoard',
    path: 'dashboard',
    element: <StudentDashboard />,
  },
  {
    name: 'Offered Courses',
    path: 'create-admin',
    element: <OfferedCourse />,
  },
];
