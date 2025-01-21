import { FieldValues, SubmitHandler } from 'react-hook-form';
import UniForm from '../../../components/form/UniForm';
import UniInput from '../../../components/form/UniInput';
import { Button, Col, Divider, Row } from 'antd';
import UniSelect from '../../../components/form/UniSelect';
import { bloodGroupOptions, genderOptions } from '../../../constants/global';
import UniDatePicker from '../../../components/form/UniDatePicker';
import {
  useGetAcademicDepartmentQuery,
  useGetAcademicSemesterQuery,
} from '../../../redux/features/admin/academicManagement.api';
import { useAddStudentMutation } from '../../../redux/features/admin/userManagement.api';
import { toast } from 'sonner';

const studentDummyData = {
  password: 'student123',
  student: {
    ////////////
    name: {
      firstName: 'Student',
      middleName: ' Number',
      lastName: ' 1',
    },
    gender: 'male',
    dateOfBirth: '2000-10-31',
    bloodGroup: 'O+',
    ////////////////
    email: 'student2@gmail.com',
    contactNo: '1234567898',
    emergencyContactNo: '1234567897',
    presentAddress: '34 road, Dhaka-1230',
    permanentAddress: '34 road, Dhaka-1230',
    ///////////
    guardian: {
      fatherName: 'James Deo',
      fatherOccupation: 'Engineer',
      fatherContactNo: '2323433455664',
      motherName: 'Mary Deo',
      motherOccupation: 'Teacher',
      motherContactNo: '34345453435',
    },
    localGuardian: {
      name: 'Alice Johnson',
      occupation: 'Doctor',
      contactNo: '44444-44044',
      address: '34 road, Dhaka-1230',
    },
    ///////////
    admissionSemester: '66d4a9a94a5ff768b2ff90e0',
    academicDepartment: '66d4a8af4a5ff768b2ff90dd',
  },
};

const studentDefaultValues = {
  ////////////
  name: {
    firstName: 'Student',
    middleName: ' Number',
    lastName: ' 1',
  },
  gender: 'male',
  bloodGroup: 'O+',
  ////////////////
  email: 'student2@gmail.com',
  contactNo: '1234567898',
  emergencyContactNo: '1234567897',
  presentAddress: '34 road, Dhaka-1230',
  permanentAddress: '34 road, Dhaka-1230',
  ///////////
  guardian: {
    fatherName: 'James Deo',
    fatherOccupation: 'Engineer',
    fatherContactNo: '2323433455664',
    motherName: 'Mary Deo',
    motherOccupation: 'Teacher',
    motherContactNo: '34345453435',
  },
  localGuardian: {
    name: 'Alice Johnson',
    occupation: 'Doctor',
    contactNo: '44444-44044',
    address: '34 road, Dhaka-1230',
  },
  ///////////
  // admissionSemester: '66d4a9a94a5ff768b2ff90e0',
  // academicDepartment: '66d4a8af4a5ff768b2ff90dd',
};

export default function CreateStudent() {
  const { data: sData, isLoading: sIsLoading } =
    useGetAcademicSemesterQuery(undefined);

  const { data: dData, isLoading: dIsLoading } =
    useGetAcademicDepartmentQuery(undefined);

  const [addStudent] = useAddStudentMutation();

  const academicSemesterOptions = sData?.data?.map((item) => ({
    value: item._id,
    label: `${item.name} ${item.year}`,
  }));

  const academicDepartmentOptions = dData?.data?.map((item) => ({
    value: item._id,
    label: `${item.name}`,
  }));

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading('Creating Student...');
    const formData = new FormData();
    const studentData = {
      password: 'student123',
      student: data,
    };
    formData.append('data', JSON.stringify(studentData));

    const res = await addStudent(formData);
    toast.success('Student Created Successfully!', { id: toastId });
    console.log(res);
  };
  return (
    <Row>
      <Col span={24}>
        <UniForm onSubmit={onSubmit} defaultValues={studentDefaultValues}>
          <Row gutter={8}>
            <Divider>Personal Info</Divider>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <UniInput
                type='text'
                name='name.firstName'
                label='First Name: '
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <UniInput
                type='text'
                name='name.middleName'
                label='Middle Name: '
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <UniInput type='text' name='name.lastName' label='Last Name: ' />
            </Col>

            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <UniDatePicker name='dateOfBirth' label='Date of Birth: ' />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <UniSelect
                name='gender'
                label='Gender: '
                options={genderOptions}
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <UniSelect
                name='bloodGroup'
                label='Blood Group: '
                options={bloodGroupOptions}
              />
            </Col>
          </Row>

          <Row gutter={8}>
            <Divider>Contact Info</Divider>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <UniInput type='text' name='email' label='Email: ' />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <UniInput type='text' name='contactNo' label='Contact No: ' />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <UniInput
                type='text'
                name='emergencyContactNo'
                label='Emergency Contact No: '
              />
            </Col>
            <Col span={24} md={{ span: 12 }}>
              <UniInput
                type='text'
                name='presentAddress'
                label='Present Address: '
              />
            </Col>
            <Col span={24} md={{ span: 12 }}>
              <UniInput
                type='text'
                name='permanentAddress'
                label='Permanent Address: '
              />
            </Col>
          </Row>

          <Row gutter={8}>
            <Divider>Guardian Info</Divider>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <UniInput
                type='text'
                name='guardian.fatherName'
                label='Father Name: '
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <UniInput
                type='text'
                name='guardian.fatherOccupation'
                label='Father Occupation: '
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <UniInput
                type='text'
                name='guardian.fatherContactNo'
                label='Father Contact No: '
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <UniInput
                type='text'
                name='guardian.motherName'
                label='Mother Name: '
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <UniInput
                type='text'
                name='guardian.motherOccupation'
                label='Mother Occupation: '
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <UniInput
                type='text'
                name='guardian.motherContactNo'
                label='Mother Contact No: '
              />
            </Col>
          </Row>

          <Row gutter={8}>
            <Divider>Local Guardian Info</Divider>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <UniInput type='text' name='localGuardian.name' label='Name: ' />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <UniInput
                type='text'
                name='localGuardian.occupation'
                label='Occupation: '
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <UniInput
                type='text'
                name='localGuardian.contactNo'
                label='Contact No: '
              />
            </Col>
            <Col span={24}>
              <UniInput
                type='text'
                name='localGuardian.address'
                label='Address: '
              />
            </Col>
          </Row>

          <Row gutter={8}>
            <Divider>Academic Info</Divider>
            <Col span={24} md={{ span: 12 }}>
              <UniSelect
                disabled={sIsLoading}
                name='admissionSemester'
                label='Admission Semester'
                options={academicSemesterOptions}
              />
            </Col>
            <Col span={24} md={{ span: 12 }}>
              <UniSelect
                disabled={dIsLoading}
                name='academicDepartment'
                label='Academic Department'
                options={academicDepartmentOptions}
              />
            </Col>
          </Row>
          <Button htmlType='submit'>Submit</Button>
        </UniForm>
      </Col>
    </Row>
  );
}
