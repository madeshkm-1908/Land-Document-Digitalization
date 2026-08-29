import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, User, Landmark, Shield, FileText, Search, Building2, Award, TrendingUp } from 'lucide-react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import toast from 'react-hot-toast';

function Login({ onLogin }) {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      toast.success('Login successful! Welcome back!');
      onLogin();
    } else {
      if (formData.password !== formData.confirmPassword) {
        toast.error('Passwords do not match!');
        return;
      }
      toast.success('Account created successfully! Please login.');
      setIsLogin(true);
    }
  };

  const handleGoogleSuccess = (credentialResponse) => {
    console.log('Google login success:', credentialResponse);
    toast.success('Google login successful!');
    onLogin();
  };

  const handleGoogleError = () => {
    toast.error('Google login failed. Please try again.');
  };

  return (
    <GoogleOAuthProvider clientId="799687207111-2an3bo27tfgnc3ptuc3ptmotbk4hjttp.apps.googleusercontent.com">
      <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden" style={{
        background: 'linear-gradient(135deg, #0c0c1e 0%, #1a1a3e 30%, #2d1b69 60%, #764ba2 100%)'
      }}>
        {/* Animated Background Particles */}
        <div className="particles">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="particle"
              style={{
                width: Math.random() * 8 + 2 + 'px',
                height: Math.random() * 8 + 2 + 'px',
                left: Math.random() * 100 + '%',
                animationDuration: Math.random() * 20 + 10 + 's',
                animationDelay: Math.random() * 10 + 's',
                background: `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.1)`
              }}
            />
          ))}
        </div>

        <div className="w-full max-w-6xl flex flex-col lg:flex-row bg-white/10 backdrop-blur-2xl rounded-3xl shadow-2xl overflow-hidden border border-white/10 fade-in glow-effect">
          
          {/* Left Side - Branding with Images */}
          <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center text-white relative overflow-hidden">
            {/* Decorative Image Overlay */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-500 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-500 rounded-full blur-3xl"></div>
            </div>

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl shadow-lg">
                  <Landmark className="w-10 h-10 text-white" />
                </div>
                <h1 className="text-3xl font-bold">LandDoc <span className="text-yellow-400">AI</span></h1>
              </div>
              
              <h2 className="text-4xl lg:text-5xl font-bold mb-4 leading-tight">
                Smart Land Document <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
                  Intelligence System
                </span>
              </h2>
              
              <p className="text-white/80 text-lg mb-8">
                AI-powered platform for land record digitization, ownership verification, and title chain tracing.
              </p>

              {/* Feature Grid with Icons */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10 card-hover">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center mb-2">
                    <FileText className="w-5 h-5 text-white" />
                  </div>
                  <p className="text-sm font-medium">OCR Extraction</p>
                  <p className="text-xs text-white/50">From scanned deeds</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10 card-hover">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-green-400 to-emerald-500 flex items-center justify-center mb-2">
                    <Shield className="w-5 h-5 text-white" />
                  </div>
                  <p className="text-sm font-medium">Fraud Detection</p>
                  <p className="text-xs text-white/50">EC verification</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10 card-hover">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-blue-400 to-indigo-500 flex items-center justify-center mb-2">
                    <Search className="w-5 h-5 text-white" />
                  </div>
                  <p className="text-sm font-medium">Title Tracing</p>
                  <p className="text-xs text-white/50">Root to current</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10 card-hover">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-purple-400 to-pink-500 flex items-center justify-center mb-2">
                    <Building2 className="w-5 h-5 text-white" />
                  </div>
                  <p className="text-sm font-medium">Ownership Graph</p>
                  <p className="text-xs text-white/50">Visual lineage</p>
                </div>
              </div>

              <div className="mt-8 flex items-center gap-4 text-sm text-white/50">
                <span className="flex items-center gap-1">🔒 Secure</span>
                <span className="w-px h-4 bg-white/20"></span>
                <span className="flex items-center gap-1">⚡ AI-Powered</span>
                <span className="w-px h-4 bg-white/20"></span>
                <span className="flex items-center gap-1">📋 Government Grade</span>
              </div>
            </div>
          </div>

          {/* Right Side - Login/Signup Form */}
          <div className="lg:w-1/2 bg-white/95 backdrop-blur-sm p-8 lg:p-12 relative">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                {isLogin ? 'Welcome Back' : 'Create Account'}
              </h2>
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-sm text-purple-600 hover:text-purple-800 font-medium transition-colors"
              >
                {isLogin ? "Don't have an account? Sign Up" : 'Already have an account? Login'}
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    name="username"
                    placeholder="Full Name"
                    value={formData.username}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all bg-white/50"
                    required={!isLogin}
                  />
                </div>
              )}

              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all bg-white/50"
                  required
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all bg-white/50"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>

              {!isLogin && (
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all bg-white/50"
                    required={!isLogin}
                  />
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white rounded-xl font-semibold hover:shadow-lg hover:scale-[1.02] transition-all duration-300 shadow-lg"
              >
                {isLogin ? 'Login' : 'Create Account'}
              </button>
            </form>

            <div className="flex items-center gap-4 my-6">
              <div className="flex-1 h-px bg-gray-200"></div>
              <span className="text-sm text-gray-400">OR</span>
              <div className="flex-1 h-px bg-gray-200"></div>
            </div>

            <div className="flex justify-center">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleError}
                theme="outline"
                size="large"
                text="continue_with"
                shape="circle"
                logo_alignment="center"
              />
            </div>

            <div className="mt-6 text-center text-xs text-gray-400">
              By continuing, you agree to our Terms of Service and Privacy Policy.
              <br />
              🔒 Your data is encrypted and secure.
            </div>
          </div>

        </div>
      </div>
    </GoogleOAuthProvider>
  );
}

export default Login;
