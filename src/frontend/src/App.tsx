import { createRouter, createRoute, createRootRoute, RouterProvider, Outlet } from '@tanstack/react-router';
import PublicSite from './pages/PublicSite';
import Admin from './pages/Admin';
import SiteHeader from './components/site/SiteHeader';
import { Toaster } from '@/components/ui/sonner';

// Layout component that includes header
function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}

// Define routes
const rootRoute = createRootRoute({
  component: Layout,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: PublicSite,
});

const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin',
  component: Admin,
});

// Create router
const routeTree = rootRoute.addChildren([indexRoute, adminRoute]);
const router = createRouter({ routeTree });

export default function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  );
}
