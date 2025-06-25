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
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { MessageCircle, Menu, Video, Send, Search, Bell, Camera, Image, Plus, Target, Trophy, Users, Smile } from "lucide-react";

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [quickThought, setQuickThought] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showGroupDialog, setShowGroupDialog] = useState(false);
  const [selectedStory, setSelectedStory] = useState<any>(null);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
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
    <div className="min-h-screen max-w-md mx-auto bg-white dark:bg-gray-900 relative">
      {/* Header */}
      <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-4 py-3 flex items-center justify-between sticky top-0 z-40">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => window.location.href = "/notifications"}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg relative"
        >
          <Bell className="h-6 w-6 text-gray-700 dark:text-gray-300" />
          <span className="absolute -top-1 -right-1 bg-[#f38e57] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
            2
          </span>
        </Button>
        
        <div className="flex flex-col items-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-[#936cbf] to-[#f38e57] bg-clip-text text-transparent">
            Kinnren
          </h1>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowGroupDialog(true)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
          >
            <Plus className="h-6 w-6 text-gray-700 dark:text-gray-300" />
          </Button>
          
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setSidebarOpen(true)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
          >
            <Menu className="h-6 w-6 text-gray-700 dark:text-gray-300" />
          </Button>
        </div>
      </header>



      {/* Quick Thought Sharing - Increased Size */}
      <div className="px-4 py-4 border-b border-gray-100 dark:border-gray-800">
        <div className="bg-gradient-to-r from-[#936cbf]/10 to-[#f38e57]/10 dark:from-[#936cbf]/20 dark:to-[#f38e57]/20 rounded-lg p-4">
          <div className="flex items-start space-x-3 mb-3">
            <img
              src={user.profileImageUrl}
              alt="Profile"
              className="w-10 h-10 rounded-full"
            />
            <div className="flex-1 relative">
              <textarea
                placeholder="Share a quick thought, good morning message, or what's on your mind..."
                value={quickThought}
                onChange={(e) => setQuickThought(e.target.value)}
                className="w-full h-20 border-none bg-white/80 dark:bg-gray-800/80 dark:text-white focus:bg-white dark:focus:bg-gray-800 placeholder-gray-500 dark:placeholder-gray-400 resize-none rounded-lg p-3 pr-12 text-sm"
              />
              <Button
                variant="ghost"
                size="sm"
                className="absolute bottom-2 right-2 text-gray-500 hover:bg-white/80 dark:hover:bg-gray-700/80 p-1 rounded"
                onClick={() => toast({ title: "Emoji picker", description: "Emoji selection feature available" })}
              >
                <Smile className="h-4 w-4" />
              </Button>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-500 dark:text-gray-400 hover:bg-white/80 dark:hover:bg-gray-700/80 p-2"
              onClick={() => {
                const input = document.createElement('input');
                input.type = 'file';
                input.accept = 'image/*';
                input.multiple = true;
                input.onchange = (e) => {
                  const files = (e.target as HTMLInputElement).files;
                  if (files && files.length > 0) {
                    toast({ title: "Images selected", description: `${files.length} image(s) ready to share with your thought` });
                  }
                };
                input.click();
              }}
            >
              <Image className="h-4 w-4" />
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

      {/* Stories Section - Instagram Style */}
      <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-800">
        <div className="flex space-x-3 overflow-x-auto pb-2 scrollbar-hide">
          {/* Add Story Button */}
          <div className="flex flex-col items-center space-y-1 min-w-[70px]">
            <div className="relative">
              <Button
                onClick={() => {
                  const input = document.createElement('input');
                  input.type = 'file';
                  input.accept = 'image/*,video/*';
                  input.onchange = (e) => {
                    const files = (e.target as HTMLInputElement).files;
                    if (files && files.length > 0) {
                      toast({ title: "Story uploaded!", description: "Your story is now live for 24 hours" });
                    }
                  };
                  input.click();
                }}
                className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400 flex items-center justify-center p-0 border-2 border-dashed border-gray-300 dark:border-gray-600"
              >
                <Plus className="h-6 w-6" />
              </Button>
            </div>
            <span className="text-xs text-gray-600 dark:text-gray-400 text-center">Your Story</span>
          </div>
          
          {/* Family Stories */}
          {(stories as any[]).map((story) => (
            <div key={story.id} className="flex flex-col items-center space-y-1 min-w-[70px]">
              <div className="relative">
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#f38e57] via-[#d65d8b] to-[#936cbf] p-[2px]">
                  <img
                    src={story.thumbnail}
                    alt={story.user.firstName}
                    className="w-full h-full rounded-full object-cover bg-white dark:bg-gray-900 p-[2px] cursor-pointer"
                    onClick={() => {
                      setSelectedStory(story);
                      toast({ title: "Story opened", description: `Viewing ${story.user.firstName}'s story` });
                    }}
                  />
                </div>
                {!story.viewed && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#f38e57] rounded-full border border-white dark:border-gray-900"></div>
                )}
              </div>
              <span 
                className="text-xs text-gray-600 dark:text-gray-400 text-center truncate w-16 cursor-pointer hover:text-[#936cbf]"
                onClick={() => window.location.href = `/profile/${story.user.id}`}
              >
                {story.user.firstName}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Story Viewer Modal */}
      {selectedStory && (
        <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
          <div className="relative w-full h-full max-w-md bg-black">
            <img
              src={selectedStory.thumbnail}
              alt="Story"
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <img
                  src={selectedStory.user.profileImageUrl}
                  alt={selectedStory.user.firstName}
                  className="w-8 h-8 rounded-full border border-white"
                />
                <span className="text-white text-sm font-medium">{selectedStory.user.firstName}</span>
                <span className="text-white/80 text-xs">{selectedStory.timeAgo}</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedStory(null)}
                className="text-white hover:bg-white/20 p-1"
              >
                <Plus className="h-5 w-5 rotate-45" />
              </Button>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/30">
              <div className="h-full bg-white animate-pulse"></div>
            </div>
          </div>
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
            <div className="w-32 h-32 bg-gradient-to-br from-pink-100 to-teal-100 dark:from-pink-900/30 dark:to-teal-900/30 rounded-full flex items-center justify-center mb-6">
              <div className="text-4xl">👨‍👩‍👧‍👦</div>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
              Welcome to Your Family Circle
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
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



      {/* Group Creation Dialog */}
      <Dialog open={showGroupDialog} onOpenChange={setShowGroupDialog}>
        <DialogContent className="max-w-sm mx-auto">
          <DialogHeader>
            <DialogTitle>Create Group</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <p className="text-sm text-gray-600 dark:text-gray-400">Create a new group with family members</p>
            <Button
              onClick={() => {
                setShowGroupDialog(false);
                window.location.href = "/chats";
              }}
              className="w-full bg-gradient-to-r from-[#936cbf] to-[#f38e57] hover:opacity-90 text-white flex items-center justify-center space-x-2"
            >
              <Users className="h-5 w-5" />
              <span>Create New Group</span>
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        user={user}
      />
    </div>
  );
}