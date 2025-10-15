import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { getPortalPath } from '@/services/authService';
import { AlertCircle, Shield, Zap, Settings } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const { user, login, isLoading } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLogging, setIsLogging] = useState(false);
  const [error, setError] = useState('');

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      const portalPath = getPortalPath(user.category);
      navigate(portalPath, { replace: true });
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLogging(true);

    const success = await login(username, password);
    
    if (success) {
      // Navigation will be handled by useEffect
    } else {
      setError('Invalid username or password');
    }
    
    setIsLogging(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-md">
        {/* Logo and Title */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="flex justify-center items-center space-x-2 sm:space-x-3 mb-3 sm:mb-4">
            <div className="h-10 w-10 sm:h-12 sm:w-12 bg-blue-600 rounded-lg flex items-center justify-center">
              <Shield className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Swift Portal</h1>
          </div>
          <p className="text-sm sm:text-base text-gray-600">Select your department to login</p>
        </div>

        {/* Department Cards */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer border-blue-200 active:scale-95 transition-transform">
            <CardContent className="p-3 sm:p-4 text-center">
              <Zap className="h-7 w-7 sm:h-8 sm:w-8 text-yellow-500 mx-auto mb-2" />
              <h3 className="font-semibold text-xs sm:text-sm">Electrical</h3>
              <p className="text-xs text-gray-500 mt-1">r2 / 12345</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer border-green-200 active:scale-95 transition-transform">
            <CardContent className="p-3 sm:p-4 text-center">
              <Shield className="h-7 w-7 sm:h-8 sm:w-8 text-green-500 mx-auto mb-2" />
              <h3 className="font-semibold text-xs sm:text-sm">Security</h3>
              <p className="text-xs text-gray-500 mt-1">r0 / 12345</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer border-purple-200 active:scale-95 transition-transform">
            <CardContent className="p-3 sm:p-4 text-center">
              <Settings className="h-7 w-7 sm:h-8 sm:w-8 text-purple-500 mx-auto mb-2" />
              <h3 className="font-semibold text-xs sm:text-sm">IT Service</h3>
              <p className="text-xs text-gray-500 mt-1">r1 / 12345</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer border-red-200 active:scale-95 transition-transform">
            <CardContent className="p-3 sm:p-4 text-center">
              <AlertCircle className="h-7 w-7 sm:h-8 sm:w-8 text-red-500 mx-auto mb-2" />
              <h3 className="font-semibold text-xs sm:text-sm">Admin</h3>
              <p className="text-xs text-gray-500 mt-1">r3 / 12345</p>
            </CardContent>
          </Card>
        </div>

        {/* Login Form */}
        <Card>
          <CardHeader className="pb-4 sm:pb-6">
            <CardTitle className="text-center text-base sm:text-lg">Login</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="username" className="text-sm">Username</Label>
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  required
                  className="mt-1 h-11"
                />
              </div>

              <div>
                <Label htmlFor="password" className="text-sm">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="mt-1 h-11"
                />
              </div>

              {error && (
                <div className="flex items-center space-x-2 text-red-600 text-sm bg-red-50 p-3 rounded-lg">
                  <AlertCircle className="h-4 w-4 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <Button
                type="submit"
                className="w-full h-11 text-base"
                disabled={isLogging || !username || !password}
              >
                {isLogging ? 'Logging in...' : 'Login'}
              </Button>
            </form>

            <div className="mt-4 sm:mt-6 text-center text-xs text-gray-500">
              <p>Use credentials shown in department cards above</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
