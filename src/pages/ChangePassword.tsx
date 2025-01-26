import { Button, Row } from 'antd';
import UniForm from '../components/form/UniForm';
import UniInput from '../components/form/UniInput';
import { FieldValues, SubmitHandler } from 'react-hook-form';
import { useChangePasswordMutation } from '../redux/features/admin/userManagement.api';
import { TResponse } from '../types';
import { useAppDispatch } from '../redux/hooks';
import { logOut } from '../redux/features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export default function ChangePassword() {
  const [changePassword] = useChangePasswordMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data);
    const res = (await changePassword(data)) as TResponse<any>;

    if (res?.data?.success) {
      dispatch(logOut());
      navigate('/login');
    } else {
      toast.error(res?.data?.error?.message);
    }
  };
  return (
    <Row justify='center' align='middle' style={{ height: '100vh' }}>
      <UniForm onSubmit={onSubmit}>
        <UniInput type='text' name='oldPassword' label='Old Password: ' />
        <UniInput type='text' name='newPassword' label='New Password: ' />
        <Button htmlType='submit'>Change Password</Button>
      </UniForm>
    </Row>
  );
}
