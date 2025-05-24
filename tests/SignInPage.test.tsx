import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SignInPage from '../src/app/login/page';

// Mock next/navigation’s useRouter
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

// Mock AuthContext
const mockLogin = jest.fn();
const mockUser = { userType: 'tutor' };
jest.mock('@/context/AuthContext', () => ({
  useAuth: () => ({
    user: mockUser,
    login: mockLogin,
  }),
}));


// Mock ReCAPTCHA - simulate user completing the CAPTCHA when clicked
jest.mock('react-google-recaptcha', () => (props: any) => (
  <div
    data-testid="recaptcha"
    onClick={() => props.onChange('dummy-captcha-value')}
  >
    ReCAPTCHA Mock
  </div>
));

describe('SignInPage Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  /**
   * Test 1 - Ensures that an error appears when user enters an invalid email.
   * This focuses on the email validation behavior.
   */
  test('shows error when email is invalid', async () => {
    render(<SignInPage />);
    // Type an invalid email into the email input
    await userEvent.type(screen.getByTestId('email-input'), 'invalid-email-with-required-expression');
    // Type a valid password
    await userEvent.type(screen.getByTestId('password-input'), 'even-enter-validpassword');
    // Simulate completing the CAPTCHA
    fireEvent.click(screen.getByTestId('recaptcha'));
    // Submit the form
    const form = screen.getByRole('form');
    fireEvent.submit(form);
    // Check that the alert appears with the correct error message
    await waitFor(() => {
      expect(screen.getByTestId('alert')).toHaveTextContent('Please enter a valid email address.');
    });
  });

  /**
   * Test 2 - Ensures that error appears when password is empty.
   * This tests the empty password behaviour
   */
  test('show error when password is empty', async() => {
    render(<SignInPage/>);
    // Type a vaild email
    await userEvent.type(screen.getByTestId('email-input'), 'jay@example.com');
    fireEvent.click(screen.getByTestId('recaptcha'));
    // Submit the form
    const form = screen.getByRole('form');
    fireEvent.submit(form);
    // Verify the error message about missing password
    await waitFor(() => {
      expect(screen.getByTestId('alert')).toHaveTextContent('Please enter your password.');
    });
  });

  /**
   * Test 3: Ensures that error appears when CAPTCHA is NOT completed.
   * Verfies the CAPTCHA logic and API will work as expected.
   */
  test('show error when captcha is not completed', async () => {
    render(<SignInPage/>);
    // Enter valid email and password
    await userEvent.type(screen.getByTestId('email-input'),'tutor1@example.com');
    await userEvent.type(screen.getByTestId('password-input'),'astrongpassword');

    // SKIP clicking on reCAPTCHA

    // Submit the form
    const form = screen.getByRole('form');
    fireEvent.submit(form);
    // Verify the error message about missing password
    await waitFor(() => {
      expect(screen.getByTestId('alert')).toHaveTextContent('Please verify you are not a robot.');
    });
  });


  /**
   * Test 4: Ensure that login succeeds with valid crendtials + completed CAPTCHA,
   * and the user will be redirected to their correct route.
   */
  test("logs in successfully and redirects to tutor's page", async() => {
    // Make our mock login return true for valid credentials
    mockLogin.mockReturnValueOnce(true);

    render(<SignInPage />);

    // Fill in valid email and password
    await userEvent.type(screen.getByTestId('email-input'), 'tutor1@example.com');
    await userEvent.type(screen.getByTestId('password-input'), 'Password123!');

    // Simulate completing the CAPTCHA
    fireEvent.click(screen.getByTestId('recaptcha'));

    // Submit the form
    const form = screen.getByRole('form');
    fireEvent.submit(form);

    // Expect success alert
    await waitFor(() => {
      expect(screen.getByTestId('alert')).toHaveTextContent(
        'Login successful! Redirecting to your dashboard now ...'
      );
    });
    // DOUBLE Check that login was called with the correct credentials
    expect(mockLogin).toHaveBeenCalledWith('tutor1@example.com', 'Password123!');
  });



});