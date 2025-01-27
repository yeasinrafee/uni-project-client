import { Button, Col, Flex } from 'antd';
import { useGetAllFacultyCoursesQuery } from '../../redux/features/faculty/facultyCourseManagement.api';
import UniForm from '../../components/form/UniForm';
import UniSelect from '../../components/form/UniSelect';
import { useNavigate } from 'react-router-dom';
import { FieldValues, SubmitHandler } from 'react-hook-form';

export default function MyCourses() {
  const { data: facultyCourseData } = useGetAllFacultyCoursesQuery(undefined);
  const navigate = useNavigate();

  const semesterOptions = facultyCourseData?.data?.map((item) => ({
    label: `${item.academicSemester.name} ${item.academicSemester.year}`,
    value: item.semesterRegistration._id,
  }));

  const courseOptions = facultyCourseData?.data?.map((item) => ({
    label: item.course.title,
    value: item.course._id,
  }));

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    navigate(`/faculty/courses/${data.semesterRegistration}/${data.course}`);
  };
  return (
    <Flex>
      <Col>
        <UniForm onSubmit={onSubmit}>
          <UniSelect
            options={semesterOptions}
            name='semesterRegistration'
            label='Semester'
          />
          <UniSelect options={courseOptions} name='course' label='Course' />
          <Button htmlType='submit'>Submit</Button>
        </UniForm>
      </Col>
    </Flex>
  );
}
