import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Search, MessageCircle, Phone, Video, MoreVertical } from "lucide-react";

export default function Chats() {
  const [searchQuery, setSearchQuery] = useState("");

  const chats = [
    {
      id: 1,
      name: "Family Group",
      lastMessage: "Good morning everyone! 🌅",
      time: "9:30 AM",
      unread: 3,
      avatar: "👨‍👩‍👧‍👦",
      online: true
    },
    {
      id: 2,
      name: "Sarah Johnson",
      lastMessage: "Can't wait for the family reunion!",
      time: "8:45 AM",
      unread: 1,
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      online: true
    },
    {
      id: 3,
      name: "Mike Smith",
      lastMessage: "Thanks for the birthday wishes ❤️",
      time: "Yesterday",
      unread: 0,
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      online: false
    },
    {
      id: 4,
      name: "Emma Wilson",
      lastMessage: "Beach photos are amazing!",
      time: "Yesterday",
      unread: 0,
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      online: true
    },
    {
      id: 5,
      name: "Grandparents Group",
      lastMessage: "We miss you all so much 💕",
      time: "2 days ago",
      unread: 2,
      avatar: "👴👵",
      online: false
    }
  ];

  const filteredChats = chats.filter(chat =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen max-w-md mx-auto bg-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-[#936cbf] to-[#f38e57] text-white px-4 py-4 sticky top-0 z-40">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => window.history.back()}
              className="text-white hover:bg-white/20 p-2"
            >
              <ArrowLeft className="h-6 w-6" />
            </Button>
            <div>
              <h1 className="text-xl font-bold">Chats</h1>
              <p className="text-sm text-white/80">Stay connected with family</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="text-white hover:bg-white/20 p-2"
          >
            <MoreVertical className="h-6 w-6" />
          </Button>
        </div>

        {/* Search Bar */}
        <div className="mt-4 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/60" />
          <Input
            placeholder="Search chats..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-white/20 border-white/30 text-white placeholder-white/60 focus:bg-white/30"
          />
        </div>
      </header>

      {/* Chat List */}
      <div className="flex-1">
        {filteredChats.map((chat) => (
          <div
            key={chat.id}
            className="px-4 py-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors"
            onClick={() => window.location.href = `/chat/${chat.id}`}
          >
            <div className="flex items-center space-x-3">
              {/* Avatar */}
              <div className="relative">
                {chat.avatar.startsWith('http') ? (
                  <img
                    src={chat.avatar}
                    alt={chat.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#936cbf] to-[#f38e57] flex items-center justify-center text-xl">
                    {chat.avatar}
                  </div>
                )}
                {chat.online && (
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                )}
              </div>

              {/* Chat Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-gray-900 truncate">{chat.name}</h3>
                  <span className="text-xs text-gray-500">{chat.time}</span>
                </div>
                <p className="text-sm text-gray-600 truncate mt-1">{chat.lastMessage}</p>
              </div>

              {/* Actions */}
              <div className="flex items-center space-x-2">
                {chat.unread > 0 && (
                  <div className="bg-[#d65d8b] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {chat.unread}
                  </div>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-[#936cbf] hover:bg-[#936cbf]/10 p-1"
                  onClick={(e) => {
                    e.stopPropagation();
                    // Handle phone call
                  }}
                >
                  <Phone className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-[#f38e57] hover:bg-[#f38e57]/10 p-1"
                  onClick={(e) => {
                    e.stopPropagation();
                    // Handle video call
                  }}
                >
                  <Video className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* New Chat Button */}
      <div className="fixed bottom-6 right-6">
        <Button
          className="bg-[#936cbf] hover:bg-[#7a5ca8] text-white w-14 h-14 rounded-full shadow-lg"
          onClick={() => window.location.href = "/new-chat"}
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      </div>
    </div>
  );
}