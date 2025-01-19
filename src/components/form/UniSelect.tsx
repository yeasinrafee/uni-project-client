import { Form, Select } from 'antd';
import { Controller } from 'react-hook-form';

type TUniSelectProps = {
  name: string;
  label?: string;
  options: { value: string; label: string; disabled?: boolean }[];
};

export default function UniSelect({ label, name, options }: TUniSelectProps) {
  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => (
        <Form.Item label={label}>
          <Select
            style={{ width: '100%' }}
            {...field}
            options={options}
            size='large'
          />
          {error && <small style={{ color: 'red' }}>{error.message}</small>}
        </Form.Item>
      )}
    />
  );
}
