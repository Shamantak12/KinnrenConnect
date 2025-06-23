import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ArrowLeft, BookOpen, Plus, Play, Eye, Camera, Mic, Headphones, Users, Heart, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function StoryTime() {
  const [selectedStory, setSelectedStory] = useState<any>(null);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [storyTopic, setStoryTopic] = useState("");
  const [storyDescription, setStoryDescription] = useState("");
  const { toast } = useToast();

  // Recorded family stories data
  const recordedStories = [
    {
      id: 1,
      title: "Grandpa's War Stories",
      narrator: "Robert Johnson",
      duration: "12:45",
      recordedDate: "2024-06-15",
      thumbnail: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      description: "Stories from WWII and life in the 1940s",
      plays: 23,
      likes: 8,
      category: "History"
    },
    {
      id: 2,
      title: "Mom's Childhood Adventures",
      narrator: "Sarah Johnson",
      duration: "8:30",
      recordedDate: "2024-06-18",
      thumbnail: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      description: "Growing up in the countryside in the 80s",
      plays: 15,
      likes: 12,
      category: "Childhood"
    },
    {
      id: 3,
      title: "Our First Family Vacation",
      narrator: "Mike Johnson",
      duration: "15:20",
      recordedDate: "2024-06-20",
      thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      description: "The epic road trip to Yellowstone in 1995",
      plays: 31,
      likes: 18,
      category: "Travel"
    },
    {
      id: 4,
      title: "Grandma's Secret Recipes",
      narrator: "Emma Johnson",
      duration: "6:15",
      recordedDate: "2024-06-19",
      thumbnail: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      description: "Traditional family recipes passed down through generations",
      plays: 19,
      likes: 14,
      category: "Cooking"
    }
  ];

  const visualStories = [
    {
      id: 1,
      content: "Beach day with the family!",
      imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=300&h=200&fit=crop",
      user: { firstName: "Sarah", lastName: "Doe" },
      createdAt: "2024-06-22T10:00:00Z",
      views: 5
    },
    {
      id: 2,
      content: "Emma's first steps captured on video!",
      videoUrl: "/placeholder-video.mp4",
      user: { firstName: "Mike", lastName: "Doe" },
      createdAt: "2024-06-21T15:30:00Z",
      views: 12
    }
  ];

  const playStory = (story: any) => {
    setSelectedStory(story);
    toast({
      title: "Playing Story",
      description: `Now playing: ${story.title}`,
    });
  };

  const likeStory = (storyId: number) => {
    toast({
      title: "Story Liked",
      description: "Added to your favorites!",
    });
  };

  return (
    <div className="min-h-screen max-w-md mx-auto bg-gray-50">
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
              <h1 className="text-xl font-bold">Story Time</h1>
              <p className="text-sm text-white/80">Share and listen to family stories</p>
            </div>
          </div>
          <Button 
            className="bg-white/20 hover:bg-white/30 text-white border-white/30" 
            size="sm"
            onClick={() => setShowCreateDialog(true)}
          >
            <Plus className="h-4 w-4 mr-1" />
            Create Story
          </Button>
        </div>
      </header>

      <Tabs defaultValue="recorded" className="w-full">
        <TabsList className="grid w-full grid-cols-2 sticky top-20 z-30 bg-white border-b">
          <TabsTrigger value="recorded">Audio Stories</TabsTrigger>
          <TabsTrigger value="visual">Visual Stories</TabsTrigger>
        </TabsList>

        {/* Recorded Stories Tab */}
        <TabsContent value="recorded" className="p-4 space-y-4">
          {/* Featured Story */}
          <Card className="overflow-hidden border-l-4 border-l-[#936cbf]">
            <div className="bg-gradient-to-r from-[#936cbf]/10 to-[#f38e57]/10 p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Headphones className="h-5 w-5 text-[#936cbf]" />
                <span className="font-semibold text-[#936cbf]">Featured Story</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900">Family Story Collection</h3>
              <p className="text-sm text-gray-600">4 recorded stories • 42 min total</p>
            </div>
          </Card>

          {/* Story List */}
          <div className="space-y-3">
            {recordedStories.map((story) => (
              <Card key={story.id} className="overflow-hidden">
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <div className="relative">
                      <img
                        src={story.thumbnail}
                        alt={story.narrator}
                        className="w-16 h-16 rounded-full"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Button
                          size="sm"
                          onClick={() => playStory(story)}
                          className="w-8 h-8 rounded-full bg-[#936cbf] hover:bg-[#7a5ca8] p-0"
                        >
                          <Play className="h-4 w-4 text-white ml-0.5" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-1">
                        <h4 className="font-semibold text-gray-900 text-sm">{story.title}</h4>
                        <Badge variant="outline" className="text-xs">
                          {story.category}
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-600 mb-2">by {story.narrator}</p>
                      <p className="text-xs text-gray-500 mb-2">{story.description}</p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3 text-xs text-gray-500">
                          <div className="flex items-center space-x-1">
                            <Clock className="h-3 w-3" />
                            <span>{story.duration}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Eye className="h-3 w-3" />
                            <span>{story.plays} plays</span>
                          </div>
                        </div>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => likeStory(story.id)}
                          className="h-6 px-2"
                        >
                          <Heart className="h-3 w-3 mr-1" />
                          {story.likes}
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Recording Tips */}
          <Card className="bg-gradient-to-r from-[#f38e57]/10 to-[#d65d8b]/10">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Mic className="h-5 w-5 text-[#f38e57]" />
                <h3 className="font-semibold text-gray-900">Recording Tips</h3>
              </div>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Find a quiet space for recording</li>
                <li>• Share personal experiences and emotions</li>
                <li>• Include specific dates and locations</li>
                <li>• Keep stories between 5-15 minutes</li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Visual Stories Tab */}
        <TabsContent value="visual" className="p-4 space-y-4">
          <div className="space-y-4">
            {visualStories.map((story) => (
              <Card key={story.id}>
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-[#936cbf] to-[#f38e57] rounded-full flex items-center justify-center text-white font-bold">
                      {story.user.firstName[0]}
                    </div>
                    <div>
                      <h4 className="font-medium">{story.user.firstName} {story.user.lastName}</h4>
                      <p className="text-sm text-gray-500">2 hours ago</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="mb-3">{story.content}</p>
                  {story.imageUrl && (
                    <img
                      src={story.imageUrl}
                      alt="Story"
                      className="w-full rounded-lg mb-3"
                    />
                  )}
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center space-x-4">
                      <Button variant="ghost" size="sm" className="h-8 px-2">
                        <Eye className="h-4 w-4 mr-1" />
                        {story.views}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Currently Playing */}
      {selectedStory && (
        <div className="fixed bottom-4 left-4 right-4 max-w-md mx-auto">
          <Card className="bg-white shadow-lg border-2 border-[#936cbf]">
            <CardContent className="p-3">
              <div className="flex items-center space-x-3">
                <img
                  src={selectedStory.thumbnail}
                  alt={selectedStory.narrator}
                  className="w-10 h-10 rounded-full"
                />
                <div className="flex-1">
                  <h4 className="font-medium text-sm">{selectedStory.title}</h4>
                  <p className="text-xs text-gray-600">by {selectedStory.narrator}</p>
                </div>
                <Button
                  size="sm"
                  onClick={() => setSelectedStory(null)}
                  className="bg-[#936cbf] hover:bg-[#7a5ca8] h-8 w-8 p-0"
                >
                  <Play className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Story Creation Dialog */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent className="max-w-sm mx-auto">
          <DialogHeader>
            <DialogTitle>Create New Story</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="topic">Story Topic</Label>
              <Input
                id="topic"
                placeholder="Enter the main topic or theme"
                value={storyTopic}
                onChange={(e) => setStoryTopic(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe what this story is about..."
                value={storyDescription}
                onChange={(e) => setStoryDescription(e.target.value)}
                rows={3}
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                className="flex flex-col items-center p-4 h-auto border-[#936cbf] text-[#936cbf] hover:bg-[#936cbf] hover:text-white"
                onClick={() => {
                  toast({ title: "Recording Started", description: "Audio story recording has begun" });
                  setShowCreateDialog(false);
                  setStoryTopic("");
                  setStoryDescription("");
                }}
              >
                <Mic className="h-6 w-6 mb-2" />
                <span className="text-sm">Record Audio</span>
              </Button>
              <Button
                variant="outline"
                className="flex flex-col items-center p-4 h-auto border-[#f38e57] text-[#f38e57] hover:bg-[#f38e57] hover:text-white"
                onClick={() => {
                  toast({ title: "Camera Opened", description: "Visual story creation started" });
                  setShowCreateDialog(false);
                  setStoryTopic("");
                  setStoryDescription("");
                }}
              >
                <Camera className="h-6 w-6 mb-2" />
                <span className="text-sm">Visual Story</span>
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}