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
import { CalendarProvider } from "@/context/CalendarContext";
import OutlookCalendar from "@/components/ui/OutlookCalendar";
import ErrorBoundary from "@/components/ui/ErrorBoundary";
import Portal from "@/components/ui/Portal";

const ProfileDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
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

  // Prevent body scroll when calendar is open
  useEffect(() => {
    if (showCalendar) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showCalendar]);

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
      onClick: () => setShowCalendar(!showCalendar),
      hasSubmenu: true,
    },
    // {
    //   icon: Settings,
    //   label: "Preferences",
    //   href: "/app/settings",
    //   onClick: () => setIsOpen(false),
    // },
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
        <div className="absolute right-0 top-full mt-2 w-64 bg-gray-300 border-border rounded-lg shadow-lg z-[100] overflow-hidden profile-dropdown">
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

      {/* Calendar Dropdown */}
      {showCalendar && (
        <Portal>
          <style>
            {`
              .calendar-modal-overlay {
                z-index: 2147483647 !important;
                position: fixed !important;
                top: 0 !important;
                left: 0 !important;
                right: 0 !important;
                bottom: 0 !important;
                width: 100vw !important;
                height: 100vh !important;
              }
              .calendar-modal-content {
                z-index: 2147483647 !important;
                position: relative !important;
              }
            `}
          </style>
          <div
            className="calendar-modal-overlay fixed inset-0 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4"
            style={{
              zIndex: 2147483647, // Maximum z-index value
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
            }}
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setShowCalendar(false);
              }
            }}
          >
            <div
              className="calendar-modal-content bg-white dark:bg-slate-800/95 backdrop-blur-md rounded-xl shadow-2xl border border-gray-200 dark:border-slate-700/50 w-full max-w-6xl h-full max-h-[95vh] sm:max-h-[90vh] overflow-hidden relative"
              style={{
                zIndex: 2147483647,
                position: "relative",
              }}
            >
              <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-slate-600/30 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-700">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-slate-100">
                  Calendar
                </h2>
                <button
                  onClick={() => setShowCalendar(false)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-slate-600/50 rounded-lg transition-all duration-200 hover:scale-105"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div className="h-full">
                <ErrorBoundary>
                  <CalendarProvider>
                    <OutlookCalendar />
                  </CalendarProvider>
                </ErrorBoundary>
              </div>
            </div>
          </div>
        </Portal>
      )}
    </div>
  );
};

export default ProfileDropdown;
