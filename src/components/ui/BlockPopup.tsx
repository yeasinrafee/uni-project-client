import { Button, message, Popconfirm, PopconfirmProps } from 'antd';
import { useBlockUserMutation } from '../../redux/features/admin/userManagement.api';

export default function BlockPopup({ item }) {
  const [blockUser] = useBlockUserMutation();

  const confirm: PopconfirmProps['onConfirm'] = async (e) => {
    // console.log(e);
    const status = {
      status: 'blocked',
    };
    const res = await blockUser({ userId: item.key, status });
    console.log(res);
    message.success('User is blocked');
  };

  //   const cancel: PopconfirmProps['onCancel'] = (e) => {
  //     console.log(e);
  //   };

  return (
    <Popconfirm
      title='Block the user!'
      description='Are you sure to block this user?'
      onConfirm={confirm}
      //   onCancel={cancel}
      okText='Yes'
      cancelText='No'
    >
      <Button>Block</Button>
    </Popconfirm>
  );
}
