import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ArrowLeft, BookOpen, Plus, Play, Eye, Camera } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

export default function StoryTime() {
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [content, setContent] = useState("");
  const [selectedStory, setSelectedStory] = useState<any>(null);
  
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch stories
  const { data: stories = [] } = useQuery({
    queryKey: ["/api/stories"],
    enabled: !!user,
    retry: false,
  });

  // Create story mutation
  const createStory = useMutation({
    mutationFn: async () => {
      await apiRequest("POST", "/api/stories", {
        content,
        imageUrl: null,
        videoUrl: null,
      });
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Story created successfully!",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/stories"] });
      setShowCreateDialog(false);
      setContent("");
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to create story",
        variant: "destructive",
      });
    },
  });

  // View story mutation
  const viewStory = useMutation({
    mutationFn: async (storyId: number) => {
      await apiRequest("POST", `/api/stories/${storyId}/view`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/stories"] });
    },
  });

  const handleCreate = () => {
    if (!content.trim()) return;
    createStory.mutate();
  };

  const handleViewStory = (story: any) => {
    setSelectedStory(story);
    viewStory.mutate(story.id);
  };

  return (
    <div className="min-h-screen max-w-md mx-auto bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => window.history.back()}
            className="p-2 hover:bg-gray-100 rounded-lg mr-3"
          >
            <ArrowLeft className="h-6 w-6 text-gray-700" />
          </Button>
          <h1 className="text-xl font-semibold text-gray-800">Story Time</h1>
        </div>
        
        <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
          <DialogTrigger asChild>
            <Button className="bg-yellow-500 hover:bg-yellow-600" size="sm">
              <Plus className="h-4 w-4 mr-1" />
              Story
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-sm mx-auto">
            <DialogHeader>
              <DialogTitle>Share Your Story</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Input
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="What's happening in your day?"
                  className="min-h-20"
                />
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" className="flex-1">
                  <Camera className="h-4 w-4 mr-1" />
                  Photo
                </Button>
                <Button variant="outline" className="flex-1">
                  <Play className="h-4 w-4 mr-1" />
                  Video
                </Button>
              </div>
              <Button
                onClick={handleCreate}
                disabled={!content.trim() || createStory.isPending}
                className="w-full bg-yellow-500 hover:bg-yellow-600"
              >
                {createStory.isPending ? "Sharing..." : "Share Story"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </header>

      <div className="p-4 space-y-6">
        {/* Active Stories */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BookOpen className="h-5 w-5 text-yellow-500" />
              <span>Family Stories</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {stories.length === 0 ? (
              <div className="text-center py-8">
                <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-2">No stories yet</p>
                <p className="text-sm text-gray-500">Share your first family moment</p>
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-3">
                {stories.map((story: any) => (
                  <div
                    key={story.id}
                    className="relative cursor-pointer"
                    onClick={() => handleViewStory(story)}
                  >
                    <div className="story-gradient p-0.5 rounded-xl">
                      <div className="w-20 h-20 bg-gray-200 rounded-xl flex items-center justify-center relative overflow-hidden">
                        {story.imageUrl ? (
                          <img
                            src={story.imageUrl}
                            alt="Story"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="text-2xl">📖</div>
                        )}
                        <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
                          <Play className="h-6 w-6 text-white" />
                        </div>
                      </div>
                    </div>
                    <p className="text-xs text-center mt-1 text-gray-700 truncate">
                      {story.user?.firstName || 'Family'}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Story Stats */}
        <Card>
          <CardHeader>
            <CardTitle>Story Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-yellow-500">{stories.length}</div>
                <div className="text-sm text-gray-600">Stories</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-500">
                  {stories.reduce((acc: number, story: any) => acc + (story.viewsCount || 0), 0)}
                </div>
                <div className="text-sm text-gray-600">Views</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-500">24h</div>
                <div className="text-sm text-gray-600">Duration</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Stories */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Stories</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {stories.slice(0, 5).map((story: any) => (
              <div key={story.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <BookOpen className="h-6 w-6 text-yellow-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-800 truncate">{story.content}</p>
                  <div className="flex items-center space-x-2 text-xs text-gray-500 mt-1">
                    <span>{story.user?.firstName || 'Family'}</span>
                    <span>•</span>
                    <span>{formatDistanceToNow(new Date(story.createdAt), { addSuffix: true })}</span>
                    <span>•</span>
                    <div className="flex items-center space-x-1">
                      <Eye className="h-3 w-3" />
                      <span>{story.viewsCount || 0}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Story Tips */}
        <Card>
          <CardHeader>
            <CardTitle>Story Tips</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-gray-600">
            <p>• Stories disappear after 24 hours</p>
            <p>• Share daily moments with your family</p>
            <p>• Add photos or videos to make them engaging</p>
            <p>• View family members' stories to stay connected</p>
          </CardContent>
        </Card>
      </div>

      {/* Story Viewer Modal */}
      {selectedStory && (
        <Dialog open={!!selectedStory} onOpenChange={() => setSelectedStory(null)}>
          <DialogContent className="max-w-sm mx-auto">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                  <span className="font-bold text-yellow-600">
                    {selectedStory.user?.firstName?.[0] || 'F'}
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold">{selectedStory.user?.firstName || 'Family'}</h3>
                  <p className="text-sm text-gray-500">
                    {formatDistanceToNow(new Date(selectedStory.createdAt), { addSuffix: true })}
                  </p>
                </div>
              </div>
              
              {selectedStory.imageUrl && (
                <img
                  src={selectedStory.imageUrl}
                  alt="Story"
                  className="w-full rounded-lg"
                />
              )}
              
              <p className="text-gray-800">{selectedStory.content}</p>
              
              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <Eye className="h-4 w-4" />
                  <span>{selectedStory.viewsCount || 0} views</span>
                </div>
                <span>Expires in {Math.max(0, Math.ceil((new Date(selectedStory.expiresAt).getTime() - Date.now()) / (1000 * 60 * 60)))}h</span>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}