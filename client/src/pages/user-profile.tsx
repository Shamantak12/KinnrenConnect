import { useState } from "react";
import { useParams } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Heart, MessageCircle, Share, MoreHorizontal, UserPlus, Users, Calendar } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

export default function UserProfile() {
  const { userId } = useParams();
  const [isFollowing, setIsFollowing] = useState(false);

  // Mock user data based on userId
  const getUserData = (id: string) => {
    const users = {
      "2": {
        id: "2",
        firstName: "Sara",
        lastName: "Johnson",
        profileImageUrl: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
        bio: "Mother of three, loves family adventures and cooking. Always planning the next family outing!",
        location: "San Francisco, CA",
        joinedDate: "2023-08-15",
        followers: 124,
        following: 89,
        posts: [
          {
            id: 1,
            content: "Amazing day at the beach with the kids! The sunset was absolutely breathtaking. Can't wait to do this again next weekend.",
            image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=300&fit=crop",
            createdAt: "2024-06-24T10:30:00Z",
            likes: 23,
            comments: 8
          },
          {
            id: 2,
            content: "Just finished preparing grandma's famous apple pie recipe. The whole house smells incredible! Family traditions are the best.",
            image: "https://images.unsplash.com/photo-1621743478914-cc8a86d7e7b5?w=400&h=300&fit=crop",
            createdAt: "2024-06-23T15:45:00Z",
            likes: 31,
            comments: 12
          },
          {
            id: 3,
            content: "Game night was a huge success! The kids loved the new board games we got. Quality family time is everything.",
            createdAt: "2024-06-22T20:15:00Z",
            likes: 18,
            comments: 5
          }
        ]
      },
      "3": {
        id: "3",
        firstName: "Mike",
        lastName: "Smith",
        profileImageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
        bio: "Dad, tech enthusiast, and weekend photographer. Love capturing family moments and exploring new places.",
        location: "Austin, TX",
        joinedDate: "2023-09-10",
        followers: 98,
        following: 112,
        posts: [
          {
            id: 4,
            content: "Took the family on a hiking adventure today! The kids were troopers and we discovered a beautiful waterfall. Nature therapy at its finest.",
            image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop",
            createdAt: "2024-06-24T14:20:00Z",
            likes: 27,
            comments: 9
          },
          {
            id: 5,
            content: "Built a treehouse with the kids this weekend. It's not perfect, but the memories we made are priceless!",
            image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
            createdAt: "2024-06-23T11:30:00Z",
            likes: 45,
            comments: 15
          },
          {
            id: 6,
            content: "Family movie night featuring classic Disney films. The kids picked 'The Lion King' and we all sang along! 🦁",
            createdAt: "2024-06-21T19:45:00Z",
            likes: 22,
            comments: 7
          }
        ]
      }
    };
    return users[id as keyof typeof users] || users["2"];
  };

  const user = getUserData(userId || "2");

  return (
    <div className="min-h-screen max-w-md mx-auto bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40">
        <div className="flex items-center justify-between p-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => window.history.back()}
            className="p-2"
          >
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            {user.firstName} {user.lastName}
          </h1>
          <Button variant="ghost" size="sm" className="p-2">
            <MoreHorizontal className="h-6 w-6" />
          </Button>
        </div>
      </header>

      {/* Profile Info */}
      <div className="bg-white dark:bg-gray-900 p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-start space-x-4">
          <Avatar className="w-20 h-20">
            <AvatarImage src={user.profileImageUrl} alt={`${user.firstName} ${user.lastName}`} />
            <AvatarFallback className="text-lg bg-[#936cbf] text-white">
              {user.firstName[0]}{user.lastName[0]}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1">
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
              {user.firstName} {user.lastName}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mt-1">{user.bio}</p>
            <div className="flex items-center space-x-1 mt-2">
              <Calendar className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-500">
                Joined {new Date(user.joinedDate).toLocaleDateString('en-US', { 
                  month: 'long', 
                  year: 'numeric' 
                })}
              </span>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="flex justify-around mt-6 pt-4 border-t border-gray-100 dark:border-gray-700">
          <div className="text-center">
            <div className="text-xl font-bold text-gray-900 dark:text-gray-100">{user.posts.length}</div>
            <div className="text-sm text-gray-500">Posts</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-gray-900 dark:text-gray-100">{user.followers}</div>
            <div className="text-sm text-gray-500">Followers</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-gray-900 dark:text-gray-100">{user.following}</div>
            <div className="text-sm text-gray-500">Following</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3 mt-6">
          <Button 
            onClick={() => setIsFollowing(!isFollowing)}
            className={`flex-1 ${isFollowing 
              ? 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-600' 
              : 'bg-[#936cbf] hover:bg-[#7d5ca3] text-white'
            }`}
          >
            <UserPlus className="h-4 w-4 mr-2" />
            {isFollowing ? 'Following' : 'Follow'}
          </Button>
          <Button variant="outline" className="flex-1">
            <MessageCircle className="h-4 w-4 mr-2" />
            Message
          </Button>
        </div>
      </div>

      {/* Posts */}
      <div className="bg-white dark:bg-gray-900">
        <Tabs defaultValue="posts" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-gray-50 dark:bg-gray-800 m-0 rounded-none border-b border-gray-200 dark:border-gray-700">
            <TabsTrigger value="posts" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900">
              Posts
            </TabsTrigger>
            <TabsTrigger value="about" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900">
              About
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="posts" className="mt-0">
            <div className="space-y-0">
              {user.posts.map((post) => (
                <div key={post.id} className="border-b border-gray-200 dark:border-gray-700 p-4">
                  <div className="flex items-center space-x-3 mb-3">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={user.profileImageUrl} alt={`${user.firstName} ${user.lastName}`} />
                      <AvatarFallback className="text-xs bg-[#936cbf] text-white">
                        {user.firstName[0]}{user.lastName[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-sm text-gray-900 dark:text-gray-100">
                        {user.firstName} {user.lastName}
                      </p>
                      <p className="text-xs text-gray-500">
                        {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
                      </p>
                    </div>
                  </div>
                  
                  <p className="text-gray-900 dark:text-gray-100 mb-3">{post.content}</p>
                  
                  {post.image && (
                    <img
                      src={post.image}
                      alt="Post"
                      className="w-full h-64 object-cover rounded-lg mb-3"
                    />
                  )}
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Button variant="ghost" size="sm" className="p-0">
                        <Heart className="h-5 w-5 mr-1 text-gray-500" />
                        <span className="text-sm text-gray-500">{post.likes}</span>
                      </Button>
                      <Button variant="ghost" size="sm" className="p-0">
                        <MessageCircle className="h-5 w-5 mr-1 text-gray-500" />
                        <span className="text-sm text-gray-500">{post.comments}</span>
                      </Button>
                    </div>
                    <Button variant="ghost" size="sm" className="p-0">
                      <Share className="h-5 w-5 text-gray-500" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="about" className="mt-0 p-4">
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100">About</h3>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <span className="text-sm font-medium text-gray-500">Bio</span>
                    <p className="text-gray-900 dark:text-gray-100 mt-1">{user.bio}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">Location</span>
                    <p className="text-gray-900 dark:text-gray-100 mt-1">{user.location}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">Family Member Since</span>
                    <p className="text-gray-900 dark:text-gray-100 mt-1">
                      {new Date(user.joinedDate).toLocaleDateString('en-US', { 
                        month: 'long', 
                        day: 'numeric',
                        year: 'numeric' 
                      })}
                    </p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100">Family Connection</h3>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-[#936cbf]" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Connected to your family circle
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}