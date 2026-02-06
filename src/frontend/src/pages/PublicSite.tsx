import { useGetContent, useGetProjects } from '../hooks/useQueries';
import HeroSection from '../components/site/HeroSection';
import ServicesSection from '../components/site/ServicesSection';
import MaterialsSection from '../components/site/MaterialsSection';
import ClientsSection from '../components/site/ClientsSection';
import AboutSection from '../components/site/AboutSection';
import ContactSection from '../components/site/ContactSection';
import PortfolioSection from '../components/site/PortfolioSection';
import Footer from '../components/site/Footer';
import { Skeleton } from '@/components/ui/skeleton';

export default function PublicSite() {
  const { data: content, isLoading: contentLoading } = useGetContent();
  const { data: projects, isLoading: projectsLoading } = useGetProjects();

  if (contentLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-20 space-y-8">
          <Skeleton className="h-64 w-full" />
          <Skeleton className="h-48 w-full" />
          <Skeleton className="h-48 w-full" />
        </div>
      </div>
    );
  }

  if (!content) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Unable to load content</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <HeroSection content={content} />
      <AboutSection content={content} />
      <ServicesSection content={content} />
      <MaterialsSection content={content} />
      <PortfolioSection projects={projects || []} isLoading={projectsLoading} />
      <ClientsSection content={content} />
      <ContactSection content={content} />
      <Footer />
    </div>
  );
}
