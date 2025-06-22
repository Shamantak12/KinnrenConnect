import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Link } from "wouter";
import { 
  MapPin, 
  Gamepad2, 
  MessageSquare, 
  Mountain, 
  Calendar, 
  GitBranch, 
  BookOpen, 
  Archive, 
  Video, 
  Share2, 
  Bookmark, 
  Landmark, 
  Settings,
  X 
} from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  user: any;
}

const menuItems = [
  { icon: MapPin, label: "Family Map", color: "text-pink-500", path: "/family-map" },
  { icon: Gamepad2, label: "Family Games", color: "text-teal-500", path: "/family-games" },
  { icon: MessageSquare, label: "Anonymous Chat", color: "text-purple-500", path: "/anonymous-chat" },
  { icon: Mountain, label: "Family Outings", color: "text-green-500", path: "/family-outings" },
  { icon: Calendar, label: "Calendar", color: "text-blue-500", path: "/calendar" },
  { icon: GitBranch, label: "Family Tree", color: "text-pink-500", path: "/family-tree" },
  { icon: BookOpen, label: "Story Time", color: "text-yellow-500", path: "/story-time" },
  { icon: Archive, label: "Time Capsule", color: "text-teal-500", path: "/time-capsule" },
  { icon: Video, label: "Video Montage", color: "text-purple-500", path: "/video-montage" },
  { icon: Share2, label: "Share Post", color: "text-blue-500", path: "/" },
  { icon: Bookmark, label: "Bookmarks", color: "text-green-500", path: "/bookmarks" },
  { icon: Landmark, label: "Heritage", color: "text-pink-500", path: "/heritage" },
];

export default function Sidebar({ isOpen, onClose, user }: SidebarProps) {
  return (
    <nav 
      className={`fixed top-0 left-0 h-full w-80 bg-white shadow-2xl z-50 transform transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Menu</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        <div className="flex items-center space-x-3">
          <img
            src={user?.profileImageUrl || `https://ui-avatars.com/api/?name=${user?.firstName}+${user?.lastName}&background=ff6b6b&color=fff`}
            alt="Family Profile"
            className="w-16 h-16 rounded-full border-3 border-pink-500 object-cover"
          />
          <div>
            <h3 className="font-semibold text-gray-800">
              {user?.firstName}'s Family
            </h3>
            <p className="text-sm text-gray-500">Family Member</p>
          </div>
        </div>
      </div>
      
      {/* Menu Items */}
      <div className="p-4 space-y-2 overflow-y-auto h-full pb-24">
        {menuItems.map((item, index) => (
          <Link key={index} href={item.path}>
            <Button
              variant="ghost"
              className="w-full justify-start p-3 rounded-lg hover:bg-gray-100 transition-colors text-gray-700"
              onClick={onClose}
            >
              <item.icon className={`h-5 w-5 mr-3 ${item.color}`} />
              <span>{item.label}</span>
            </Button>
          </Link>
        ))}
        
        <Separator className="my-4" />
        
        <Button
          variant="ghost"
          className="w-full justify-start p-3 rounded-lg hover:bg-gray-100 transition-colors text-gray-700"
          onClick={() => window.location.href = "/profile"}
        >
          <Settings className="h-5 w-5 mr-3 text-gray-600" />
          <span>Settings</span>
        </Button>
      </div>
    </nav>
  );
}
