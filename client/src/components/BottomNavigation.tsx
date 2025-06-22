import { Button } from "@/components/ui/button";
import { Link, useLocation } from "wouter";
import { Home, Search, Video, Heart, User } from "lucide-react";

export default function BottomNavigation() {
  const [location] = useLocation();

  const navItems = [
    { icon: Home, label: "Home", path: "/", active: location === "/" },
    { icon: Search, label: "Search", path: "/family-map", active: location === "/family-map" },
    { icon: Heart, label: "Likes", path: "/bookmarks", active: location === "/bookmarks" },
    { icon: User, label: "Profile", path: "/profile", active: location === "/profile" },
  ];

  return (
    <nav className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md bg-white border-t border-gray-200 px-4 py-2">
      <div className="flex items-center justify-around">
        {navItems.slice(0, 2).map((item) => (
          <Link key={item.path} href={item.path}>
            <Button 
              variant="ghost" 
              className={`flex flex-col items-center p-2 ${
                item.active ? 'text-pink-500' : 'text-gray-600 hover:text-pink-500'
              }`}
            >
              <item.icon className="h-6 w-6" />
              <span className="text-xs mt-1">{item.label}</span>
            </Button>
          </Link>
        ))}
        
        <Link href="/video-room">
          <Button className="flex flex-col items-center p-2 bg-gradient-to-r from-[#936cbf] to-[#f38e57] rounded-full w-12 h-12 justify-center hover:opacity-90">
            <Video className="h-6 w-6 text-white" />
          </Button>
        </Link>
        
        {navItems.slice(2).map((item) => (
          <Link key={item.path} href={item.path}>
            <Button 
              variant="ghost" 
              className={`flex flex-col items-center p-2 ${
                item.active ? 'text-pink-500' : 'text-gray-600 hover:text-pink-500'
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
