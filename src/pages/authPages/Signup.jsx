import { useState, useEffect } from 'react';
import { Link } from 'react-router'; 
import { ArrowLeft, User, Mail, Lock } from 'lucide-react';
import {useNavigate} from 'react-router';
import toast from 'react-hot-toast'
import useUserStore from '../../store/useUserStore';


export default function SignupPage() {
  const navigate = useNavigate();
  const {isSigningup, signup} = useUserStore()
  
  // 1. Centralized Form State
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    agreeTerms: false,
  });

  // 2. Handle Input Changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // 3. Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.fullName && !formData.email && !formData.password) {
      return toast.error('All fields requireds')
    }

    if (!formData.agreeTerms) {
      return toast.error('Agree to terms and conditions')
    }

    localStorage.setItem('email', formData.email)
    const success = await signup(formData);

    if (success) navigate('/validate-otp')
  };

  return (
    <div className="min-h-screen bg-base-200 mx-auto px-4 flex flex-col justify-center items-center mx-w-xl signup">

      <div 
        className="mb-6 text-center ">
          <h3 className="text-3xl font-bold text-shadow-accent text-black">Create an Account</h3>
          <p className="text-sm text-black mt-1">Please fill in the details to get you started</p>
      </div>

      {/* Main Container Card */}
      <div className="shadow-2xl w-full max-w-100 overflow-hidden rounded-2xl bg-white/75 px-auto p-5 space-y-5">

        <form onSubmit={handleSubmit} noValidate='novalidate' className="space-y-4 w-full">
          {/* Full Name Input */}
          <div className="form-control w-full">
            <label className="label">
              <span className="">Full Name:</span>
            </label>
            <label className="relative">
              <User className="icon absolute" />
              <input
                type="text"
                name="fullName"
                className="input grow"
                placeholder="John Doe"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </label>
          </div>

          {/* Email Input */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-medium">Email Address:</span>
            </label>
            <label className="relative">
              <Mail className="icon absolute" />
              <input
                type="email"
                name="email"
                className="input"
                placeholder="name@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </label>
          </div>

          {/* Password Input */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-medium">Password:</span>
            </label>
            <label className="relative">
              <Lock className="absolute icon" />
              <input
                type="password"
                name="password"
                className="grow input"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </label>
          </div>

          {/* Terms and Conditions Checkbox */}
          <div className="form-control">
            <label className="text-center">
              <input
                type="checkbox"
                name="agreeTerms"
                className=""
                checked={formData.agreeTerms}
                onChange={handleChange}
                required
              />
              <span className="ml-2 label-text text-sm">
                I agree to the <Link to="/terms" className="link link-hover text-primary font-medium">Terms & Conditions</Link>
              </span>
            </label>
          </div>

          {/* Submit Button */}
          <div className="form-control mt-5">
            <button type="submit" className="bg-accent hover:bg-accent/40 rounded-2xl py-1.5 font-medium shadow text-white cursor-pointer disabled:bg-accent/25" disabled={isSigningup ? true : false}>
              {isSigningup ? 'Signing up' : 'Sign Up'}
            </button>
          </div>
        </form>

        {/* Divider */}
        <div className="text-xs text-center">OR</div>

        {/* Redirect to Login */}
        <div className="text-center text-sm">
          <span className="text-base-content/70">Already have an account? </span>
          <Link to="/login" className="link link-hover font-bold text-secondary">
            <u>Log In here</u>
          </Link>
        </div>
      </div>
    </div>
  );
}