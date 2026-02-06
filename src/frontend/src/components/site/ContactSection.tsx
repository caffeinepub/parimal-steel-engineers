import type { WebsiteContent } from '../../backend';
import MetallicSurface from './MetallicSurface';
import { MapPin, Mail, Phone, User } from 'lucide-react';

interface ContactSectionProps {
  content: WebsiteContent;
}

export default function ContactSection({ content }: ContactSectionProps) {
  return (
    <section id="contact" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-foreground mb-4">
            Contact Us
          </h2>
          <div className="h-1 w-24 bg-yellow-500 mx-auto mb-12" />

          <MetallicSurface className="p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-yellow-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-yellow-500" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground mb-1">Location</h3>
                    <p className="text-muted-foreground">{content.contact.address}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-yellow-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <User className="w-6 h-6 text-yellow-500" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground mb-1">Owner</h3>
                    <p className="text-muted-foreground">Hiten Parimal Makwana</p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-yellow-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-yellow-500" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground mb-1">Phone</h3>
                    <p className="text-muted-foreground">{content.contact.phone}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-yellow-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-yellow-500" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground mb-1">Email</h3>
                    <p className="text-muted-foreground">{content.contact.email}</p>
                  </div>
                </div>
              </div>
            </div>
          </MetallicSurface>
        </div>
      </div>
    </section>
  );
}
