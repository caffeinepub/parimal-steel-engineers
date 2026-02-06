import { SiCaffeine } from 'react-icons/si';
import { Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-card border-t border-border py-8">
      <div className="container mx-auto px-4">
        <div className="text-center text-sm text-muted-foreground">
          <p className="flex items-center justify-center gap-2 flex-wrap">
            © 2026. Built with{' '}
            <Heart className="w-4 h-4 text-yellow-500 fill-yellow-500" /> using{' '}
            <a
              href="https://caffeine.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-yellow-500 hover:text-yellow-400 transition-colors inline-flex items-center gap-1"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
