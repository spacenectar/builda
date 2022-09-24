import React, { useState, useId, useEffect } from 'react';
import { useFormik, FormikValues, FormikProps } from 'formik';
import { useRouter } from 'next/router';
import * as yup from 'yup';

// Import components
import { Button, Card, InputFactory } from 'components';

// Import helpers
import { handleFormValidation } from 'lib/helpers';

// Import Stylesheet
import styles from './styles.module.scss';

// Prop Types
export interface Props extends React.ComponentProps<'form'> {
  /**
   * The logo JSX element
   */
  logo: JSX.Element;
  /**
   * If the email address is already available, this will be the value of the email input
   */
  email?: string;
  /**
   * If the password is already available, this will be the value of the password input
   */
  password?: string;
  /**
   * Should the continue button be disabled or enabled?
   * @default true
   */
  disableLogin?: boolean;
  /**
   * On Login button click
   */
  onLogin?: ({ email, password }: { email: string; password: string }) => void;
  /**
   * Text to display on the button
   * @default Continue'
   */
  buttonLabel?: string;
  /**
   * If there is an error, display it here
   */
  loginError?: string;
}

const validationSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required()
});

export interface LoginFormData {
  email: string;
  password: string;
}

/**
 * The `Authentication` component is used to display the authentication form.
 **/
export const Authentication: React.FC<Props> = ({
  logo,
  disableLogin,
  onLogin,
  loginError = '',
  ...props
}) => {
  const [errorMessage, setErrorMessage] = useState(loginError);

  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema,
    onSubmit: (values: LoginFormData) => {
      if (onLogin) {
        onLogin(values);
      }
    }
  }) as unknown as FormikProps<FormikValues>;

  useEffect(() => {
    setErrorMessage(loginError);
  }, [loginError]);

  const formId = `${useId()}-form`;
  const emailId = `${useId()}-email`;
  const passwordId = `${useId()}-password`;

  return (
    <Card className={styles['authentication']}>
      <Card.Body overflowY="visible" className={styles['body']}>
        <div className={styles['header']}>
          <div className={styles['logo']}>{logo}</div>
          <h2 className={styles['title']}>Login</h2>
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
              {...formik.getFieldProps('email')}
              {...handleFormValidation(formik, 'email')}
            />
            <InputFactory
              id={passwordId}
              labelText="Password"
              type="password"
              {...formik.getFieldProps('password')}
              {...handleFormValidation(formik, 'password')}
            />
          </>
          {errorMessage && (
            <p className={styles['error-message']}>{errorMessage}</p>
          )}
          <div className={styles['main-buttons']}>
            <Button
              type="submit"
              className={styles['submit-button']}
              label="Login"
              loading={!errorMessage && formik.isSubmitting}
              loadingIndicator="Logging in..."
              disabled={
                !formik.dirty ||
                formik.isValidating ||
                !formik.isValid ||
                disableLogin
              }
            />
            <Button
              type="submit"
              variant="secondary"
              className={styles['register-button']}
              label="Register"
              onClick={() => {
                router.push('/register');
              }}
            />
          </div>
          {/* <Button
            type="button"
            className={styles['forgot-password-button']}
            label="I've forgotten my password"
            variant="text"
            onClick={() =>
              alert(
                "well that's a bugger, I've not implemented the password reset yet!"
              )
            }
          /> */}
        </form>
      </Card.Body>
    </Card>
  );
};

Authentication.displayName = 'Authentication';

export default Authentication;
