import { useParams } from 'react-router-dom';
import {
  useAddMarkMutation,
  useGetAllFacultyCoursesQuery,
} from '../../redux/features/faculty/facultyCourseManagement.api';
import { Button, Modal, Table } from 'antd';
import { TTableData } from '../admin/academicManagement/AcademicSemester';
import { useState } from 'react';
import { FieldValues, SubmitHandler } from 'react-hook-form';
import UniForm from '../../components/form/UniForm';
import UniInput from '../../components/form/UniInput';

export default function MyStudent() {
  const { registerSemesterId, courseId } = useParams();
  const { data: facultyCourseData } = useGetAllFacultyCoursesQuery([
    { name: 'semesterRegistration', value: registerSemesterId },
    { name: 'course', value: courseId },
  ]);

  const tableData = facultyCourseData?.data?.map(
    ({ _id, student, semesterRegistration, offeredCourse }) => ({
      key: _id,
      name: student.fullName,
      roll: student.id,
      semesterRegistration: semesterRegistration._id,
      student: student._id,
      offeredCourse: offeredCourse._id,
    })
  );

  const columns = [
    {
      key: 'name',
      title: 'Name',
      dataIndex: 'name',
      showSorterTooltip: { target: 'full-header' },
    },
    {
      key: 'roll',
      title: 'Roll',
      dataIndex: 'roll',
    },
    {
      key: 'action',
      title: 'Action',
      render: (item) => {
        return (
          <div>
            <AddMarksModal studentInfo={item} />
          </div>
        );
      },
    },
  ];
  return (
    <Table<TTableData>
      columns={columns}
      dataSource={tableData}
      showSorterTooltip={{ target: 'sorter-icon' }}
    />
  );
}

const AddMarksModal = ({ studentInfo }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addMark] = useAddMarkMutation();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleSubmit: SubmitHandler<FieldValues> = async (data) => {
    const studentMark = {
      semesterRegistration: studentInfo.semesterRegistration,
      offeredCourse: studentInfo.offeredCourse,
      student: studentInfo.student,
      courseMarks: {
        classTest1: Number(data.classTest1),
        midTerm: Number(data.midTerm),
        classTest2: Number(data.classTest2),
        finalTerm: Number(data.finalTerm),
      },
    };
    const res = await addMark(studentMark);
    console.log(res);
  };

  return (
    <>
      <Button onClick={showModal}>Add Marks</Button>
      <Modal
        title='Basic Modal'
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <UniForm onSubmit={handleSubmit}>
          <UniInput type='text' name='classTest1' label='Class Test 1' />
          <UniInput type='text' name='classTest2' label='Class Test 2' />
          <UniInput type='text' name='midTerm' label='Midterm' />
          <UniInput type='text' name='finalTerm' label='Final' />
          <Button htmlType='submit'>Submit</Button>
        </UniForm>
      </Modal>
    </>
  );
};
