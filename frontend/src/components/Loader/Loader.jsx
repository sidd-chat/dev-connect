import React from 'react'

const Loader = ({ message }) => {
  const spinnerStyle = {
    animation: "spinner_mnRT 1.6s cubic-bezier(0.52, 0.6, 0.25, 0.99) infinite"
  };

  const spinnerDelayed1 = {
    ...spinnerStyle,
    animationDelay: "0.2s"
  };

  const spinnerDelayed2 = {
    ...spinnerStyle,
    animationDelay: "0.4s"
  };

  return (
    <div className="flex flex-col gap-5 items-center justify-center my-50">
      <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <style>
          {`
            @keyframes spinner_mnRT {
              0% { r: 0; opacity: 1 }
              75%, 100% { r: 11px; opacity: 0 }
            }
          `}
        </style>
        <circle
          style={spinnerStyle}
          cx="12"
          cy="12"
          r="0"
          className="fill-current text-gray-500"
        />
        <circle
          style={spinnerDelayed1}
          cx="12"
          cy="12"
          r="0"
          className="fill-current text-gray-500"
        />
        <circle
          style={spinnerDelayed2}
          cx="12"
          cy="12"
          r="0"
          className="fill-current text-gray-500"
        />
      </svg>

      <p className='text-lg text-white'>{message}</p>
    </div>
  );
};

export default Loader