import FacultyDashboard from '../pages/faculty/FacultyDashboard';
import MyCourses from '../pages/faculty/MyCourses';
import MyStudent from '../pages/faculty/MyStudent';

export const facultyPaths = [
  {
    name: 'DashBoard',
    path: 'dashboard',
    element: <FacultyDashboard />,
  },
  {
    name: 'My Courses',
    path: 'courses',
    element: <MyCourses />,
  },
  {
    path: 'courses/:registerSemesterId/:courseId',
    element: <MyStudent />,
  },
];
