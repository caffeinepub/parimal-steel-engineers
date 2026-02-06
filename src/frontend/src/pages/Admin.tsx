import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useIsCallerAdmin, useGetCallerUserProfile } from '../hooks/useQueries';
import LoginButton from '../components/auth/LoginButton';
import AccessDenied from '../components/auth/AccessDenied';
import ProfileSetupModal from '../components/auth/ProfileSetupModal';
import ContentEditor from '../components/admin/ContentEditor';
import ProjectsEditor from '../components/admin/ProjectsEditor';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';

export default function Admin() {
  const { identity } = useInternetIdentity();
  const { data: isAdmin, isLoading: adminLoading } = useIsCallerAdmin();
  const { data: userProfile, isLoading: profileLoading, isFetched } = useGetCallerUserProfile();

  const isAuthenticated = !!identity;
  const showProfileSetup = isAuthenticated && !profileLoading && isFetched && userProfile === null;

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="max-w-md w-full space-y-8 text-center">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold text-foreground">Admin Access</h1>
            <p className="text-muted-foreground">Sign in to manage website content</p>
          </div>
          <LoginButton />
        </div>
      </div>
    );
  }

  if (showProfileSetup) {
    return <ProfileSetupModal />;
  }

  if (adminLoading || profileLoading) {
    return (
      <div className="min-h-screen bg-background p-8">
        <div className="container mx-auto space-y-8">
          <Skeleton className="h-12 w-64" />
          <Skeleton className="h-96 w-full" />
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return <AccessDenied />;
  }

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="container mx-auto max-w-6xl space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage your website content</p>
          </div>
          <LoginButton />
        </div>

        <Tabs defaultValue="content" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="content">Website Content</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
          </TabsList>
          <TabsContent value="content" className="mt-8">
            <ContentEditor />
          </TabsContent>
          <TabsContent value="projects" className="mt-8">
            <ProjectsEditor />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
