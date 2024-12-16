import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { TextField, Button, Typography, CircularProgress, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import auth from '../api/auth';

// Define the types for the form data
interface IFormInput {
  email: string;
  password: string;
  confirmPassword: string; // Add the confirm password field
}

const Register: React.FC = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }, watch } = useForm<IFormInput>();
  const [loading, setLoading] = useState(false); // Loading state

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    setLoading(true);
    const result = await auth.register(data);
    if (result) {
      navigate('/login');
    }
    setLoading(false);
  };

  // Watch the password field to validate confirm password
  const password = watch('password');

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px' }}>
      <Typography variant="h4">Register</Typography>
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
        <TextField
          label="Confirm Password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          {...register('confirmPassword', {
            required: 'Please confirm your password',
            validate: value =>
              value === password || 'Passwords do not match'
          })}
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword ? errors.confirmPassword.message : ''}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading}>
          {loading ? <CircularProgress size={24} color="inherit" /> : 'Register'}
        </Button>

        <div style={{ marginTop: '10px', textAlign: 'center' }}>
          <Typography variant="body2">
            Do you have an account?{' '}
            <Link 
              href="#" 
              onClick={() => navigate('/login')}
              underline="hover"
            >
            Login
          </Link>
        </Typography>
      </div>
      </form>
    </div>
  );
};

export default Register;
