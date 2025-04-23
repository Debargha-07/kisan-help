
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const navigationLinks = [
    { title: "Home", href: "/" },
    { title: "Forecasting", href: "/forecasting" }
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-2 text-xl font-bold text-agri-primary"
        >
          <img src="/logo.svg" alt="Logo" className="h-8 w-auto" />
          <span>AgriForecast</span>
        </Link>

        <nav className="hidden md:flex items-center gap-x-6 text-sm">
          {navigationLinks.map((link) => (
            <Link
              key={link.title}
              to={link.href}
              className="text-foreground transition-colors hover:text-agri-primary"
            >
              {link.title}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link to="/auth">
            <Button variant="ghost" size="sm">
              Sign In
            </Button>
          </Link>
          <Sheet open={isMobileNavOpen} onOpenChange={setIsMobileNavOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button size="icon" variant="outline">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[240px] sm:w-[300px]">
              <div className="flex flex-col gap-4 pt-6">
                <nav className="flex flex-col gap-y-4 text-base">
                  {navigationLinks.map((link) => (
                    <Link
                      key={link.title}
                      to={link.href}
                      onClick={() => setIsMobileNavOpen(false)}
                      className="hover:text-agri-primary"
                    >
                      {link.title}
                    </Link>
                  ))}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
