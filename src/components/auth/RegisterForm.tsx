import React, { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Eye, EyeOff, Loader2, Mail, Lock, User } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Link, useNavigate } from 'react-router-dom';

export function RegisterForm() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    if (!fullName || !email || !password || !confirmPassword) {
      setError('Please fill in all fields');
      setIsLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      setIsLoading(false);
      return;
    }

    try {
      const { data, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            role: 'student', // Default role
          },
          emailRedirectTo: `${window.location.origin}/login`,
        },
      });

      if (authError) throw authError;

      // Create profile record if NOT created by triggers, though Supabase triggers are better for this.
      // But we will ensure the app shows success.
      if (data.user) {
        setSuccess(true);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to register account.');
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className="w-full max-w-md mx-auto p-8 rounded-2xl bg-white dark:bg-zinc-900 shadow-2xl border border-zinc-200 dark:border-zinc-800 text-center animate-in fade-in slide-in-from-bottom-4">
        <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <Mail className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white mb-2">Check your email</h2>
        <p className="text-zinc-500 dark:text-zinc-400 mb-8">
          We sent a verification link to <span className="font-medium text-zinc-800 dark:text-zinc-300">{email}</span>.
        </p>
        <button
          onClick={() => navigate('/login')}
          className="w-full flex justify-center py-2.5 px-4 border border-zinc-200 dark:border-zinc-700 rounded-xl shadow-sm text-sm font-semibold text-zinc-900 dark:text-white hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
        >
          Return to login
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto overflow-hidden rounded-2xl bg-white dark:bg-zinc-900 shadow-2xl border border-zinc-200 dark:border-zinc-800 transition-all duration-300 transform hover:shadow-3xl">
      <div className="p-8 sm:p-10">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white mb-2">
            Create account
          </h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Join Amoo Academy and start learning
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-sm animate-in fade-in slide-in-from-top-2">
            {error}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-5">
          <div className="space-y-1">
            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300" htmlFor="fullName">
              Full Name
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-zinc-400 group-focus-within:text-blue-500 transition-colors" />
              </div>
              <input
                id="fullName"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="block w-full pl-10 pr-3 py-2.5 outline-none border border-zinc-200 dark:border-zinc-700 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 text-zinc-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all sm:text-sm"
                placeholder="John Doe"
                required
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300" htmlFor="email">
              Email Address
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-zinc-400 group-focus-within:text-blue-500 transition-colors" />
              </div>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full pl-10 pr-3 py-2.5 outline-none border border-zinc-200 dark:border-zinc-700 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 text-zinc-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all sm:text-sm"
                placeholder="you@example.com"
                required
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300" htmlFor="password">
              Password
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-zinc-400 group-focus-within:text-blue-500 transition-colors" />
              </div>
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full pl-10 pr-10 py-2.5 outline-none border border-zinc-200 dark:border-zinc-700 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 text-zinc-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all sm:text-sm"
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-zinc-400 hover:text-zinc-500 focus:outline-none focus:text-zinc-600 active:scale-95 transition-all"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-zinc-400 group-focus-within:text-blue-500 transition-colors" />
              </div>
              <input
                id="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="block w-full pl-10 pr-10 py-2.5 outline-none border border-zinc-200 dark:border-zinc-700 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 text-zinc-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all sm:text-sm"
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-zinc-400 hover:text-zinc-500 focus:outline-none focus:text-zinc-600 active:scale-95 transition-all"
              >
                {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={cn(
              "w-full flex justify-center py-2.5 px-4 border border-transparent rounded-xl shadow-sm text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-zinc-900 transition-all active:scale-[0.98]",
              isLoading && "opacity-70 cursor-not-allowed"
            )}
          >
            {isLoading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              'Create account'
            )}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-zinc-600 dark:text-zinc-400">
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 transition-colors">
            Sign in instead
          </Link>
        </p>
      </div>
    </div>
  );
}
