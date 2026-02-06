import { ShieldAlert } from 'lucide-react';
import LoginButton from './LoginButton';
import MetallicSurface from '../site/MetallicSurface';

export default function AccessDenied() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <MetallicSurface className="max-w-md w-full p-8 text-center space-y-6">
        <div className="w-20 h-20 bg-destructive/10 rounded-full flex items-center justify-center mx-auto">
          <ShieldAlert className="w-10 h-10 text-destructive" />
        </div>
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-foreground">Access Denied</h1>
          <p className="text-muted-foreground">
            You don't have permission to access the admin area. Please contact the site owner if you
            believe this is an error.
          </p>
        </div>
        <LoginButton />
      </MetallicSurface>
    </div>
  );
}
