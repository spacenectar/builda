import ComponentStatuses from 'lib/types/component-statuses';
import { FormikProps, FormikValues } from 'formik';

const handleFormValidation = (
  formik: FormikProps<FormikValues>,
  input: string | number
) => {
  const { errors, touched } = formik;
  // Only worry about the touched value if it has been specifically requested, otherwise assume it's been touched
  if ((touched ? touched[input] : true) && errors[input]) {
    return {
      status: 'error' as ComponentStatuses,
      statusMessage: errors[input] as string
    };
  }
  return {
    status: 'default' as ComponentStatuses,
    statusMessage: ''
  };
};

export default handleFormValidation;
