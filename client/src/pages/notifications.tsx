import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, UserPlus, Check, X, Heart, MessageCircle, Calendar, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Notifications() {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "family_request",
      title: "Family Request",
      message: "Sarah Johnson wants to join your family",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      time: "2 min ago",
      unread: true,
      actions: true
    },
    {
      id: 2,
      type: "family_request", 
      title: "Family Request",
      message: "Mike Wilson sent a family connection request",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      time: "1 hour ago",
      unread: true,
      actions: true
    },
    {
      id: 3,
      type: "like",
      title: "Post Liked",
      message: "Emma liked your family picnic photo",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      time: "3 hours ago",
      unread: false,
      actions: false
    },
    {
      id: 4,
      type: "event",
      title: "Event Reminder",
      message: "Family dinner tonight at 7 PM",
      avatar: null,
      time: "5 hours ago",
      unread: false,
      actions: false
    },
    {
      id: 5,
      type: "message",
      title: "New Message",
      message: "Dad shared a memory in Family Group",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      time: "1 day ago",
      unread: false,
      actions: false
    }
  ]);

  const { toast } = useToast();

  const handleAccept = (notificationId: number) => {
    setNotifications(prev => prev.filter(n => n.id !== notificationId));
    toast({
      title: "Request Accepted",
      description: "Family member has been added successfully!",
    });
  };

  const handleDecline = (notificationId: number) => {
    setNotifications(prev => prev.filter(n => n.id !== notificationId));
    toast({
      title: "Request Declined",
      description: "Family request has been declined.",
    });
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "family_request":
        return <UserPlus className="h-5 w-5 text-[#936cbf]" />;
      case "like":
        return <Heart className="h-5 w-5 text-[#d65d8b]" />;
      case "message":
        return <MessageCircle className="h-5 w-5 text-[#f38e57]" />;
      case "event":
        return <Calendar className="h-5 w-5 text-[#936cbf]" />;
      default:
        return <Users className="h-5 w-5 text-gray-500" />;
    }
  };

  const unreadCount = notifications.filter(n => n.unread).length;

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
          <div className="flex-1">
            <h1 className="text-xl font-bold">Notifications</h1>
            <p className="text-sm text-white/80">
              {unreadCount > 0 ? `${unreadCount} new notifications` : "All caught up!"}
            </p>
          </div>
        </div>
      </header>

      {/* Notifications List */}
      <div className="flex-1 p-4 space-y-3">
        {notifications.length === 0 ? (
          <div className="text-center py-12">
            <Users className="h-16 w-16 text-[#936cbf] mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Notifications</h3>
            <p className="text-gray-600">You're all caught up! Check back later for updates.</p>
          </div>
        ) : (
          notifications.map((notification) => (
            <Card
              key={notification.id}
              className={`transition-all duration-200 ${
                notification.unread 
                  ? 'border-l-4 border-l-[#936cbf] bg-blue-50/30' 
                  : 'border-l-4 border-l-gray-200'
              }`}
            >
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    {notification.avatar ? (
                      <img
                        src={notification.avatar}
                        alt="Avatar"
                        className="w-12 h-12 rounded-full"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#936cbf] to-[#f38e57] flex items-center justify-center">
                        {getNotificationIcon(notification.type)}
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-semibold text-gray-900 text-sm">
                        {notification.title}
                      </h4>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-gray-500">{notification.time}</span>
                        {notification.unread && (
                          <div className="w-2 h-2 bg-[#d65d8b] rounded-full"></div>
                        )}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{notification.message}</p>
                    
                    {notification.actions && (
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          onClick={() => handleAccept(notification.id)}
                          className="bg-[#936cbf] hover:bg-[#7a5ca8] text-white"
                        >
                          <Check className="h-3 w-3 mr-1" />
                          Accept
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDecline(notification.id)}
                          className="border-[#d65d8b] text-[#d65d8b] hover:bg-[#d65d8b] hover:text-white"
                        >
                          <X className="h-3 w-3 mr-1" />
                          Decline
                        </Button>
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