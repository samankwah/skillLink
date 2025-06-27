// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { Search, Menu } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { useAuth } from "@/context/AuthContext";
// import { useSearch } from "@/context/SearchContext";
// import { useTheme } from "@/context/ThemeContext";
// import NotificationBell from "@/components/common/NotificationBell";
// import ProfileDropdown from "@/components/common/ProfileDropdown";
// import ThemeToggle from "@/components/common/ThemeToggle";

// const Header = ({ onMenuClick }) => {
//   const [searchQuery, setSearchQuery] = useState("");
//   const { user } = useAuth();
//   const { performAdvancedSearch } = useSearch();
//   const { theme } = useTheme();
//   const navigate = useNavigate();

//   const handleSearch = async (e) => {
//     e.preventDefault();
//     if (searchQuery.trim()) {
//       try {
//         await performAdvancedSearch(searchQuery.trim());
//         navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
//       } catch (error) {
//         console.error("Search failed:", error);
//       }
//     }
//   };

//   return (
//     <header className="sticky top-0 z-[999] w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm dark:shadow-lg">
//       <div className="container flex h-16 lg:h-20 items-center justify-between px-4 lg:px-8">
//         {/* Mobile Menu Button */}
//         <Button
//           variant="ghost"
//           size="icon"
//           className="lg:hidden rounded-full h-10 w-10 hover:bg-muted mr-2"
//           onClick={onMenuClick}
//         >
//           <Menu className="h-5 w-5 text-muted-foreground" />
//         </Button>

//         {/* Logo */}
//         <Link
//           to="/dashboard"
//           className="flex items-center space-x-2 lg:space-x-3 group"
//         >
//           <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-primary via-primary/90 to-secondary rounded-3xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
//             <span className="text-[#191961] font-bold text-base lg:text-lg">
//               SL
//             </span>
//           </div>
//           <span className="font-bold text-xl lg:text-2xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent hidden sm:block">
//             SkillLink
//           </span>
//         </Link>

//         {/* Search Bar - Hidden on mobile, shown on tablet+ */}
//         <div className="hidden md:flex flex-1 max-w-lg mx-4 lg:mx-8">
//           <form onSubmit={handleSearch} className="w-full">
//             <div className="relative">
//               <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
//               <Input
//                 placeholder="Search skills, people, jobs..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="pl-12 h-10 lg:h-12 rounded-3xl border-2 border-muted focus:border-primary transition-all duration-300 bg-muted/30 hover:bg-muted/50 focus:bg-background w-full shadow-sm focus:shadow-md"
//               />
//             </div>
//           </form>
//         </div>

//         {/* Right side */}
//         <div className="flex items-center space-x-2 lg:space-x-4">
//           {/* Search button for mobile */}
//           <Button
//             variant="ghost"
//             size="icon"
//             className="md:hidden rounded-full h-10 w-10 hover:bg-muted"
//           >
//             <Search className="h-5 w-5 text-muted-foreground" />
//           </Button>

//           {/* Notifications */}
//           <div className="hidden sm:block">
//             <NotificationBell />
//           </div>

//           {/* Theme Toggle */}
//           <div className="hidden sm:block">
//             <ThemeToggle />
//           </div>

//           {/* Profile Dropdown */}
//           <ProfileDropdown />
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;

// import { useState, useEffect, useRef } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { Search, Menu } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { useSearch } from "@/context/SearchContext";
// import NotificationBell from "@/components/common/NotificationBell";
// import ProfileDropdown from "@/components/common/ProfileDropdown";
// import ThemeToggle from "@/components/common/ThemeToggle";

// const Header = ({ onMenuClick }) => {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [showMobileSearch, setShowMobileSearch] = useState(false);

//   const { performAdvancedSearch } = useSearch();
//   const navigate = useNavigate();
//   const mobileSearchRef = useRef(null);

//   const handleSearch = async (e) => {
//     e.preventDefault();
//     if (searchQuery.trim()) {
//       try {
//         await performAdvancedSearch(searchQuery.trim());
//         navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
//         setShowMobileSearch(false);
//       } catch (error) {
//         console.error("Search failed:", error);
//       }
//     }
//   };

//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (
//         showMobileSearch &&
//         mobileSearchRef.current &&
//         !mobileSearchRef.current.contains(e.target)
//       ) {
//         setShowMobileSearch(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, [showMobileSearch]);

//   return (
//     <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm dark:shadow-lg">
//       <div className="container flex h-16 lg:h-20 items-center px-4 lg:px-8 relative">
//         {/* Left side - Mobile Menu + Logo */}
//         <div className="flex items-center">
//           {/* Mobile Menu Button */}
//           <Button
//             variant="ghost"
//             size="icon"
//             className="lg:hidden rounded-full h-10 w-10 hover:bg-muted mr-2"
//             onClick={onMenuClick}
//           >
//             <Menu className="h-5 w-5 text-muted-foreground" />
//           </Button>

//           {/* Logo */}
//           <Link
//             to="/dashboard"
//             className="flex items-center space-x-2 lg:space-x-3 group"
//           >
//             <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-primary via-primary/90 to-secondary rounded-3xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
//               <span className="text-[#191961] font-bold text-base lg:text-lg">
//                 SL
//               </span>
//             </div>
//             <span className="font-bold text-xl lg:text-2xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-[#191961] hidden sm:block">
//               SkillLink
//             </span>
//           </Link>
//         </div>

//         {/* Center - Search Bar (Desktop/Tablet Only) */}
//         <div className="hidden md:flex flex-1 max-w-lg mx-4 lg:mx-8 justify-center">
//           <form onSubmit={handleSearch} className="w-full max-w-md">
//             <div className="relative">
//               <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
//               <Input
//                 placeholder="Search courses, skills, people, jobs..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="pl-12 h-10 lg:h-12 rounded-3xl border-2 border-muted focus:border-primary transition-all duration-300 bg-muted/30 hover:bg-muted/50 focus:bg-background w-full shadow-sm focus:shadow-md"
//               />
//             </div>
//           </form>
//         </div>

//         {/* Right side controls - pushed to far right */}
//         <div className="flex items-center space-x-2 lg:space-x-4 ml-auto">
//           {/* Mobile Search Toggle */}
//           {showMobileSearch ? (
//             <form
//               ref={mobileSearchRef}
//               onSubmit={handleSearch}
//               className="absolute top-full mt-2 left-4 right-4 md:hidden z-50"
//             >
//               <Input
//                 placeholder="Search..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="h-10 pl-10 pr-4 rounded-full border-muted focus:border-primary bg-muted/20 backdrop-blur"
//                 autoFocus
//               />
//             </form>
//           ) : (
//             <Button
//               variant="ghost"
//               size="icon"
//               className="md:hidden rounded-full h-10 w-10 hover:bg-muted"
//               onClick={() => setShowMobileSearch(true)}
//             >
//               <Search className="h-5 w-5 text-muted-foreground" />
//             </Button>
//           )}

//           {/* Notifications */}
//           <div className="relative z-50 hidden sm:block">
//             <NotificationBell />
//           </div>

//           {/* Theme Toggle */}
//           <div className="relative z-50 hidden sm:block">
//             <ThemeToggle />
//           </div>

//           {/* Profile Dropdown */}
//           <div className="relative z-50">
//             <ProfileDropdown />
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;

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
    <header className="sticky top-0 z-[999] w-screen border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm dark:shadow-lg">
      {/* Mobile Header - Full Width */}
      <div className="lg:hidden flex items-center justify-between px-0 py-2 w-screen">
        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full h-10 w-10 hover:bg-muted ml-2"
          onClick={onMenuClick}
          aria-label="Open menu"
        >
          <Menu className="h-6 w-6 text-muted-foreground" />
        </Button>

        {/* Logo - Hide "SL" on mobile, show only text */}
        <Link
          to="/dashboard"
          className="flex items-center space-x-2 group text-center flex-grow"
        >
          <span className="hidden lg:block w-10 h-10 bg-gradient-to-br from-primary via-primary/90 to-secondary rounded-3xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
            <span className="text-[#191961] font-bold text-base">SL</span>
          </span>
          <span className="font-bold text-xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent flex-grow text-center">
            SkillLink
          </span>
        </Link>

        {/* Mobile Right Icons - Hide ThemeToggle on mobile */}
        <div className="flex items-center space-x-2 mr-2">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full h-10 w-10 hover:bg-muted"
            aria-label="Search"
          >
            <Search className="h-6 w-6 text-muted-foreground" />
          </Button>
          <NotificationBell />
          <ThemeToggle className="hidden lg:block" />
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
            <span className="font-bold text-2xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
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
                placeholder="Search skills, people, jobs..."
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
