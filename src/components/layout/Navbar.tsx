
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, User, Bell } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const closeSheet = () => setIsOpen(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="flex items-center gap-2 font-bold text-2xl text-agri-primary">
          <img src="/logo.svg" alt="Kisan Connect" className="h-8 w-8" />
          <span>Kisan Connect</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex mx-6 items-center space-x-4 lg:space-x-6 flex-1">
          <Link to="/" className="text-sm font-medium transition-colors hover:text-agri-accent">
            Home
          </Link>
          <Link to="/marketplace" className="text-sm font-medium transition-colors hover:text-agri-accent">
            Marketplace
          </Link>
          <Link to="/forecasting" className="text-sm font-medium transition-colors hover:text-agri-accent">
            Forecasting
          </Link>
          <Link to="/facilities" className="text-sm font-medium transition-colors hover:text-agri-accent">
            Processing Facilities
          </Link>
          <Link to="/quality" className="text-sm font-medium transition-colors hover:text-agri-accent">
            Quality Assessment
          </Link>
          <Link to="/prices" className="text-sm font-medium transition-colors hover:text-agri-accent">
            Price Trends
          </Link>
        </nav>

        <div className="hidden md:flex items-center gap-4 ml-auto">
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <User className="h-5 w-5" />
          </Button>
          <Button variant="default" className="bg-agri-primary hover:bg-agri-dark">
            Login / Register
          </Button>
        </div>

        {/* Mobile Navigation */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden ml-auto">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="bg-agri-light">
            <div className="flex flex-col gap-8 py-6">
              <div className="flex items-center gap-2 font-bold text-xl text-agri-primary">
                <img src="/logo.svg" alt="Kisan Connect" className="h-6 w-6" />
                <span>Kisan Connect</span>
              </div>
              <nav className="flex flex-col gap-4">
                <Link to="/" className="text-base font-medium" onClick={closeSheet}>
                  Home
                </Link>
                <Link to="/marketplace" className="text-base font-medium" onClick={closeSheet}>
                  Marketplace
                </Link>
                <Link to="/forecasting" className="text-base font-medium" onClick={closeSheet}>
                  Forecasting
                </Link>
                <Link to="/facilities" className="text-base font-medium" onClick={closeSheet}>
                  Processing Facilities
                </Link>
                <Link to="/quality" className="text-base font-medium" onClick={closeSheet}>
                  Quality Assessment
                </Link>
                <Link to="/prices" className="text-base font-medium" onClick={closeSheet}>
                  Price Trends
                </Link>
              </nav>
              <div className="flex flex-col gap-2">
                <Button variant="outline" className="w-full justify-start">
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </Button>
                <Button variant="default" className="w-full bg-agri-primary hover:bg-agri-dark">
                  Login / Register
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Navbar;
