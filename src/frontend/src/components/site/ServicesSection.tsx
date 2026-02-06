import type { WebsiteContent } from '../../backend';
import MetallicSurface from './MetallicSurface';
import { Wrench } from 'lucide-react';

interface ServicesSectionProps {
  content: WebsiteContent;
}

export default function ServicesSection({ content }: ServicesSectionProps) {
  return (
    <section id="services" className="py-20 bg-accent/5">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-foreground mb-4">
          Our Services
        </h2>
        <div className="h-1 w-24 bg-yellow-500 mx-auto mb-12" />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {content.services.map((service, index) => (
            <MetallicSurface key={index} className="p-6 hover:scale-105 transition-transform">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-yellow-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Wrench className="w-6 h-6 text-yellow-500" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-2">{service.name}</h3>
                  <p className="text-sm text-muted-foreground">{service.description}</p>
                </div>
              </div>
            </MetallicSurface>
          ))}
        </div>
      </div>
    </section>
  );
}
