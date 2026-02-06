import type { WebsiteContent } from '../../backend';
import MetallicSurface from './MetallicSurface';
import { Building } from 'lucide-react';

interface ClientsSectionProps {
  content: WebsiteContent;
}

export default function ClientsSection({ content }: ClientsSectionProps) {
  return (
    <section id="clients" className="py-20 bg-accent/5">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-foreground mb-4">
          Our Clients
        </h2>
        <div className="h-1 w-24 bg-yellow-500 mx-auto mb-12" />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {content.clients.map((client, index) => (
            <MetallicSurface key={index} className="p-6 text-center hover:scale-105 transition-transform">
              <div className="w-16 h-16 bg-yellow-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Building className="w-8 h-8 text-yellow-500" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">{client.name}</h3>
              {client.description && (
                <p className="text-sm text-muted-foreground">{client.description}</p>
              )}
            </MetallicSurface>
          ))}
        </div>
      </div>
    </section>
  );
}
