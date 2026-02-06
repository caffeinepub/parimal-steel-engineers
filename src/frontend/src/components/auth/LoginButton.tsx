import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import { useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { LogIn, LogOut, Loader2 } from 'lucide-react';

export default function LoginButton() {
  const { login, clear, loginStatus, identity } = useInternetIdentity();
  const queryClient = useQueryClient();

  const isAuthenticated = !!identity;
  const isLoading = loginStatus === 'logging-in';

  const handleAuth = async () => {
    if (isAuthenticated) {
      await clear();
      queryClient.clear();
    } else {
      try {
        await login();
      } catch (error: any) {
        console.error('Login error:', error);
        if (error.message === 'User is already authenticated') {
          await clear();
          setTimeout(() => login(), 300);
        }
      }
    }
  };

  return (
    <Button
      onClick={handleAuth}
      disabled={isLoading}
      variant={isAuthenticated ? 'outline' : 'default'}
      className={
        isAuthenticated
          ? 'border-yellow-500/50 text-yellow-500 hover:bg-yellow-500/10'
          : 'bg-yellow-500 text-black hover:bg-yellow-400'
      }
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Signing in...
        </>
      ) : isAuthenticated ? (
        <>
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out
        </>
      ) : (
        <>
          <LogIn className="mr-2 h-4 w-4" />
          Sign In
        </>
      )}
    </Button>
  );
}
