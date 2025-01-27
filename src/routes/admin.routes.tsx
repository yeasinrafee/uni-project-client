import AcademicDepartment from '../pages/admin/academicManagement/AcademicDepartment';
import AcademicFaculty from '../pages/admin/academicManagement/AcademicFaculty';
import AcademicSemester from '../pages/admin/academicManagement/AcademicSemester';
import CreateAcademicDepartment from '../pages/admin/academicManagement/CreateAcademicDepartment';
import CreateAcademicFaculty from '../pages/admin/academicManagement/CreateAcademicFaculty';
import CreateAcademicSemester from '../pages/admin/academicManagement/CreateAcademicSemester';
import AdminDashboard from '../pages/admin/AdminDashboard';
import Courses from '../pages/admin/courseManagement/Courses';
import CreateCourse from '../pages/admin/courseManagement/CreateCourse';
import OfferCourse from '../pages/admin/courseManagement/OfferCourse';
import OfferedCourses from '../pages/admin/courseManagement/OfferedCourses';
import RegisteredSemester from '../pages/admin/courseManagement/RegisteredSemester';
import SemesterRegistration from '../pages/admin/courseManagement/SemesterRegistration';
import CreateAdmin from '../pages/admin/userManagement/adminManagement/CreateAdmin';
import CreateFaculty from '../pages/admin/userManagement/facultyManagement/CreateFaculty';
import CreateStudent from '../pages/admin/userManagement/studentManagement/CreateStudent';
import StudentData from '../pages/admin/userManagement/studentManagement/StudentData';
import StudentDetails from '../pages/admin/userManagement/studentManagement/StudentDetails';
import UpdateStudent from '../pages/admin/userManagement/studentManagement/UpdateStudent';

export const adminPaths = [
  {
    name: 'DashBoard',
    path: 'dashboard',
    element: <AdminDashboard />,
  },
  {
    name: 'User Management',
    children: [
      {
        name: 'Create Student',
        path: 'create-student',
        element: <CreateStudent />,
      },
      {
        name: 'Student',
        path: 'students',
        element: <StudentData />,
      },
      {
        path: 'student/update/:studentId',
        element: <UpdateStudent />,
      },
      {
        path: 'student/:studentId',
        element: <StudentDetails />,
      },
      {
        name: 'Create Admin',
        path: 'create-admin',
        element: <CreateAdmin />,
      },
      {
        name: 'Create Faculty',
        path: 'create-faculty',
        element: <CreateFaculty />,
      },
    ],
  },
  {
    name: 'Academic Management',
    children: [
      {
        name: 'Create A. Semester',
        path: 'create-academic-semester',
        element: <CreateAcademicSemester />,
      },
      {
        name: 'Academic Semester',
        path: 'academic-semester',
        element: <AcademicSemester />,
      },
      {
        name: 'Create A. Faculty',
        path: 'create-academic-faculty',
        element: <CreateAcademicFaculty />,
      },
      {
        name: 'Academic Faculty',
        path: 'academic-faculty',
        element: <AcademicFaculty />,
      },
      {
        name: 'Create A. Department',
        path: 'create-academic-department',
        element: <CreateAcademicDepartment />,
      },
      {
        name: 'Academic Department',
        path: 'academic-department',
        element: <AcademicDepartment />,
      },
    ],
  },
  {
    name: 'Course Management',
    children: [
      {
        name: 'Semester Registration',
        path: 'semester-registration',
        element: <SemesterRegistration />,
      },
      {
        name: 'Registered Semester',
        path: 'registered-semester',
        element: <RegisteredSemester />,
      },
      {
        name: 'Create Course',
        path: 'create-course',
        element: <CreateCourse />,
      },
      {
        name: 'Courses',
        path: 'courses',
        element: <Courses />,
      },
      {
        name: 'Offer Course',
        path: 'offer-course',
        element: <OfferCourse />,
      },
      {
        name: 'Offered Courses',
        path: 'offered-courses',
        element: <OfferedCourses />,
      },
    ],
  },
];
