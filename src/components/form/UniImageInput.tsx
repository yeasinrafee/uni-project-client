import { Form, Input } from 'antd';
import { Controller } from 'react-hook-form';

type TInputProps = {
  type: string;
  name: string;
  label?: string;
};

export default function UniImageInput({ type, name, label }: TInputProps) {
  return (
    <div style={{ marginBottom: '20px' }}>
      <Controller
        name={name}
        render={({ field: { onChange, value, ...field } }) => (
          <Form.Item label={label}>
            <Input
              value={value?.fileName}
              {...field}
              type={type}
              onChange={(e) => onChange(e.target.value?.[0])}
              size='large'
            />
          </Form.Item>
        )}
      />
    </div>
  );
}
