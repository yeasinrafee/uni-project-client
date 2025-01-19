import { Form } from 'antd';
import { ReactNode } from 'react';
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from 'react-hook-form';

type TFormConfig = {
  defaultValues?: Record<string, any>;
  resolver?: any;
};
type TFormProps = {
  onSubmit: SubmitHandler<FieldValues>;
  children: ReactNode;
} & TFormConfig;

export default function UniForm({
  onSubmit,
  children,
  defaultValues,
  resolver,
}: TFormProps) {
  const formConfig: TFormConfig = {};

  // Check if there is any default values
  if (defaultValues) {
    formConfig['defaultValues'] = defaultValues;
  }

  // Check if there is any zod resolver
  if (resolver) {
    formConfig['resolver'] = resolver;
  }

  const methods = useForm(formConfig);
  return (
    <FormProvider {...methods}>
      <Form layout='vertical' onFinish={methods.handleSubmit(onSubmit)}>
        {children}
      </Form>
    </FormProvider>
  );
}
