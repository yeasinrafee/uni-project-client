import { Button, Col, Divider, Row } from 'antd';
import { useParams } from 'react-router-dom';
import UniForm from '../../../../components/form/UniForm';
import UniInput from '../../../../components/form/UniInput';
import UniSelect from '../../../../components/form/UniSelect';
import UniDatePicker from '../../../../components/form/UniDatePicker';
import UniImageInput from '../../../../components/form/UniImageInput';
import {
  useGetAcademicDepartmentQuery,
  useGetAcademicSemesterQuery,
} from '../../../../redux/features/admin/academicManagement.api';
import { bloodGroupOptions, genderOptions } from '../../../../constants/global';
import {
  useGetSingleStudentQuery,
  useUpdateStudentMutation,
} from '../../../../redux/features/admin/userManagement.api';
import { FieldValues, SubmitHandler } from 'react-hook-form';
import { toast } from 'sonner';

export default function UpdateStudent() {
  const { studentId } = useParams();

  const [updateStudent] = useUpdateStudentMutation();
  const { data: studentData, isLoading } = useGetSingleStudentQuery(studentId);
  const {
    name,
    gender,
    bloodGroup,
    email,
    contactNo,
    emergencyContactNo,
    presentAddress,
    permanentAddress,
    guardian,
    localGuardian,
    admissionSemester,
    academicDepartment,
  } = studentData?.data ?? {};

  const studentDefaultValues = {
    ////////////
    name: {
      firstName: name?.firstName,
      middleName: name?.middleName,
      lastName: name?.lastName,
    },
    gender,
    bloodGroup,
    ////////////////
    email,
    contactNo,
    emergencyContactNo,
    presentAddress,
    permanentAddress,
    ///////////
    guardian: {
      fatherName: guardian?.fatherName,
      fatherOccupation: guardian?.fatherOccupation,
      fatherContactNo: guardian?.fatherContactNo,
      motherName: guardian?.motherName,
      motherOccupation: guardian?.motherOccupation,
      motherContactNo: guardian?.motherContactNo,
    },
    localGuardian: {
      name: localGuardian?.name,
      occupation: localGuardian?.occupation,
      contactNo: localGuardian?.contactNo,
      address: localGuardian?.address,
    },
    ///////////
    admissionSemester: admissionSemester?._id,
    academicDepartment: academicDepartment?._id,
  };

  const { data: dData, isLoading: dIsLoading } =
    useGetAcademicDepartmentQuery(undefined);

  const { data: sData, isLoading: sIsLoading } =
    useGetAcademicSemesterQuery(undefined);

  const academicSemesterOptions = sData?.data?.map((item) => ({
    value: item._id,
    label: `${item.name} ${item.year}`,
  }));

  const academicDepartmentOptions = dData?.data?.map((item) => ({
    value: item._id,
    label: `${item.name}`,
  }));

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading('Updating Student...');
    const updatedStudent = {
      student: data,
    };
    console.log(updatedStudent);

    const res = await updateStudent({ updatedStudent, studentId });

    toast.success(res?.data?.message, { id: toastId });
    console.log(res);
  };

  if (isLoading) return <div>Loading....</div>;

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
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <UniImageInput name='image' type='file' label='Picture: ' />
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
          <Button htmlType='submit'>Update</Button>
        </UniForm>
      </Col>
    </Row>
  );
}
