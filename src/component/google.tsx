import React from 'react';

interface GoogleLoginProps {
  loading: boolean;
  handleGoogleLogin: (arg: any) => any;
}

const GoogleLoginButton: React.FC<GoogleLoginProps> = ({ loading, handleGoogleLogin }) => {
  const buttonStyles = {
    backgroundColor: '#4285F4',
    color: 'white',
    fontSize: '16px',
    padding: '12px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    width: '100%',
    marginTop: '10px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    transition: 'background-color 0.3s ease',
  };

  const buttonDisabledStyles = {
    backgroundColor: '#d3d3d3',
    cursor: 'not-allowed',
  };

  const googleButtonWrapperStyles = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const googleIconStyles = {
    marginRight: '10px',
    width: '20px',
    height: '20px',
  };

  return (
    <div className="app">
      <button
        onClick={handleGoogleLogin}
        type="submit"
        style={loading ? { ...buttonStyles, ...buttonDisabledStyles } : buttonStyles}
        disabled={loading}
      >
        {loading ? (
          'Logging in...'
        ) : (
          <div style={googleButtonWrapperStyles}>
            <img
              src="https://cmctelecom.vn/wp-content/uploads/2024/01/png-transparent-google-logo-google-text-trademark-logo-480x470.png"
              alt="Google Logo"
              style={googleIconStyles}
            />
            Login with GOOGLE
          </div>
        )}
      </button>
    </div>
  );
};

export default GoogleLoginButton;
