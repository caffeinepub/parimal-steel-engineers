import type { WebsiteContent } from '../../backend';
import MetallicSurface from './MetallicSurface';

interface HeroSectionProps {
  content: WebsiteContent;
}

export default function HeroSection({ content }: HeroSectionProps) {
  return (
    <section id="hero" className="relative min-h-[600px] flex items-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/assets/generated/pse-hero-bg.dim_1920x800.png)' }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-background" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <MetallicSurface className="max-w-4xl mx-auto text-center p-8 md:p-12">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
            {content.heroHeadline}
          </h1>
          <p className="text-xl md:text-2xl text-yellow-500 mb-8 font-medium">
            {content.heroSubheadline}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 bg-yellow-500 text-black font-bold rounded-lg hover:bg-yellow-400 transition-all transform hover:scale-105 shadow-lg shadow-yellow-500/20"
            >
              Get a Quote
            </button>
            <button
              onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 bg-transparent border-2 border-yellow-500 text-yellow-500 font-bold rounded-lg hover:bg-yellow-500/10 transition-all"
            >
              Our Services
            </button>
          </div>
        </MetallicSurface>
      </div>
    </section>
  );
}
