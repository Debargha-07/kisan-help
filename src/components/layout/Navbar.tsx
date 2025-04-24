
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, User, Bell, LogOut, Home, ChevronDown } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";

// Navbar links config
const navigationLinks = [
  { title: "Home", href: "/" },
  { title: "Forecasting", href: "/forecasting" }
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const closeSheet = () => setIsOpen(false);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast({
        title: "Successfully logged out",
      });
      navigate('/');
    } catch (error: any) {
      toast({
        title: "Error during logout",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 dark:bg-background/95 shadow-md backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo and Brand */}
        <Link to="/" className="flex items-center gap-3 font-bold text-xl sm:text-2xl text-agri-primary hover:opacity-90 transition-opacity">
          <img src="/logo.svg" alt="Bhumiputra" className="h-8 w-8" />
          <span className="tracking-tight">Bhumiputra</span>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center space-x-8">
          {navigationLinks.map(link => (
            <Link
              key={link.title}
              to={link.href}
              className="relative text-[1.05rem] font-bold text-foreground/90 transition-colors hover:text-agri-primary px-3 py-1 rounded hover-scale"
            >
              {link.title}
            </Link>
          ))}
        </nav>

        {/* User Actions */}
        <div className="hidden md:flex items-center gap-2 ml-auto">
          {user ? (
            <>
              <Button variant="ghost" size="icon" aria-label="Notifications" className="hover:bg-accent">
                <Bell className="h-5 w-5 text-agri-primary" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                aria-label="User Account"
                onClick={() => navigate('/profile')}
                className="hover:bg-accent"
              >
                <User className="h-5 w-5 text-agri-primary" />
              </Button>
              <Button variant="default" className="bg-agri-primary hover:bg-agri-dark px-4 py-1" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </>
          ) : (
            <Button 
              variant="default" 
              className="bg-agri-primary hover:bg-agri-dark px-4 py-1"
              onClick={() => navigate('/auth')}
            >
              Login / Register
            </Button>
          )}
        </div>

        {/* Mobile Menu Button and Drawer */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden ml-auto">
            <Button variant="outline" size="icon" className="border-agri-primary shadow-sm">
              <Menu className="h-5 w-5 text-agri-primary" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[240px] sm:w-[300px] bg-white/95 dark:bg-background/90 shadow-md">
            <div className="flex flex-col gap-6 pt-5">
              <div className="flex items-center gap-2 text-xl font-bold text-agri-primary mb-2">
                <img src="/logo.svg" alt="Bhumiputra" className="h-7 w-7" />
                <span>Bhumiputra</span>
              </div>
              <nav className="flex flex-col gap-y-4 text-base font-medium">
                {navigationLinks.map(link => (
                  <Link
                    key={link.title}
                    to={link.href}
                    onClick={() => setIsOpen(false)}
                    className="px-2 py-1 rounded hover:bg-agri-light transition-colors text-foreground"
                  >
                    {link.title}
                  </Link>
                ))}
              </nav>
              <div className="flex flex-col gap-2 mt-4">
                {user ? (
                  <>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start"
                      onClick={() => { navigate('/profile'); closeSheet(); }}>
                      <User className="mr-2 h-5 w-5" /> Profile
                    </Button>
                    <Button 
                      variant="default" 
                      className="w-full bg-agri-primary hover:bg-agri-dark" 
                      onClick={() => {
                        handleLogout();
                        closeSheet();
                      }}>
                      <LogOut className="mr-2 h-5 w-5" /> Logout
                    </Button>
                  </>
                ) : (
                  <Button 
                    variant="default" 
                    className="w-full bg-agri-primary hover:bg-agri-dark"
                    onClick={() => {
                      navigate('/auth');
                      closeSheet();
                    }}>
                    Login / Register
                  </Button>
                )}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Navbar;
