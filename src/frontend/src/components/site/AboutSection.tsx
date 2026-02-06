import type { WebsiteContent } from '../../backend';
import MetallicSurface from './MetallicSurface';
import { Building2, Award, Users } from 'lucide-react';

interface AboutSectionProps {
  content: WebsiteContent;
}

export default function AboutSection({ content }: AboutSectionProps) {
  return (
    <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-foreground mb-4">
            About Us
          </h2>
          <div className="h-1 w-24 bg-yellow-500 mx-auto mb-12" />

          <MetallicSurface className="p-8 md:p-12 mb-12">
            <p className="text-lg text-foreground/90 leading-relaxed mb-8">
              {content.companyDescription}
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center space-y-3">
                <div className="w-16 h-16 bg-yellow-500/10 rounded-full flex items-center justify-center mx-auto">
                  <Building2 className="w-8 h-8 text-yellow-500" />
                </div>
                <h3 className="font-bold text-foreground">Large Scale</h3>
                <p className="text-sm text-muted-foreground">Big project expertise</p>
              </div>
              <div className="text-center space-y-3">
                <div className="w-16 h-16 bg-yellow-500/10 rounded-full flex items-center justify-center mx-auto">
                  <Award className="w-8 h-8 text-yellow-500" />
                </div>
                <h3 className="font-bold text-foreground">Quality First</h3>
                <p className="text-sm text-muted-foreground">Reasonable rates</p>
              </div>
              <div className="text-center space-y-3">
                <div className="w-16 h-16 bg-yellow-500/10 rounded-full flex items-center justify-center mx-auto">
                  <Users className="w-8 h-8 text-yellow-500" />
                </div>
                <h3 className="font-bold text-foreground">Trusted</h3>
                <p className="text-sm text-muted-foreground">Premium clients</p>
              </div>
            </div>
          </MetallicSurface>
        </div>
      </div>
    </section>
  );
}
