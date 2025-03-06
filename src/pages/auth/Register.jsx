/* eslint-disable no-unused-vars */
import { useState } from "react";
import signinImage from "../../assets/images/auth/signin.svg";
import logo from "../../assets/images/auth/logo.svg";
import blurImage from "../../assets/images/auth/bluer.svg";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Input from "../../components/shared/input/Input";
import Button from "../../components/shared/button/Button";
import { useSignupMutation } from "../../services/auth/authApi";

const Register = () => {
  const navigate = useNavigate();
  const [signup, {isLoading}] = useSignupMutation()
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const formDataHandler = (e) => setFormData({...formData, [e.target.name]: e.target.value})

  const formSubmitHandler = async (e) => {
    e.preventDefault()
    const areFieldsEmpty = Object.values(formData).some(value => !value);

    if(formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not matched');
      return;
    } else if (areFieldsEmpty) {
      toast.error('Are field are required');
      return;
    }

    try {
      await signup(formData).unwrap()
      toast.success('Signup successful! You can now log in.')
      navigate('/login')
    } catch (error) {
      toast.error('User already exists or Internal Server error')
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 min-h-screen">
      {/* Image Container */}
      <div className="order-2 md:order-2 md:col-span-5 bg-[#FFDEDC] flex items-center justify-center relative">
        <img
          src={signinImage}
          alt="Registration Illustration"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center p-6 top-[20%] w-[75%] left-[5%]">
          <div
            className="text-white p-6 rounded-lg w-full"
            style={{
              background: `linear-gradient(to bottom, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.4)), url(${blurImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backdropFilter: "blur(10px)",
              border: "1px solid white",
            }}
          >
            <p className="text-lg font-medium">
              Real-time insights for real-time care. <br /> Sensors that track
              and enhance hygiene. <br /> Efficient management at your
              fingertips.
            </p>
          </div>
        </div>
      </div>

      {/* Form Container */}
      <div className="order-1 md:order-2 md:col-span-7 p-6 flex flex-col top-[10%] min-h-screen relative">
        <div className="flex flex-col pt-8 lg:px-8">
          <div className="sm:mx-auto mb-5 sm:w-full sm:max-w-sm flex justify-center">
            <div className="logo text-xl font-bold">
              <img src={logo} alt="logo" className="w-auto h-12" />
            </div>
          </div>
          <h2 className="text-center text-3xl font-bold leading-9 tracking-tight text-gray-900">
            Create New Account
          </h2>
          <p className="mt-1 text-center text-sm leading-6 text-gray-600">
            Getting started is easy
          </p>

          <div className="sm:mx-auto sm:w-full sm:max-w-sm mt-4">
            <form className="space-y-6" onSubmit={formSubmitHandler}>
              <div>
                <Input
                  id="full-name"
                  name="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => formDataHandler(e)}
                  placeholder="Full Name"
                />
              </div>

              <div>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="Email address"
                  value={formData.email}
                  onChange={(e) => formDataHandler(e)}
                />
              </div>

              <div>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={(e) => formDataHandler(e)}
                />
              </div>

              <div>
                <Input
                  id="confirm-password"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={(e) => formDataHandler(e)}
                />
              </div>
              <div>
                <Button disabled={isLoading} text={isLoading ? 'Signing up...':'Sign up'} type="submit" width="w-full" />
              </div>

              <div>
                <p className="text-center text-lg text-gray-600">
                  have an account?{" "}
                  <Link
                    to="/"
                    className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                  >
                    Signin
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
