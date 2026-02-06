import type { Project } from '../../backend';
import MetallicSurface from './MetallicSurface';
import ProjectCard from './ProjectCard';
import { Skeleton } from '@/components/ui/skeleton';

interface PortfolioSectionProps {
  projects: Project[];
  isLoading: boolean;
}

export default function PortfolioSection({ projects, isLoading }: PortfolioSectionProps) {
  return (
    <section id="portfolio" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-foreground mb-4">
          Our Portfolio
        </h2>
        <div className="h-1 w-24 bg-yellow-500 mx-auto mb-12" />

        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-64" />
            ))}
          </div>
        ) : projects.length === 0 ? (
          <MetallicSurface className="p-12 text-center max-w-2xl mx-auto">
            <p className="text-muted-foreground">
              No projects yet. Check back soon to see our latest work!
            </p>
          </MetallicSurface>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {projects.map((project) => (
              <ProjectCard key={project.id.toString()} project={project} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
