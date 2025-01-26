import { Form, TimePicker } from 'antd';
import { Controller } from 'react-hook-form';

type TDatePickerProps = {
  name: string;
  label?: string;
};

export default function UniTimePicker({ name, label }: TDatePickerProps) {
  return (
    <div style={{ marginBottom: '20px' }}>
      <Controller
        name={name}
        render={({ field }) => (
          <Form.Item label={label}>
            <TimePicker
              {...field}
              size='large'
              style={{ width: '100%' }}
              format='HH:mm'
            />
          </Form.Item>
        )}
      />
    </div>
  );
}
