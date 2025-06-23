import { Button } from "@/components/ui/button";
import { Link, useLocation } from "wouter";
import { Home, Search, MessageCircle, Heart, User } from "lucide-react";

export default function BottomNavigation() {
  const [location] = useLocation();

  const navItems = [
    { icon: Home, label: "Home", path: "/", active: location === "/" },
    { icon: Search, label: "Search", path: "/family-map", active: location === "/family-map" },
    { icon: MessageCircle, label: "Chat", path: "/chats", active: location === "/chats" },
    { icon: Heart, label: "Likes", path: "/bookmarks", active: location === "/bookmarks" },
    { icon: User, label: "Profile", path: "/profile", active: location === "/profile" },
  ];

  return (
    <nav className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 px-4 py-2">
      <div className="flex items-center justify-around">
        {navItems.map((item) => (
          <Link key={item.path} href={item.path}>
            <Button 
              variant="ghost" 
              className={`flex flex-col items-center p-2 ${
                item.active ? 'text-[#936cbf]' : 'text-gray-600 dark:text-gray-400 hover:text-[#936cbf]'
              }`}
            >
              <item.icon className="h-6 w-6" />
              <span className="text-xs mt-1">{item.label}</span>
            </Button>
          </Link>
        ))}
      </div>
    </nav>
  );
}
