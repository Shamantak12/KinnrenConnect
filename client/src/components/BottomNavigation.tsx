import { Button } from "@/components/ui/button";
import { Home, Search, Plus, Heart, User } from "lucide-react";

export default function BottomNavigation() {
  return (
    <nav className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md bg-white border-t border-gray-200 px-4 py-2">
      <div className="flex items-center justify-around">
        <Button variant="ghost" className="flex flex-col items-center p-2 text-pink-500">
          <Home className="h-6 w-6" />
          <span className="text-xs mt-1">Home</span>
        </Button>
        
        <Button variant="ghost" className="flex flex-col items-center p-2 text-gray-600 hover:text-pink-500">
          <Search className="h-6 w-6" />
          <span className="text-xs mt-1">Search</span>
        </Button>
        
        <Button className="flex flex-col items-center p-2 bg-gradient-to-r from-pink-500 to-teal-500 rounded-full w-12 h-12 justify-center hover:from-pink-600 hover:to-teal-600">
          <Plus className="h-6 w-6 text-white" />
        </Button>
        
        <Button variant="ghost" className="flex flex-col items-center p-2 text-gray-600 hover:text-pink-500">
          <Heart className="h-6 w-6" />
          <span className="text-xs mt-1">Likes</span>
        </Button>
        
        <Button 
          variant="ghost" 
          className="flex flex-col items-center p-2 text-gray-600 hover:text-pink-500"
          onClick={() => window.location.href = "/profile"}
        >
          <User className="h-6 w-6" />
          <span className="text-xs mt-1">Profile</span>
        </Button>
      </div>
    </nav>
  );
}
