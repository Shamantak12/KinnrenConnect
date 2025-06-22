import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import Sidebar from "@/components/Sidebar";
import PostCard from "@/components/PostCard";
import StoriesSection from "@/components/StoriesSection";
import BottomNavigation from "@/components/BottomNavigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageCircle, Menu, Video, Send, Search, Bell, Camera, Image, Plus, Target, Trophy, Users } from "lucide-react";

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [quickThought, setQuickThought] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Mock user for demo without authentication
  const user = {
    id: "1",
    firstName: "John",
    lastName: "Doe",
    profileImageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    familyId: "family-1"
  };

  // Fetch posts
  const { data: posts = [], isLoading: postsLoading } = useQuery({
    queryKey: ["/api/posts"],
    retry: false,
  });

  // Fetch stories
  const { data: stories = [] } = useQuery({
    queryKey: ["/api/stories"],
    retry: false,
  });

  const handleLike = useMutation({
    mutationFn: async (postId: number) => {
      await apiRequest(`/api/posts/${postId}/like`, "POST");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/posts"] });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to update like status",
        variant: "destructive",
      });
    },
  });

  const handleBookmark = useMutation({
    mutationFn: async (postId: number) => {
      await apiRequest(`/api/posts/${postId}/bookmark`, "POST");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/posts"] });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to update bookmark status",
        variant: "destructive",
      });
    },
  });

  return (
    <div className="min-h-screen max-w-md mx-auto bg-white relative">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between sticky top-0 z-40">
        <Button variant="ghost" size="sm" className="p-2 hover:bg-blue-100 rounded-lg relative" onClick={() => window.location.href = "/chats"}>
          <MessageCircle className="h-6 w-6 text-[#936cbf]" />
          <span className="absolute -top-1 -right-1 bg-[#d65d8b] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
            3
          </span>
        </Button>
        
        <div className="flex flex-col items-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-[#936cbf] to-[#f38e57] bg-clip-text text-transparent">
            Kinnren
          </h1>
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={() => window.location.href = "/notifications"}
          className="p-2 hover:bg-gray-100 rounded-lg relative"
        >
          <Bell className="h-6 w-6 text-gray-700" />
          <span className="absolute -top-1 -right-1 bg-[#f38e57] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
            2
          </span>
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setSidebarOpen(true)}
          className="p-2 hover:bg-gray-100 rounded-lg"
        >
          <Menu className="h-6 w-6 text-gray-700" />
        </Button>
      </header>



      {/* Quick Thought Sharing - Increased Size */}
      <div className="px-4 py-4 border-b border-gray-100">
        <div className="bg-gradient-to-r from-[#936cbf]/10 to-[#f38e57]/10 rounded-lg p-4">
          <div className="flex items-start space-x-3 mb-3">
            <img
              src={user.profileImageUrl}
              alt="Profile"
              className="w-10 h-10 rounded-full"
            />
            <div className="flex-1">
              <textarea
                placeholder="Share a quick thought, good morning message, or what's on your mind..."
                value={quickThought}
                onChange={(e) => setQuickThought(e.target.value)}
                className="w-full h-20 border-none bg-white/80 focus:bg-white placeholder-gray-500 resize-none rounded-lg p-3 text-sm"
              /></div>
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-500 hover:bg-white/80 p-2"
              onClick={() => toast({ title: "Image picker", description: "Image selection feature available" })}
            >
              <Image className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-500 hover:bg-white/80 p-2"
              onClick={() => toast({ title: "Emoji picker", description: "Emoji selection feature available" })}
            >
              😊
            </Button>
            <Button
              size="sm"
              className="bg-[#936cbf] hover:bg-[#7a5ca8] text-white rounded-full p-2"
              onClick={() => {
                if (quickThought.trim()) {
                  toast({
                    title: "Thought shared!",
                    description: "Your message has been sent to the family.",
                  });
                  setQuickThought("");
                }
              }}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Daily Tasks */}
      <div className="px-4 py-3 border-b border-gray-100">
        <h3 className="text-sm font-semibold text-gray-900 mb-3">Today's Family Tasks</h3>
        <div className="grid grid-cols-3 gap-3">
          <Button
            variant="outline"
            className="flex flex-col items-center p-3 h-auto border-[#936cbf]/20 hover:bg-[#936cbf]/10"
            onClick={() => toast({ title: "Task Complete!", description: "Image shared with family. +10 points!" })}
          >
            <Camera className="h-6 w-6 text-[#936cbf] mb-1" />
            <span className="text-xs text-center">Share Image</span>
            <span className="text-xs text-[#f38e57] font-medium">+10 pts</span>
          </Button>
          <Button
            variant="outline"
            className="flex flex-col items-center p-3 h-auto border-[#f38e57]/20 hover:bg-[#f38e57]/10"
            onClick={() => window.location.href = "/family-games"}
          >
            <Target className="h-6 w-6 text-[#f38e57] mb-1" />
            <span className="text-xs text-center">Start Game</span>
            <span className="text-xs text-[#936cbf] font-medium">+20 pts</span>
          </Button>
          <Button
            variant="outline"
            className="flex flex-col items-center p-3 h-auto border-[#d65d8b]/20 hover:bg-[#d65d8b]/10"
            onClick={() => window.location.href = "/family-map"}
          >
            <Users className="h-6 w-6 text-[#d65d8b] mb-1" />
            <span className="text-xs text-center">Add Group</span>
            <span className="text-xs text-[#f38e57] font-medium">+15 pts</span>
          </Button>
        </div>
      </div>

      {/* Stories Section */}
      {(stories as any[]).length > 0 && (
        <div className="px-4 py-2 border-b border-gray-100">
          <StoriesSection stories={stories as any[]} />
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 pb-20">
        {postsLoading ? (
          <div className="p-4 space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-gray-100 rounded-lg p-4 animate-pulse">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                  <div className="space-y-1">
                    <div className="h-4 bg-gray-300 rounded w-20"></div>
                    <div className="h-3 bg-gray-300 rounded w-16"></div>
                  </div>
                </div>
                <div className="h-20 bg-gray-300 rounded mb-3"></div>
                <div className="flex space-x-4">
                  <div className="h-8 bg-gray-300 rounded w-16"></div>
                  <div className="h-8 bg-gray-300 rounded w-16"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (posts as any[]).length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
            <div className="w-32 h-32 bg-gradient-to-br from-pink-100 to-teal-100 rounded-full flex items-center justify-center mb-6">
              <div className="text-4xl">👨‍👩‍👧‍👦</div>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Welcome to Your Family Circle
            </h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Start sharing precious moments with your loved ones. Create your first post to begin building beautiful memories together.
            </p>
            <Button className="bg-gradient-to-r from-pink-500 to-teal-500 hover:from-pink-600 hover:to-teal-600">
              Create Your First Post
            </Button>
          </div>
        ) : (
          (posts as any[]).map((post: any) => (
            <PostCard
              key={post.id}
              post={post}
              onLike={() => handleLike.mutate(post.id)}
              onBookmark={() => handleBookmark.mutate(post.id)}
              isLiking={handleLike.isPending}
              isBookmarking={handleBookmark.isPending}
            />
          ))
        )}
      </main>

      {/* Bottom Navigation */}
      <BottomNavigation />

      {/* Floating Video Call Button */}
      <div className="fixed bottom-24 right-6 z-30">
        <Button
          className="bg-[#936cbf] hover:bg-[#7a5ca8] text-white w-14 h-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
          size="sm"
          onClick={() => window.location.href = "/video-room"}
        >
          <Video className="h-6 w-6" />
        </Button>
      </div>

      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        user={user}
      />
    </div>
  );
}