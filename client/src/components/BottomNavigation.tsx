import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Link, useLocation } from "wouter";
import { Home, Search, MessageCircle, Heart, User, Video, Users } from "lucide-react";

export default function BottomNavigation() {
  const [location] = useLocation();

  const [showChatOptions, setShowChatOptions] = useState(false);

  const navItems = [
    { icon: Home, label: "Home", path: "/", active: location === "/" },
    { icon: Search, label: "Search", path: "/family-map", active: location === "/family-map" },
    { icon: MessageCircle, label: "Chat", action: () => setShowChatOptions(true), active: location === "/chats" },
    { icon: Heart, label: "Likes", path: "/bookmarks", active: location === "/bookmarks" },
    { icon: User, label: "Profile", path: "/profile", active: location === "/profile" },
  ];

  return (
    <nav className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 px-4 py-2">
      <div className="flex items-center justify-around">
        {navItems.map((item) => (
          item.action ? (
            <Button 
              key={item.label}
              variant="ghost" 
              className={`flex flex-col items-center p-2 ${
                item.active ? 'text-[#936cbf]' : 'text-gray-600 dark:text-gray-400 hover:text-[#936cbf]'
              }`}
              onClick={item.action}
            >
              <item.icon className="h-6 w-6" />
              <span className="text-xs mt-1">{item.label}</span>
            </Button>
          ) : (
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
          )
        ))}
      </div>

      {/* Chat Options Dialog */}
      <Dialog open={showChatOptions} onOpenChange={setShowChatOptions}>
        <DialogContent className="max-w-sm mx-auto" aria-describedby="chat-options-description">
          <DialogHeader>
            <DialogTitle>Chat Options</DialogTitle>
          </DialogHeader>
          <div id="chat-options-description" className="sr-only">
            Choose between video chat or group messaging options
          </div>
          <div className="space-y-3">
            <Button
              onClick={() => {
                setShowChatOptions(false);
                window.location.href = "/video-room";
              }}
              className="w-full bg-gradient-to-r from-[#936cbf] to-[#f38e57] hover:opacity-90 text-white flex items-center justify-center space-x-2"
            >
              <Video className="h-5 w-5" />
              <span>Video Chat</span>
            </Button>
            <Button
              onClick={() => {
                setShowChatOptions(false);
                window.location.href = "/chats";
              }}
              variant="outline"
              className="w-full border-[#936cbf] text-[#936cbf] hover:bg-[#936cbf] hover:text-white flex items-center justify-center space-x-2"
            >
              <Users className="h-5 w-5" />
              <span>Chat with Group</span>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </nav>
  );
}
