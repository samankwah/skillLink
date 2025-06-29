import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  User,
  Calendar,
  Settings,
  Globe,
  LogOut,
  ChevronRight,
  Moon,
  Sun,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";

const ProfileDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };

  const menuItems = [
    {
      icon: User,
      label: "Profile",
      href: "/app/profile",
      onClick: () => setIsOpen(false),
    },
    {
      icon: Calendar,
      label: "Calendar",
      href: "/app/calendar",
      onClick: () => setIsOpen(false),
    },
    {
      icon: Settings,
      label: "Preferences",
      href: "/app/settings",
      onClick: () => setIsOpen(false),
    },
    {
      icon: theme === "dark" ? Sun : Moon,
      label: theme === "dark" ? "Light Mode" : "Dark Mode",
      onClick: () => {
        toggleTheme();
        setIsOpen(false);
      },
    },
    {
      icon: Globe,
      label: "Language",
      hasSubmenu: true,
      onClick: (e) => {
        e.preventDefault();
        // Language submenu logic can be added here
      },
    },
    {
      icon: LogOut,
      label: "Log out",
      onClick: handleLogout,
      isDanger: true,
    },
  ];

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Profile Avatar Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 lg:space-x-3 p-2 rounded-lg hover:bg-muted/50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary/10"
      >
        <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center shadow-md ring-2 ring-white dark:ring-gray-500">
          <User className="h-4 w-4 lg:h-5 lg:w-5 text-[#191961]" />
        </div>
        <div className="hidden lg:block text-left">
          <p className="text-sm font-semibold text-foreground">
            {user?.firstName} {user?.lastName}
          </p>
          <p className="text-xs text-muted-foreground">{user?.title}</p>
        </div>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-64 bg-gray-200 border border-border rounded-lg shadow-lg z-50 overflow-hidden-x profile-dropdown">
          {/* User Info Header */}
          <div className="px-4 py-3 border-b border-border bg-muted/30">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center shadow-md">
                <User className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="font-semibold text-foreground">
                  {user?.firstName} {user?.lastName}
                </p>
                <p className="text-sm text-muted-foreground">{user?.email}</p>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="py-2">
            {menuItems.map((item, index) => {
              const Icon = item.icon;

              if (item.href) {
                return (
                  <Link
                    key={index}
                    to={item.href}
                    onClick={item.onClick}
                    className={`flex items-center justify-between px-4 py-3 hover:bg-muted/50 transition-colors duration-200 ${
                      item.isDanger
                        ? "text-destructive hover:text-destructive"
                        : "text-foreground"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Icon className="h-4 w-4" />
                      <span className="text-sm font-medium">{item.label}</span>
                    </div>
                    {item.hasSubmenu && <ChevronRight className="h-4 w-4" />}
                  </Link>
                );
              }

              return (
                <button
                  key={index}
                  onClick={item.onClick}
                  className={`w-full flex items-center justify-between px-4 py-3 hover:bg-muted/50 transition-colors duration-200 ${
                    item.isDanger
                      ? "text-destructive hover:text-destructive"
                      : "text-foreground"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className="h-4 w-4" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </div>
                  {item.hasSubmenu && <ChevronRight className="h-4 w-4" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
