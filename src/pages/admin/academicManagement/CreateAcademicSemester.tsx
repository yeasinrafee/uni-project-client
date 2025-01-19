import { Button, Col, Flex } from 'antd';
import UniForm from '../../../components/form/UniForm';
import UniSelect from '../../../components/form/UniSelect';
import { FieldValues, SubmitHandler } from 'react-hook-form';
import { semesterOptions } from '../../../constants/semester';
import { monthOptions } from '../../../constants/global';

const currentYear = new Date().getFullYear();
const yearOptions = [0, 1, 2, 3, 4, 5].map((number) => ({
  value: String(currentYear + number),
  label: String(currentYear + number),
}));

export default function CreateAcademicSemester() {
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const name = semesterOptions[Number(data?.name) - 1]?.label;

    const semesterData = {
      name,
      code: data.name,
      year: data.year,
      startMonth: data.startMonth,
      endMonth: data.endMonth,
    };
    console.log(semesterData);
  };

  return (
    <Flex justify='center' align='center'>
      <Col span={6}>
        <UniForm onSubmit={onSubmit}>
          <UniSelect label='Name' name='name' options={semesterOptions} />
          <UniSelect label='Year' name='year' options={yearOptions} />
          <UniSelect
            label='Start Month'
            name='startMonth'
            options={monthOptions}
          />
          <UniSelect label='End Month' name='endMonth' options={monthOptions} />
          <Button htmlType='submit'>Submit</Button>
        </UniForm>
      </Col>
    </Flex>
  );
}
