import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

export default function SiteHeader() {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  const navItems = [
    { label: 'Home', id: 'hero' },
    { label: 'About', id: 'about' },
    { label: 'Services', id: 'services' },
    { label: 'Materials', id: 'materials' },
    { label: 'Portfolio', id: 'portfolio' },
    { label: 'Clients', id: 'clients' },
    { label: 'Contact', id: 'contact' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => {
              navigate({ to: '/' });
              scrollToSection('hero');
            }}
            className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
          >
            <img
              src="/assets/generated/pse-logo.dim_512x512.png"
              alt="Parimal Steel Engineers"
              className="h-10 w-10 object-contain"
            />
            <div className="hidden sm:block">
              <div className="text-lg font-bold text-foreground leading-tight">
                Parimal Steel Engineers
              </div>
              <div className="text-xs text-yellow-500">Quality Fabrication</div>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Button
                key={item.id}
                variant="ghost"
                onClick={() => scrollToSection(item.id)}
                className="text-foreground hover:text-yellow-500 hover:bg-accent"
              >
                {item.label}
              </Button>
            ))}
            <Button
              variant="outline"
              onClick={() => navigate({ to: '/admin' })}
              className="ml-4 border-yellow-500/50 text-yellow-500 hover:bg-yellow-500/10"
            >
              Admin
            </Button>
          </nav>

          {/* Mobile Menu */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64">
              <nav className="flex flex-col space-y-4 mt-8">
                {navItems.map((item) => (
                  <Button
                    key={item.id}
                    variant="ghost"
                    onClick={() => scrollToSection(item.id)}
                    className="justify-start text-foreground hover:text-yellow-500"
                  >
                    {item.label}
                  </Button>
                ))}
                <Button
                  variant="outline"
                  onClick={() => {
                    navigate({ to: '/admin' });
                    setMobileMenuOpen(false);
                  }}
                  className="justify-start border-yellow-500/50 text-yellow-500 hover:bg-yellow-500/10"
                >
                  Admin
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
