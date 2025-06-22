import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "wouter";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Home, Search, MessageSquare, Heart, User, Video, Users } from "lucide-react";

export default function BottomNavigation() {
  const [location] = useLocation();
  const [showChatDialog, setShowChatDialog] = useState(false);

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
                item.active ? 'text-[#936cbf]' : 'text-gray-600 hover:text-[#936cbf]'
              }`}
            >
              <item.icon className="h-6 w-6" />
              <span className="text-xs mt-1">{item.label}</span>
            </Button>
          </Link>
        ))}
        
        <Dialog open={showChatDialog} onOpenChange={setShowChatDialog}>
          <DialogTrigger asChild>
            <Button className="flex flex-col items-center p-2 bg-gradient-to-r from-[#936cbf] to-[#f38e57] rounded-full w-12 h-12 justify-center hover:opacity-90">
              <MessageSquare className="h-6 w-6 text-white" />
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-sm mx-auto">
            <DialogHeader>
              <DialogTitle>Choose Chat Type</DialogTitle>
            </DialogHeader>
            <div className="space-y-3">
              <Button
                onClick={() => {
                  setShowChatDialog(false);
                  window.location.href = "/video-room";
                }}
                className="w-full bg-[#936cbf] hover:bg-[#7a5ca8] text-white flex items-center justify-center space-x-2"
              >
                <Video className="h-5 w-5" />
                <span>Video Chat with Family</span>
              </Button>
              <Button
                onClick={() => {
                  setShowChatDialog(false);
                  window.location.href = "/chats";
                }}
                variant="outline"
                className="w-full border-[#f38e57] text-[#f38e57] hover:bg-[#f38e57] hover:text-white flex items-center justify-center space-x-2"
              >
                <Users className="h-5 w-5" />
                <span>Chat with Other Families</span>
              </Button>
            </div>
          </DialogContent>
        </Dialog>
        
        {navItems.slice(2).map((item) => (
          <Link key={item.path} href={item.path}>
            <Button 
              variant="ghost" 
              className={`flex flex-col items-center p-2 ${
                item.active ? 'text-[#936cbf]' : 'text-gray-600 hover:text-[#936cbf]'
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
