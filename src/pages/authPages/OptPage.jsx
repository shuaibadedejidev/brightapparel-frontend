import React, { useState, useEffect, useRef } from 'react';
import { CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';
import useUserStore from '../../store/useUserStore';
import { useNavigate } from 'react-router';

export default function App() {
  // State variables
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(30); // 30 seconds
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const [statusMessage, setStatusMessage] = useState({ type: '', text: '' });

  const navigate = useNavigate();

  const { requestOtp, verifyOtp, isVerifyingOtp } = useUserStore();

  // References for 6 OTP input boxes
  const inputRefs = useRef([]);

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  useEffect(() => {
    let interval = null;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTime) => prevTime - 1);
      }, 1000);
    } else {
      setIsResendDisabled(false);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleChange = (e, index) => {
    const value = e.target.value;

    // Allow only single numeric digit
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    // Take the last typed character in case of rapid overwrite
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    // Clear any active alert state when typing
    if (statusMessage.text) {
      setStatusMessage({ type: '', text: '' });
    }

    // Auto-advance focus to next input if digit entered
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace') {
      if (!otp[index] && index > 0) {
        // If current field is empty and backspace pressed, move to previous input
        inputRefs.current[index - 1]?.focus();
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      e.preventDefault();
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < 5) {
      e.preventDefault();
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text/plain').trim();
    // Extract numbers only from pasted string
    const digitsOnly = pastedData.replace(/\D/g, '');

    if (digitsOnly.length > 0) {
      const newOtp = [...otp];
      for (let i = 0; i < 6; i++) {
        if (digitsOnly[i]) {
          newOtp[i] = digitsOnly[i];
        }
      }
      setOtp(newOtp);

      // Focus the input immediately after the last pasted digit or the last box
      const nextIndex = Math.min(digitsOnly.length, 5);
      inputRefs.current[nextIndex]?.focus();

      setStatusMessage({ type: '', text: '' });
    }
  };

  const handleResend = async () => {
    if (isResendDisabled) return;

    // Reset OTP fields, timer, and state
    setOtp(['', '', '', '', '', '']);
    setTimer(30);
    setIsResendDisabled(true);
    await requestOtp()
    setStatusMessage({ type: 'success', text: 'A new verification code has been sent!' });

    // Auto focus first input field
    setTimeout(() => {
      inputRefs.current[0]?.focus();
    }, 100);
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    const enteredCode = otp.join('');

    if (enteredCode.length < 6) {
      setStatusMessage({ type: 'error', text: 'Please enter a complete 6-digit code.' });
      return;
    }

    const data = {
      email: localStorage.getItem('email'),
      otpCode: enteredCode
    }

    const success = await verifyOtp(data)
    if (success) navigate('/')
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center flex-col gap-8 p-4 font-sans antialiased select-none">
      <div>

        {/* Heading Section */}
        <div className="mt-8 text-center space-y-3">
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
            OTP Verification
          </h1>

          <p className="text-sm text-slate-500 font-normal leading-relaxed px-2">
            Enter the verification code we have sent to
            <br />
            <span className="font-semibold text-accent block mt-1 tracking-wide text-base">
              {localStorage.getItem('email')}
            </span>
          </p>
        </div>

        {/* OTP Input Grid */}
        <div className="mt-10 px-1">
          <div className="flex justify-between items-center gap-1.5 sm:gap-2">
            {otp.map((digit, idx) => (
              <input
                key={idx}
                ref={(el) => (inputRefs.current[idx] = el)}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(e, idx)}
                onKeyDown={(e) => handleKeyDown(e, idx)}
                onPaste={handlePaste}
                className={`w-11 h-12 sm:w-12 sm:h-13 text-center text-xl font-bold text-slate-800 rounded-xl bg-slate-50/80 border transition-all duration-200 outline-none
                    ${digit ? 'border-[#7BA126] bg-white shadow-sm ring-2 ring-[#7BA126]/20' : 'border-slate-200'}
                    focus:border-[#7BA126] focus:bg-white focus:ring-2 focus:ring-[#7BA126]/30 shadow-inner`}
              />
            ))}
          </div>
        </div>

        {/* Toast / Status Feedback Alert */}
        {statusMessage.text && (
          <div className={`mt-6 p-3 rounded-xl text-xs font-medium flex items-center gap-2 justify-center transition-all animate-fadeIn ${statusMessage.type === 'success'
            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
            : statusMessage.type === 'error'
              ? 'bg-rose-50 text-rose-600 border border-rose-200'
              : 'bg-slate-50 text-slate-600 border border-slate-200'
            }`}>
            {statusMessage.type === 'success' && <CheckCircle2 size={16} className="shrink-0 text-emerald-600" />}
            {statusMessage.type === 'error' && <AlertCircle size={16} className="shrink-0 text-rose-500" />}
            <span>{statusMessage.text}</span>
          </div>
        )}

        {/* Verify Button */}
        <div className="mt-8">
          <button
            onClick={handleVerify}
            disabled={isVerifyingOtp}
            className="w-full py-3.5 px-4 rounded-full text-white font-medium text-base shadow-md hover:shadow-lg active:scale-[0.99] transition-all duration-200 flex items-center justify-center space-x-2 bg-gradient-to-r from-accent to-[#6A8F1E] hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-[#7BA126] focus:ring-offset-2 disabled:opacity-75 cursor-pointer"
          >
            {isVerifyingOtp ? (
              <RefreshCw size={20} className="animate-spin text-white" />
            ) : (
              <span>Verify OTP</span>
            )}
          </button>
        </div>
      </div>

      {/* Footer Timer and Resend Controls */}
      <div className="text-center space-y-3 pb-4">
        <p className="text-xs text-slate-500">
          You may resend OTP in{' '}
          <span className="font-semibold text-slate-700">
            {formatTime(timer)} min
          </span>
        </p>

        <p className="text-xs font-normal text-slate-400">
          Don't receive OTP?{' '}
          <button
            type="button"
            onClick={handleResend}
            disabled={isResendDisabled}
            className={`font-semibold transition-colors duration-200 ${isResendDisabled
              ? 'text-[#7BA126]/50 cursor-not-allowed'
              : 'text-[#7BA126] hover:underline cursor-pointer'
              }`}
          >
            Resend OTP
          </button>
        </p>
      </div>
    </div>
  );
}