import { Cable, Mail, MapPin } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-card border-t py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* About */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Cable className="w-6 h-6 text-primary" />
              <h3 className="text-xl font-bold">SFU Gondola Project</h3>
            </div>
            <p className="text-muted-foreground">
              A student-led initiative to connect SFU Burnaby Mountain campus with sustainable, 
              accessible aerial transit.
            </p>
          </div>

          {/* Contact SFSS */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Contact SFSS</h3>
            <div className="space-y-2 text-muted-foreground">
              <div className="flex items-start gap-2">
                <MapPin className="w-5 h-5 mt-0.5 shrink-0 text-primary" />
                <span>Room 4120, Student Union Building (SUB)<br />8888 University Drive, Burnaby, BC</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-5 h-5 shrink-0 text-primary" />
                <a href="mailto:info@sfss.ca" className="hover:text-primary transition-colors">
                  info@sfss.ca
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Resources</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <a href="https://sfss.ca" target="_blank" rel="noopener
                 noreferrer" className="hover:text-primary transition-colors">
                  SFSS Website
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-primary transition-colors">
                  Project Information
                </a>
              </li>
              <li>
                <a href="#donate" className="hover:text-primary transition-colors">
                  Donation FAQ
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Simon Fraser Student Society. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};