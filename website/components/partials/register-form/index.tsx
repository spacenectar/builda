import React, { useEffect, useId, useState } from 'react';
import { useFormik, FormikProps, FormikValues } from 'formik';
import { useRouter } from 'next/router';
import * as yup from 'yup';

// Import components
import { Button, Card, InputFactory } from 'components';

// Import helpers
import { handleFormValidation } from 'lib/helpers';

// Import Stylesheet
import styles from './styles.module.scss';

// Import Types
import type { InputValue } from 'lib/types/input-value';

const validationSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required().min(8),
  confirmPassword: yup
    .string()
    .required()
    .test('passwords-match', 'Passwords must match', function (value) {
      return this.parent.password === value;
    }),
  displayName: yup.string().required()
});

export interface RegisterFormData {
  email: InputValue;
  password: InputValue;
  confirmPassword?: InputValue;
  displayName: InputValue;
}

// Prop Types
export interface Props extends React.ComponentProps<'form'> {
  /**
   * The name of the application
   */
  appName: string;
  /**
   * The logo JSX element
   */
  logo: JSX.Element;
  /**
   * The function to use to register the user
   */
  onRegister: (data: RegisterFormData) => void;
  /**
   * Register error message
   */
  registerError?: string;
}

/**
 * The register component is used to display the registration form.
 */
export const RegisterForm: React.FC<Props> = ({
  appName,
  logo,
  onRegister,
  registerError = '',
  ...props
}) => {
  const [errorMessage, setErrorMessage] = useState(registerError);

  const router = useRouter();

  useEffect(() => {
    setErrorMessage(registerError);
  }, [registerError]);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
      displayName: ''
    },
    validationSchema,
    onSubmit: (values: Partial<RegisterFormData>) => {
      const registrationDetails = {
        email: values.email,
        password: values.password,
        displayName: values.displayName
      };

      onRegister(registrationDetails);
    }
  }) as unknown as FormikProps<FormikValues>;

  const formId = `${useId()}-form`;
  const emailId = `${useId()}-email`;
  const passwordId = `${useId()}-password`;
  const confirmPasswordId = `${useId()}-confirm-password`;
  const nameId = `${useId()}-displayName`;

  return (
    <Card className={styles['register']}>
      <Card.Body overflowY="visible" className={styles['body']}>
        <div className={styles['header']}>
          <div className={styles['logo']}>{logo}</div>
          <h2 className={styles['title']}>Sign up to {appName}</h2>
        </div>
        <form
          className={styles[`form`]}
          {...props}
          id={formId}
          onSubmit={formik.handleSubmit}
        >
          <>
            <InputFactory
              id={emailId}
              labelText="Email"
              type="email"
              required
              {...formik.getFieldProps('email')}
              {...handleFormValidation(formik, 'email')}
            />
            <InputFactory
              id={passwordId}
              labelText="Password"
              type="password"
              required
              {...formik.getFieldProps('password')}
              {...handleFormValidation(formik, 'password')}
            />
            <InputFactory
              id={confirmPasswordId}
              labelText="Confirm Password"
              type="password"
              required
              {...formik.getFieldProps('confirmPassword')}
              {...handleFormValidation(formik, 'confirmPassword')}
            />
            <InputFactory
              id={nameId}
              labelText="Name"
              type="text"
              required
              {...formik.getFieldProps('displayName')}
              {...handleFormValidation(formik, 'displayName')}
            />
          </>

          {errorMessage && (
            <p className={styles['error-message']}>{errorMessage}</p>
          )}

          <Button
            type="submit"
            variant="primary"
            className={styles['register-button']}
            label="Sign Up"
            loading={!errorMessage && formik.isSubmitting}
            loadingIndicator={'Signing up...'}
            disabled={formik.isValidating || !formik.isValid}
          />
          <Button
            type="button"
            className={styles['forgot-password-button']}
            label="Already have an account? Login"
            variant="text"
            onClick={() => {
              router.push('/login');
            }}
          />
        </form>
      </Card.Body>
    </Card>
  );
};

RegisterForm.displayName = 'RegisterForm';

export default RegisterForm;
