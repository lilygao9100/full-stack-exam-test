"use client";
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import CustomAlert from '../../components/CustomAlert';
import { useRouter } from 'next/navigation';
import ReCAPTCHA from "react-google-recaptcha";
import Image from "next/image";

const SignInPage = () => {
  // Access login() from AuthContext
  const {user, login } = useAuth();
  const router = useRouter(); // for redirecting
  
  // Form fields for email/password input.
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // CAPTCHA state
  const [captchaValue, setCaptchaValue] = useState<string | null>(null);
  
  // State for feedback alerts
  const [alert, setAlert] = useState({
    show: false,
    type: "" as "success" | "error" | "warning" | "info",
    message: "",
  });

  // Helper function to validate basic email format.
    const validateEmail = (email:string) => {
    const re = /^\S+@\S+\.\S+$/;
    return re.test(email);
  };

  // Function for user to sign up their account
  const handleSignUpClick = () => {
    router.push('/signup');  
  };

  // Function for user to submit their login form
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Clear any previous alerts before we start validation checks.
    setAlert({ show: false, type: "info", message: "" });

    // (1). Check for valid email format
    if (!validateEmail(email)) {
      setAlert({
        show: true,
        type: "error",
        message: "Please enter a valid email address.",
      });
      return;
    }

    // (2). Check if the provided password is empty
    if (!password) {
      setAlert({
        show: true,
        type: "error",
        message: "Please enter your password.",
      });
      return;
    }

    // (3). To verify CAPTCHA input matches the generated CAPTCHA
    if (!captchaValue) {
      setAlert({
        show: true,
        type: "error",
        message: "Please verify you are not a robot.",
      });
      return;
    }

    // (4). Attempt to login with provided credentials
    //    If successful, show a success alert, then redirect user to their corresponding page.
    const loggedInUser = login(email, password);
    if (loggedInUser) {
      setAlert({
        show: true,
        type: "success",
        message: "Login successful! Redirecting to your dashboard now ..."
      });
      
      // Redirect to the home page based on user's type after 1 second.
      setTimeout(() => {
        if (loggedInUser.userType === "tutor") {
          router.push("/tutors");
        } else if (loggedInUser.userType === "lecturer") {
          router.push("/lecturer");
        } else {
          // Fallback or default route
          router.push("/home");
        }
      }, 500);
    } else {
      // Invalid credentials
      setAlert({
        show: true,
        type: "error",
        message: "Invalid email or password.",
      });
    }
  };

  return (
    <div className="flex h-full w-full overflow-hidden px-2 py-2">
      {/* LEFT SIDE - Login form */}
      <div className="
            w-full 
            md:w-1/2 
            flex flex-col 
            items-center 
            justify-center 
            px-4 
            bg-white
            "
      >
        <div className="max-w-md w-full">
          {/* Heading */}
          <div className="flex flex-col gap-2 mb-8">
            <h1 className="text-5xl font-bold ">Login</h1>
            <p className="text-xl font-medium pt-10">Enter your account details</p>
          </div >
          <div data-testid="alert">
            {alert.show && (
              <CustomAlert type={alert.type} message={alert.message} />
            )}
          </div>
          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4" role="form">
            {/* Email field */}
            <div>
              <label
                htmlFor="email"
                className="block text-lg font-medium mb-1"
              >
                Email:
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border border-gray-300 rounded p-2 w-5/6"
                placeholder="your_email@rmit.edu.au"
                required
                data-testid="email-input"
              />
            </div>

            {/* Password field */}
            <div>
              <label
                htmlFor="password"
                className="block text-lg font-medium mb-1"
              >
                Password:
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border border-gray-300 rounded p-2 w-5/6"
                required
                data-testid="password-input"
              />
            </div>

            <ReCAPTCHA
                data-testid="recaptcha"
                sitekey="6LcucQgrAAAAAAA-nuRKTzwIfSdRRx1RH9d9Vlhf"
                onChange={setCaptchaValue}
            />
           
            {/* Submit button */}
            <button
              type="submit"
              className="
                  bg-indigo-400 
                  text-white 
                  py-3 
                  rounded
                  w-5/6 
                  mt-4
                  block 
                  text-center
                  font-semibold
                  hover:bg-indigo-700 
                  transition-colors"
              data-testid="login-button"

            >
              Login
            </button>
          </form>

          {/* Sign Up row */}
          <div className="flex items-center justify-start gap-2 mt-8 pt-6">
            <p className="text-gray-500 text-base">Don’t have an account?</p>
            <button
              onClick={handleSignUpClick}
              className="
                bg-gray-100 
                px-3 
                py-1 
                rounded 
                hover:bg-gray-300 
                transition-colors
                text-base
                font-medium
                justify-center
                items-center"
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE - Visual Design */}
      <div className="
                hidden 
                md:flex w-1/2 
                bg-purple-200 
                text-white 
                relative 
                overflow-hidden 
                items-center 
                justify-center">
        {/* Purple background as the base layer */}
        <div className="
                absolute 
                inset-0 
                bg-purple-400 
                opacity-90 
                z-10"></div>
      
        {/* Vector images placed in different corners with varying sizes */}
        <Image
          src="/Images/login-vector.png"
          alt="Vector Design"
          width={600}
          height={600}
          className="
            absolute 
            w-5/6 
            top-5 
            right-3 
            transform 
            rotate-60 
            opacity-50 
            z-20"
        />
        <Image
          src="/Images/login-vector.png"
          alt="Vector Design"
          width={300}
          height={300}
          className="
            absolute 
            w-1/3 
            bottom-1 
            left-1 
            transform 
            -rotate-30 
            opacity-40 
            z-20"
        />
        <Image
          src="/Images/login-vector.png"
          alt="Vector Design"
          width={400}
          height={400}
          className="
            absolute 
            w-1/2 
            bottom-1 
            right-1 
            transform 
            rotate-10 
            opacity-30 
            z-20"
        />
        <Image
          src="/Images/login-vector.png"
          alt="Vector Design"
          width={400}
          height={400}
          className="
            absolute 
            w-1/2 
            top-1 
            left-1 
            transform 
            -rotate-12 
            opacity-40 
            z-20"
        />
        <Image
          src="/Images/login-vector.png"
          alt="Vector Design"
          width={900}
          height={900}
          className="
            absolute 
            w-full 
            left-5 
            transform 
            -rotate-12 
            opacity-20 
            z-20"
        />
        {/* Visual image centered in the middle */}
        <Image
          src="/Images/login-visual.png"
          alt="Visual Design"
          width={500}
          height={500}
          className="
            absolute 
            object-contain
            md:w-[500px] 
            z-30"
          style={{
            top: "60%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
        {/* Text overlay as the topmost layer, positioned in the top-left */}
        <div className="z-40 absolute top-5 left-10 p-3">
          <h1 className="
                  text-4xl 
                  font-bold
                  pb-2 
                  mb-4">
              Welcome to TeachTeam
          </h1>
          <p className="text-xl">
            Login to access your account.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;