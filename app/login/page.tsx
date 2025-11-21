'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

const LoginPage = () => {
  const [netid, setNetid] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ netid, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Login failed');
      }

      const data = await response.json();
      
      if (data.success && data.student) {
        // Save student data to localStorage
        localStorage.setItem('studentData', JSON.stringify(data.student));
        // Redirect to dashboard
        router.push('/dashboard');
      } else {
        throw new Error(data.error || 'Invalid response from server');
      }
    } catch (err: any) {
      setError(err.message || 'Login failed. Please try again.');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-950 to-black flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-6xl font-black mb-3">
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">ACADEMIA</span>
          </h1>
          <h2 className="text-5xl font-black mb-4">
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">NEXUS</span>
          </h2>
          <p className="text-slate-400 text-lg font-semibold">Your Creative Academic Dashboard</p>
        </div>

        {/* Login Form Card */}
        <div className="relative group">
          {/* Gradient border */}
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-cyan-500 to-purple-500 rounded-3xl opacity-75 group-hover:opacity-100 blur transition-opacity duration-300" />
          
          <form
            onSubmit={handleLogin}
            className="relative bg-slate-900/95 backdrop-blur-xl rounded-3xl p-8 space-y-6 border border-slate-700"
          >
            {/* Error Message */}
            {error && (
              <div className="bg-red-500/20 border border-red-500/50 rounded-xl p-4 text-red-400 text-sm font-semibold animate-pulse">
                ⚠️ {error}
              </div>
            )}

            {/* NetID Input */}
            <div className="relative group/input">
              <label className="block text-sm font-bold text-slate-300 mb-2 uppercase tracking-wider">
                SRM NetID / Email
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={netid}
                  onChange={(e) => setNetid(e.target.value)}
                  placeholder="RA2511026010006"
                  disabled={loading}
                  className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
                />
                <span className="absolute right-4 top-3.5 text-2xl">🆔</span>
              </div>
            </div>

            {/* Password Input */}
            <div className="relative group/input">
              <label className="block text-sm font-bold text-slate-300 mb-2 uppercase tracking-wider">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  disabled={loading}
                  className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
                />
                <span className="absolute right-4 top-3.5 text-2xl">🔐</span>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || !netid || !password}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-bold text-lg uppercase tracking-wider transition-all hover:shadow-lg hover:shadow-blue-500/50 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 hover:-translate-y-1 duration-300 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  AUTHENTICATING...
                </>
              ) : (
                <>
                  LOGIN TO DASHBOARD
                  <span>→</span>
                </>
              )}
            </button>

            {/* Info Text */}
            <p className="text-center text-xs text-slate-400 font-semibold">
              🔒 Your credentials are securely transmitted via HTTPS
            </p>
          </form>
        </div>

        {/* Footer Info */}
        <div className="mt-8 text-center space-y-2 text-slate-400 text-sm">
          <p>📚 Real-time data from SRM Academia Portal</p>
          <p>✨ Built with Next.js, React, and Puppeteer</p>
          <p className="text-slate-500 text-xs mt-4">Academia Nexus © 2024 - Siddharth</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
