import { Form, Select } from 'antd';
import React, { useEffect } from 'react';
import { Controller, useFormContext, useWatch } from 'react-hook-form';

type TUniSelectProps = {
  name: string;
  label?: string;
  options: { value: string; label: string; disabled?: boolean }[] | undefined;
  disabled?: boolean;
  mode?: 'multiple' | undefined;
  onValueChange: React.Dispatch<React.SetStateAction<string>>;
};

export default function UniSelectWithWatch({
  label,
  name,
  options,
  disabled,
  mode,
  onValueChange,
}: TUniSelectProps) {
  const { control } = useFormContext();
  const inputValue = useWatch({
    control,
    name,
  });

  useEffect(() => {
    onValueChange(inputValue);
  }, [inputValue]);

  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => (
        <Form.Item label={label}>
          <Select
            mode={mode}
            style={{ width: '100%' }}
            {...field}
            options={options}
            size='large'
            disabled={disabled}
          />
          {error && <small style={{ color: 'red' }}>{error.message}</small>}
        </Form.Item>
      )}
    />
  );
}
