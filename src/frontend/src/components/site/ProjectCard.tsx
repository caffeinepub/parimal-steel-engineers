import { useState } from 'react';
import type { Project } from '../../backend';
import MetallicSurface from './MetallicSurface';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Image as ImageIcon } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const hasImages = project.images && project.images.length > 0;
  const firstImage = hasImages ? project.images[0] : null;

  return (
    <>
      <MetallicSurface
        className="overflow-hidden hover:scale-105 transition-transform cursor-pointer"
        onClick={() => setDialogOpen(true)}
      >
        {/* Image or Placeholder */}
        <div className="h-48 bg-accent/20 flex items-center justify-center overflow-hidden">
          {firstImage ? (
            <img
              src={firstImage.getDirectURL()}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex flex-col items-center justify-center text-muted-foreground">
              <ImageIcon className="w-12 h-12 mb-2" />
              <span className="text-sm">No image</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="text-xl font-bold text-foreground mb-2">{project.title}</h3>
          <p className="text-sm text-muted-foreground line-clamp-3">{project.description}</p>
        </div>
      </MetallicSurface>

      {/* Detail Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">{project.title}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {hasImages && (
              <div className="grid grid-cols-1 gap-4">
                {project.images.map((image, idx) => (
                  <img
                    key={idx}
                    src={image.getDirectURL()}
                    alt={`${project.title} - ${idx + 1}`}
                    className="w-full rounded-lg"
                  />
                ))}
              </div>
            )}
            <p className="text-foreground/90 leading-relaxed">{project.description}</p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
