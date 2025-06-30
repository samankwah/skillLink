import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  User,
  Lightbulb,
  Users,
  MessageCircle,
  Briefcase,
  FolderOpen,
  Settings,
  BookOpen,
  Award,
  UserPlus,
  Star,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Dashboard", href: "/app/dashboard", icon: LayoutDashboard },
  { name: "Courses", href: "/app/courses", icon: BookOpen },
  { name: "Certificates", href: "/app/certificates", icon: Award },
  { name: "Profile", href: "/app/profile", icon: User },
  { name: "Skills", href: "/app/skills", icon: Lightbulb },
  { name: "Connections", href: "/app/connections", icon: Users },
  { name: "Messages", href: "/app/messages", icon: MessageCircle },
  { name: "Jobs", href: "/app/jobs", icon: Briefcase },
  { name: "Projects", href: "/app/projects", icon: FolderOpen },
  { name: "Referrals", href: "/app/referrals", icon: UserPlus },
  { name: "Settings", href: "/app/settings", icon: Settings },
];

const Sidebar = ({ isOpen, onClose }) => {
  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed top-16 lg:top-20 left-0 z-50 w-64 h-[calc(100vh-4rem)] lg:h-[calc(100vh-5rem)] overflow-y-auto bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-r shadow-sm transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="flex flex-col h-full">
          <nav className="flex-1 px-6 py-8 space-y-3">
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                onClick={onClose}
                className={({ isActive }) =>
                  cn(
                    "flex items-center px-4 py-3 text-sm font-medium rounded-3xl transition-all duration-200",
                    isActive
                      ? "bg-gradient-to-r from-primary to-secondary text-primary shadow-lg transform scale-105"
                      : "hover:text-primary hover:bg-muted/50 hover:transform hover:scale-105"
                  )
                }
              >
                <item.icon className="mr-4 h-5 w-5" />
                {item.name}
              </NavLink>
            ))}
          </nav>

          {/* Bottom section */}
          <div className="p-6 border-t">
            <div className="bg-gradient-to-br from-secondary/20 to-accent/20 rounded-3xl p-6 shadow-sm">
              <h3 className="text-sm font-semibold mb-3 text-primary">
                Skill Match
              </h3>
              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold text-primary">85%</span>
                <span className="text-xs text-muted-foreground">This week</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
