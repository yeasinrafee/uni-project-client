import { Button, Col, Flex } from 'antd';
import UniForm from '../../../components/form/UniForm';
import UniSelect from '../../../components/form/UniSelect';
import { FieldValues, SubmitHandler } from 'react-hook-form';
import { semesterStatusOptions } from '../../../constants/semester';
import { useGetAcademicSemesterQuery } from '../../../redux/features/admin/academicManagement.api';
import { toast } from 'sonner';
import UniDatePicker from '../../../components/form/UniDatePicker';
import UniInput from '../../../components/form/UniInput';
import { useAddRegisteredSemesterMutation } from '../../../redux/features/admin/courseManagement.api';
import { TResponse } from '../../../types';

export default function SemesterRegistration() {
  const [addRegisteredSemester] = useAddRegisteredSemesterMutation();
  const { data: academicSemester } = useGetAcademicSemesterQuery(undefined);

  const academicSemesterOptions = academicSemester?.data?.map((item) => ({
    value: item?._id,
    label: `${item?.name} ${item?.year}`,
  }));

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading('Creating....');

    const semesterData = {
      ...data,
      minCredit: Number(data.minCredit),
      maxCredit: Number(data.maxCredit),
    };

    console.log(semesterData);

    try {
      const res = (await addRegisteredSemester(semesterData)) as TResponse<any>;

      console.log(res);

      if (res.error) {
        toast.error(res?.error?.data?.message, { id: toastId });
      } else {
        toast.success(res?.data?.message, { id: toastId });
      }
    } catch {
      toast.error('Something went wrong!', { id: toastId });
    }
  };

  return (
    <Flex justify='center' align='center'>
      <Col span={6}>
        <UniForm onSubmit={onSubmit}>
          <UniSelect
            label='Academic Semester'
            name='academicSemester'
            options={academicSemesterOptions}
          />
          <UniSelect
            name='status'
            label='Status'
            options={semesterStatusOptions}
          />
          <UniDatePicker name='startDate' label='Start Date' />
          <UniDatePicker name='endDate' label='End Date' />
          <UniInput type='text' name='minCredit' label='Min Credit' />
          <UniInput type='text' name='maxCredit' label='Max Credit' />
          <Button htmlType='submit'>Submit</Button>
        </UniForm>
      </Col>
    </Flex>
  );
}
