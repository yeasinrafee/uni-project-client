import { Button, Col, Flex } from 'antd';
import UniForm from '../../../components/form/UniForm';
import UniInput from '../../../components/form/UniInput';
import {
  useGetAcademicDepartmentQuery,
  useGetAcademicFacultiesQuery,
} from '../../../redux/features/admin/academicManagement.api';
import { FieldValues, SubmitHandler } from 'react-hook-form';
import {
  useGetAllCoursesQuery,
  useGetAllRegisteredSemesterQuery,
  useGetCourseFacultiesQuery,
} from '../../../redux/features/admin/courseManagement.api';
import UniSelect from '../../../components/form/UniSelect';
import { weekOptions } from '../../../constants/global';
import UniTimePicker from '../../../components/form/UniTimePicker';
import { useState } from 'react';
import UniSelectWithWatch from '../../../components/form/UniSelectWithWatch';

export default function OfferCourse() {
  const [courseId, setCourseId] = useState('');
  const { data: semesterRegistrationData } =
    useGetAllRegisteredSemesterQuery(undefined);
  const { data: academicFacultyData } = useGetAcademicFacultiesQuery(undefined);
  const { data: academicDepartmentData } =
    useGetAcademicDepartmentQuery(undefined);
  const { data: courseData } = useGetAllCoursesQuery(undefined);
  const { data: facultiesData, isFetching: fetchingFaculties } =
    useGetCourseFacultiesQuery(courseId, { skip: !courseId });

  const semesterRegistrationOptions = semesterRegistrationData?.data?.map(
    (item) => ({
      value: item._id,
      label: `${item.academicSemester.name} ${item.academicSemester.year}`,
    })
  );
  const academicFacultyOptions = academicFacultyData?.data?.map((item) => ({
    value: item._id,
    label: item.name,
  }));
  const academicDepartmentOptions = academicDepartmentData?.data?.map(
    (item) => ({
      value: item._id,
      label: item.name,
    })
  );
  const courseOptions = courseData?.data?.map((item) => ({
    value: item._id,
    label: item.title,
  }));
  const facultyOptions = facultiesData?.data?.faculties?.map((item) => ({
    value: item._id,
    label: item.fullName,
  }));

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
  };
  return (
    <Flex justify='center' align='center'>
      <Col span={6}>
        <UniForm onSubmit={onSubmit}>
          <UniSelect
            label='Semester Registration'
            name='semesterRegistration'
            options={semesterRegistrationOptions}
          />
          <UniSelect
            label='Academic Faculty'
            name='academicFaculty'
            options={academicFacultyOptions}
          />
          <UniSelect
            label='Academic Department'
            name='academicDepartment'
            options={academicDepartmentOptions}
          />
          <UniSelectWithWatch
            onValueChange={setCourseId}
            name='course'
            label='Course'
            options={courseOptions}
          />
          <UniSelect
            disabled={!courseId || fetchingFaculties}
            name='faculty'
            label='Faculty'
            options={facultyOptions}
          />
          <UniInput type='text' name='section' label='Section' />
          <UniInput type='text' name='maxCapacity' label='Max Capacity' />
          <UniSelect
            mode='multiple'
            name='days'
            label='Days'
            options={weekOptions}
          />
          <UniTimePicker name='startTime' label='Start Time' />
          <UniTimePicker name='endTime' label='End Time' />
          <Button htmlType='submit'>Submit</Button>
        </UniForm>
      </Col>
    </Flex>
  );
}
