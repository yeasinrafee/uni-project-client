import { Button, Row } from 'antd';
import { FieldValues } from 'react-hook-form';
import { useLoginMutation } from '../redux/features/auth/authApi';
import { useAppDispatch } from '../redux/hooks';
import { setUser, TUser } from '../redux/features/auth/authSlice';
import { verifyToken } from '../utils/verifyToken';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import UniForm from '../components/form/UniForm';
import UniInput from '../components/form/UniInput';

const Login = () => {
  const navigate = useNavigate();
  const [login] = useLoginMutation();
  const dispatch = useAppDispatch();

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading('Loading...!');
    try {
      const userInfo = {
        id: data.userId,
        password: data.password,
      };
      const res = await login(userInfo).unwrap();

      const user = verifyToken(res.data.accessToken) as TUser;

      dispatch(setUser({ user, token: res.data.accessToken }));

      toast.success('User logged in successfully!', {
        id: toastId,
        duration: 2000,
      });

      navigate(`/${user.role}/dashboard`);
    } catch (err) {
      toast.error('Something went wrong!', {
        id: toastId,
        duration: 2000,
      });
      console.log(err);
    }
  };
  return (
    <Row justify='center' align='middle' style={{ height: '100vh' }}>
      <UniForm onSubmit={onSubmit}>
        <UniInput type='text' name='userId' label='ID: ' />
        <UniInput type='text' name='password' label='Password: ' />
        <Button htmlType='submit'>Login</Button>
      </UniForm>
    </Row>
  );
};

export default Login;
