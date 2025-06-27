import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthContext";
import { useSearch } from "@/context/SearchContext";
import { useTheme } from "@/context/ThemeContext";
import NotificationBell from "@/components/common/NotificationBell";
import ProfileDropdown from "@/components/common/ProfileDropdown";
import ThemeToggle from "@/components/common/ThemeToggle";

const Header = ({ onMenuClick }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const { user } = useAuth();
  const { performAdvancedSearch } = useSearch();
  const { theme } = useTheme();
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      try {
        await performAdvancedSearch(searchQuery.trim());
        navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      } catch (error) {
        console.error("Search failed:", error);
      }
    }
  };

  return (
    <header className="sticky top-0 z-60 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm dark:shadow-lg">
      {/* Mobile Header - Full Width */}
      <div className="lg:hidden flex items-center justify-between px-2 py-2 w-full">
        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full h-10 w-10 hover:bg-muted"
          onClick={onMenuClick}
          aria-label="Open menu"
        >
          <Menu className="h-6 w-6 text-muted-foreground" />
        </Button>

        {/* Logo - Hide "SL" on mobile, show only text */}
        <Link
          to="/dashboard"
          className="flex items-start space-x-2 group text-center flex-grow"
        >
          {/* <span className="hidden lg:block w-10 h-10 bg-gradient-to-br from-primary via-primary/90 to-secondary rounded-3xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
            <span className="text-[#191961] font-bold text-base">SL</span>
          </span> */}
          <span className="font-bold text-xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-[#191961] flex-grow text-start">
            SkillLink
          </span>
        </Link>

        {/* Mobile Right Icons - Hide ThemeToggle on mobile */}
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            className="hidden lg:block rounded-full h-10 w-10 hover:bg-muted"
            aria-label="Search"
          >
            <Search className="hidden lg:block h-6 w-6 text-muted-foreground" />
          </Button>
          <NotificationBell />
          {/* <ThemeToggle className="hidden lg:block" /> */}
          <ProfileDropdown />
        </div>
      </div>

      {/* Desktop Header - Gmail-like Layout */}
      <div className="hidden lg:flex items-center justify-between px-4 py-2 w-full">
        {/* Left Section: Logo and App Menu */}
        <div className="flex items-center space-x-4">
          <Link to="/dashboard" className="flex items-center space-x-3 group">
            <div className="w-12 h-12 bg-gradient-to-br from-primary via-primary/90 to-secondary rounded-3xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
              <span className="text-[#191961] font-bold text-lg">SL</span>
            </div>
            <span className="font-bold text-2xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-[#191961]">
              SkillLink
            </span>
          </Link>
          {/* Placeholder for Gmail-like App Menu (e.g., Grid Icon) - Add if needed */}
          {/* <Button variant="ghost" size="icon" className="hover:bg-muted">
            <Grid className="h-6 w-6 text-muted-foreground" />
          </Button> */}
        </div>

        {/* Center Section: Search Bar */}
        <div className="flex-1 max-w-2xl mx-4">
          <form onSubmit={handleSearch} className="w-full">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input
                placeholder="Search courses, skills, people, jobs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 h-10 rounded-full border-2 border-muted focus:border-primary transition-all duration-300 bg-muted/30 hover:bg-muted/50 focus:bg-background w-full shadow-sm focus:shadow-md"
              />
            </div>
          </form>
        </div>

        {/* Right Section: Icons and Profile */}
        <div className="flex items-end space-x-4">
          <NotificationBell />
          <ThemeToggle />
          <ProfileDropdown />
        </div>
      </div>
    </header>
  );
};

export default Header;
