import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { BookOpen } from 'lucide-react';
import toast from 'react-hot-toast';
import { Button, Input } from '@/components/ui';
import { useAuthStore } from '@/store/useAuthStore';

export default function SignupPage() {
  const navigate = useNavigate();
  const signup = useAuthStore(s => s.signup);
  const loading = useAuthStore(s => s.loading);
  const error = useAuthStore(s => s.error);

  const [form, setForm] = useState({
    name: '',
    email: '',
    regNumber: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = 'Full name is required';
    }

    if (!form.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!form.regNumber.trim()) {
      newErrors.regNumber = 'Registration number is required';
    }

    if (!form.password) {
      newErrors.password = 'Password is required';
    } else if (form.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const success = await signup(
      form.email,
      form.password,
      form.name,
      form.regNumber
    );

    if (success) {
      toast.success('Account created successfully!');
      navigate('/');
    } else {
      toast.error(error || 'Signup failed');
    }
  };

  return (
    <div className="min-h-dvh bg-surface dark:bg-surface flex flex-col items-center justify-center px-4 py-8">
      <div className="w-full max-w-sm space-y-6">
        {/* Logo and Title */}
        <div className="space-y-3 text-center">
          <div className="flex items-center justify-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-ink dark:text-slate-100">CampusSync</h1>
          </div>
          <p className="text-sm text-ink-muted dark:text-slate-400">
            Create an account to get started
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Full Name"
            type="text"
            placeholder="John Doe"
            value={form.name}
            onChange={(e) => {
              setForm({ ...form, name: e.target.value });
              if (errors.name) setErrors({ ...errors, name: '' });
            }}
            error={errors.name}
            containerClassName="w-full"
          />

          <Input
            label="Email"
            type="email"
            placeholder="john@university.edu"
            value={form.email}
            onChange={(e) => {
              setForm({ ...form, email: e.target.value });
              if (errors.email) setErrors({ ...errors, email: '' });
            }}
            error={errors.email}
            containerClassName="w-full"
          />

          <Input
            label="Registration Number"
            type="text"
            placeholder="REG123456"
            value={form.regNumber}
            onChange={(e) => {
              setForm({ ...form, regNumber: e.target.value });
              if (errors.regNumber) setErrors({ ...errors, regNumber: '' });
            }}
            error={errors.regNumber}
            containerClassName="w-full"
          />

          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            value={form.password}
            onChange={(e) => {
              setForm({ ...form, password: e.target.value });
              if (errors.password) setErrors({ ...errors, password: '' });
            }}
            error={errors.password}
            containerClassName="w-full"
            helper="At least 6 characters"
          />

          <Input
            label="Confirm Password"
            type="password"
            placeholder="••••••••"
            value={form.confirmPassword}
            onChange={(e) => {
              setForm({ ...form, confirmPassword: e.target.value });
              if (errors.confirmPassword) setErrors({ ...errors, confirmPassword: '' });
            }}
            error={errors.confirmPassword}
            containerClassName="w-full"
          />

          <Button
            type="submit"
            variant="primary"
            size="md"
            loading={loading}
            className="w-full"
          >
            Create Account
          </Button>
        </form>

        {/* Sign In Link */}
        <div className="text-center">
          <p className="text-sm text-ink-muted dark:text-slate-400">
            Already have an account?{' '}
            <Link
              to="/signin"
              className="font-semibold text-brand-600 hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300 transition-colors"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
