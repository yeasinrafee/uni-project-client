import FacultyDashboard from '../pages/faculty/FacultyDashboard';
import OfferedCourse from '../pages/faculty/OfferedCourse';

export const facultyPaths = [
  {
    name: 'DashBoard',
    path: 'dashboard',
    element: <FacultyDashboard />,
  },
  {
    name: 'Offered Courses',
    path: 'create-admin',
    element: <OfferedCourse />,
  },
];
