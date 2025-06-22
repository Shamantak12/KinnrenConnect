import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Search, MessageCircle, Phone, Video, MoreVertical, Send, Smile, Paperclip } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Chats() {
  const [selectedChat, setSelectedChat] = useState<number | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();

  const chatList = [
    {
      id: 1,
      name: "Family Group",
      type: "group",
      avatar: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=150&h=150&fit=crop",
      lastMessage: "Sarah: Can't wait for tomorrow's picnic!",
      time: "2 min ago",
      unreadCount: 3,
      isOnline: true,
      participants: ["Mom", "Dad", "Sarah", "Mike"]
    },
    {
      id: 2,
      name: "Sarah Doe",
      type: "direct",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      lastMessage: "Thanks for the photos!",
      time: "5 min ago",
      unreadCount: 1,
      isOnline: true,
      participants: []
    },
    {
      id: 3,
      name: "Mike Doe",
      type: "direct",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      lastMessage: "See you at dinner tonight",
      time: "1 hour ago",
      unreadCount: 0,
      isOnline: false,
      participants: []
    },
    {
      id: 4,
      name: "Parents Only",
      type: "group",
      avatar: "https://images.unsplash.com/photo-1609220136736-443140cffec6?w=150&h=150&fit=crop",
      lastMessage: "Planning surprise for the kids",
      time: "3 hours ago",
      unreadCount: 0,
      isOnline: true,
      participants: ["Mom", "Dad"]
    }
  ];

  const messages = [
    {
      id: 1,
      sender: "Sarah Doe",
      content: "Good morning everyone! Beautiful day for our planned picnic 🌞",
      time: "9:15 AM",
      isMe: false,
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 2,
      sender: "You",
      content: "Absolutely! I'll bring the sandwiches and drinks.",
      time: "9:18 AM",
      isMe: true,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 3,
      sender: "Mike Doe",
      content: "I'll handle the games and music setup!",
      time: "9:20 AM",
      isMe: false,
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 4,
      sender: "Sarah Doe",
      content: "Perfect! Can't wait for tomorrow's picnic!",
      time: "9:22 AM",
      isMe: false,
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
    }
  ];

  const filteredChats = chatList.filter(chat => 
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedChatData = chatList.find(chat => chat.id === selectedChat);

  const sendMessage = () => {
    if (newMessage.trim()) {
      toast({
        title: "Message Sent",
        description: "Your message has been delivered to the family",
      });
      setNewMessage("");
    }
  };

  const startVideoCall = () => {
    toast({
      title: "Starting Video Call",
      description: "Connecting to family video room...",
    });
    setTimeout(() => {
      window.location.href = "/video-room";
    }, 1000);
  };

  const startPhoneCall = () => {
    toast({
      title: "Starting Audio Call",
      description: "Calling family members...",
    });
  };

  if (selectedChat && selectedChatData) {
    return (
      <div className="min-h-screen max-w-md mx-auto bg-white">
        {/* Chat Header */}
        <header className="bg-gradient-to-r from-[#936cbf] to-[#f38e57] text-white px-4 py-3 sticky top-0 z-40">
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSelectedChat(null)}
              className="text-white hover:bg-white/20 p-2"
            >
              <ArrowLeft className="h-6 w-6" />
            </Button>
            
            <div className="flex items-center space-x-3 flex-1">
              <div className="relative">
                <img
                  src={selectedChatData.avatar}
                  alt={selectedChatData.name}
                  className="w-10 h-10 rounded-full"
                />
                {selectedChatData.isOnline && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
                )}
              </div>
              <div className="flex-1">
                <h2 className="font-semibold">{selectedChatData.name}</h2>
                <p className="text-sm text-white/80">
                  {selectedChatData.type === "group" 
                    ? `${selectedChatData.participants.length} members`
                    : selectedChatData.isOnline ? "Online" : "Last seen 1 hour ago"
                  }
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={startPhoneCall}
                className="text-white hover:bg-white/20 p-2"
              >
                <Phone className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={startVideoCall}
                className="text-white hover:bg-white/20 p-2"
              >
                <Video className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/20 p-2"
              >
                <MoreVertical className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </header>

        {/* Messages */}
        <div className="flex-1 p-4 space-y-4 pb-20">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isMe ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex space-x-2 max-w-[80%] ${message.isMe ? 'flex-row-reverse space-x-reverse' : ''}`}>
                {!message.isMe && (
                  <img
                    src={message.avatar}
                    alt={message.sender}
                    className="w-8 h-8 rounded-full flex-shrink-0"
                  />
                )}
                <div className={`rounded-lg p-3 ${
                  message.isMe 
                    ? 'bg-[#936cbf] text-white' 
                    : 'bg-gray-100 text-gray-900'
                }`}>
                  {!message.isMe && (
                    <p className="text-xs font-medium text-[#936cbf] mb-1">{message.sender}</p>
                  )}
                  <p className="text-sm">{message.content}</p>
                  <p className={`text-xs mt-1 ${
                    message.isMe ? 'text-white/70' : 'text-gray-500'
                  }`}>
                    {message.time}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md bg-white border-t border-gray-200 p-4">
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-500 hover:bg-gray-100 p-2"
            >
              <Paperclip className="h-5 w-5" />
            </Button>
            <Input
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              className="flex-1 border-[#936cbf]/20 focus:border-[#936cbf] focus:ring-[#936cbf]/20"
            />
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-500 hover:bg-gray-100 p-2"
            >
              <Smile className="h-5 w-5" />
            </Button>
            <Button
              onClick={sendMessage}
              className="bg-[#936cbf] hover:bg-[#7a5ca8] text-white rounded-full p-2"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen max-w-md mx-auto bg-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-[#936cbf] to-[#f38e57] text-white px-4 py-4 sticky top-0 z-40">
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
            <h1 className="text-xl font-bold">Family Chats</h1>
            <p className="text-sm text-white/80">Stay connected with your loved ones</p>
          </div>
        </div>
      </header>

      {/* Search */}
      <div className="px-4 py-3 border-b border-gray-100">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search chats..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 border-[#936cbf]/20 focus:border-[#936cbf] focus:ring-[#936cbf]/20"
          />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-4 py-3 border-b border-gray-100">
        <div className="flex space-x-3">
          <Button
            onClick={startVideoCall}
            className="flex-1 bg-[#936cbf] hover:bg-[#7a5ca8] text-white"
          >
            <Video className="h-4 w-4 mr-2" />
            Start Video Call
          </Button>
          <Button
            onClick={() => window.location.href = "/anonymous-chat"}
            variant="outline"
            className="flex-1 border-[#f38e57] text-[#f38e57] hover:bg-[#f38e57] hover:text-white"
          >
            <MessageCircle className="h-4 w-4 mr-2" />
            Anonymous Chat
          </Button>
        </div>
      </div>

      {/* Chat List */}
      <div className="flex-1 p-4 space-y-3">
        {filteredChats.length === 0 ? (
          <div className="text-center py-12">
            <MessageCircle className="h-16 w-16 text-[#936cbf] mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Chats Found</h3>
            <p className="text-gray-600">Try searching with different keywords or start a new conversation.</p>
          </div>
        ) : (
          filteredChats.map((chat) => (
            <Card
              key={chat.id}
              className="cursor-pointer hover:shadow-md transition-shadow border-l-4 border-l-[#936cbf]"
              onClick={() => setSelectedChat(chat.id)}
            >
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <img
                      src={chat.avatar}
                      alt={chat.name}
                      className="w-12 h-12 rounded-full"
                    />
                    {chat.isOnline && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-gray-900 truncate">{chat.name}</h3>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-gray-500">{chat.time}</span>
                        {chat.unreadCount > 0 && (
                          <Badge className="bg-[#d65d8b] text-white text-xs">
                            {chat.unreadCount}
                          </Badge>
                        )}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 truncate">{chat.lastMessage}</p>
                    {chat.type === "group" && (
                      <div className="flex items-center mt-1">
                        <Badge variant="outline" className="text-xs text-[#936cbf] border-[#936cbf]">
                          {chat.participants.length} members
                        </Badge>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}