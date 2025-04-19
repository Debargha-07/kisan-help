
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, User, Bell, LogOut } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const closeSheet = () => setIsOpen(false);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast({
        title: "সফলভাবে লগআউট করা হয়েছে",
      });
      navigate('/');
    } catch (error: any) {
      toast({
        title: "লগআউট করার সময় ত্রুটি",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl sm:text-2xl text-agri-primary">
          <img src="/logo.svg" alt="কিষাণ কানেক্ট" className="h-8 w-8" />
          <span>কিষাণ কানেক্ট</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex mx-6 items-center space-x-4 lg:space-x-6 flex-1">
          <Link to="/" className="text-sm font-medium transition-colors hover:text-agri-accent">
            হোম
          </Link>
          <Link to="/marketplace" className="text-sm font-medium transition-colors hover:text-agri-accent">
            মন্ডি
          </Link>
          <Link to="/forecasting" className="text-sm font-medium transition-colors hover:text-agri-accent">
            আবহাওয়া
          </Link>
          <Link to="/facilities" className="text-sm font-medium transition-colors hover:text-agri-accent">
            সুবিধা
          </Link>
          <Link to="/schemes" className="text-sm font-medium transition-colors hover:text-agri-accent">
            প্রকল্প
          </Link>
          <Link to="/prices" className="text-sm font-medium transition-colors hover:text-agri-accent">
            দাম
          </Link>
        </nav>

        <div className="hidden md:flex items-center gap-4 ml-auto">
          {user ? (
            <>
              <Button variant="ghost" size="icon" aria-label="বিজ্ঞপ্তি">
                <Bell className="h-5 w-5" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                aria-label="ব্যবহারকারী অ্যাকাউন্ট"
                onClick={() => navigate('/profile')}
              >
                <User className="h-5 w-5" />
              </Button>
              <Button variant="default" className="bg-agri-primary hover:bg-agri-dark" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                লগআউট
              </Button>
            </>
          ) : (
            <Button 
              variant="default" 
              className="bg-agri-primary hover:bg-agri-dark"
              onClick={() => navigate('/auth')}
            >
              লগইন / রেজিস্টার
            </Button>
          )}
        </div>

        {/* Mobile Navigation */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden ml-auto">
            <Button variant="ghost" size="icon" aria-label="মেনু">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="bg-agri-light border-agri-primary">
            <div className="flex flex-col gap-8 py-6">
              <div className="flex items-center gap-2 font-bold text-xl text-agri-primary">
                <img src="/logo.svg" alt="কিষাণ কানেক্ট" className="h-6 w-6" />
                <span>কিষাণ কানেক্ট</span>
              </div>
              <nav className="flex flex-col gap-4">
                <Link to="/" className="text-base font-medium" onClick={closeSheet}>
                  হোম
                </Link>
                <Link to="/marketplace" className="text-base font-medium" onClick={closeSheet}>
                  মন্ডি
                </Link>
                <Link to="/forecasting" className="text-base font-medium" onClick={closeSheet}>
                  আবহাওয়া
                </Link>
                <Link to="/facilities" className="text-base font-medium" onClick={closeSheet}>
                  প্রসেসিং
                </Link>
                <Link to="/schemes" className="text-base font-medium" onClick={closeSheet}>
                  প্রকল্প
                </Link>
                <Link to="/prices" className="text-base font-medium" onClick={closeSheet}>
                  দাম
                </Link>
              </nav>
              <div className="flex flex-col gap-2">
                {user ? (
                  <>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start" 
                      onClick={() => {
                        navigate('/profile');
                        closeSheet();
                      }}
                    >
                      <User className="mr-2 h-4 w-4" />
                      প্রোফাইল
                    </Button>
                    <Button 
                      variant="default" 
                      className="w-full bg-agri-primary hover:bg-agri-dark" 
                      onClick={() => {
                        handleLogout();
                        closeSheet();
                      }}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      লগআউট
                    </Button>
                  </>
                ) : (
                  <Button 
                    variant="default" 
                    className="w-full bg-agri-primary hover:bg-agri-dark" 
                    onClick={() => {
                      navigate('/auth');
                      closeSheet();
                    }}
                  >
                    লগইন / রেজিস্টার
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
