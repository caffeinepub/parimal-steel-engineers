import type { WebsiteContent } from '../../backend';
import MetallicSurface from './MetallicSurface';
import { Layers } from 'lucide-react';

interface MaterialsSectionProps {
  content: WebsiteContent;
}

export default function MaterialsSection({ content }: MaterialsSectionProps) {
  return (
    <section id="materials" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-foreground mb-4">
            Materials We Work With
          </h2>
          <div className="h-1 w-24 bg-yellow-500 mx-auto mb-12" />

          <MetallicSurface className="p-8 md:p-12">
            <div className="flex items-start space-x-6">
              <div className="w-16 h-16 bg-yellow-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Layers className="w-8 h-8 text-yellow-500" />
              </div>
              <div>
                <p className="text-lg text-foreground/90 leading-relaxed">
                  {content.materials}
                </p>
              </div>
            </div>
          </MetallicSurface>
        </div>
      </div>
    </section>
  );
}
