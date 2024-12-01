import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { TextField, Button, Typography, CircularProgress, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import auth from '../fetchAPI/auth';
import GoogleLoginButton from '../component/google';

interface IFormInput {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>();
  const [loading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    setLoading(true);
    const result = await auth.login(data);
    if (result) {
      navigate('/home');
    }
    setLoading(false);
  };

  const handleGoogleLogin = async (response: any) => {
    const result = await auth.loginGoogle();
    if (result) {
      navigate('/home');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          {...register('email', { 
            required: 'Email is required', 
            pattern: { value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: 'Invalid email format' }
          })}
          error={!!errors.email}
          helperText={errors.email ? errors.email.message : ''}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          {...register('password', { 
            required: 'Password is required',
            minLength: { value: 6, message: 'Password must be at least 6 characters' }
          })}
          error={!!errors.password}
          helperText={errors.password ? errors.password.message : ''}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading}>
          {loading ? <CircularProgress size={24} color="inherit" /> : 'Login'}
        </Button>
      </form>
      <GoogleLoginButton loading={loading} handleGoogleLogin={handleGoogleLogin} />
      <div style={{ marginTop: '10px', textAlign: 'center' }}>
        <Typography variant="body2">
          Don't have an account?{' '}
          <Link 
            href="#" 
            onClick={() => navigate('/register')}
            underline="hover"
          >
            Register
          </Link>
        </Typography>
      </div>
    </div>
  );
};

export default Login;
