import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import triangle from "../../assets/images/auth/triangle.svg";
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const ResetPassword = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };


  return (
    <section id="auth_banner" className="flex items-center justify-start min-h-screen bg-gray-100">
      <div className="flex items-start w-full p-8 mx-4">
        <div className="w-full max-w-lg">
          <div className="flex items-center gap-2 ml-[-3rem] md:ml-[-2rem] mb-4">
            <img src={triangle} alt="" className='w-7 md:w-auto' />
            <h2 className="text-3xl text-gray-800 font-semibold textColor">Reset Password</h2>
          </div>

          <form className="space-y-6" autoComplete="off">
            <div className="relative">
              <label className="text-gray-800 mb-1 block" htmlFor="password">Password</label>
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                required
                className="w-full px-4 py-3 text-gray-800 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400 pr-10"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer mt-8" onClick={togglePasswordVisibility}>
                {showPassword ? <FaEyeSlash className="text-gray-600" /> : <FaEye className="text-gray-600" />}
              </div>
            </div>
            <div className="relative">
              <label className="text-gray-800 mb-1 block" htmlFor="confirmPassword">Confirm Password</label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showPassword ? 'text' : 'password'}
                required
                className="w-full px-4 py-3 text-gray-800 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400 pr-10"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer mt-8" onClick={togglePasswordVisibility}>
                {showPassword ? <FaEyeSlash className="text-gray-600" /> : <FaEye className="text-gray-600" />}
              </div>
            </div>
            <div className="mt-6">
              <button
                type="submit"
                className="w-full py-4 text-sm tracking-wide text-white bg-purple-600 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-400"
              >
                Reset Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ResetPassword;
