import { Button, Col, Flex } from 'antd';
import UniForm from '../../../components/form/UniForm';
import UniInput from '../../../components/form/UniInput';
import { useGetAcademicFacultiesQuery } from '../../../redux/features/admin/academicManagement.api';
import UniSelectWithWatch from '../../../components/form/UniSelectWithWatch';
import { useState } from 'react';
import { FieldValues, SubmitHandler } from 'react-hook-form';

export default function OfferCourse() {
  const [id, setId] = useState('');
  const { data: academicFacultyData } = useGetAcademicFacultiesQuery(undefined);
  const academicFacultyOptions = academicFacultyData?.data?.map((item) => ({
    value: item._id,
    label: item.name,
  }));

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
  };
  return (
    <Flex justify='center' align='center'>
      <Col span={6}>
        <UniForm onSubmit={onSubmit}>
          <UniSelectWithWatch
            onValueChange={setId}
            label='Academic Faculty'
            name='academicFaculty'
            options={academicFacultyOptions}
          />
          <UniInput disabled={!id} type='text' name='test' label='Test' />
          <Button htmlType='submit'>Submit</Button>
        </UniForm>
      </Col>
    </Flex>
  );
}
