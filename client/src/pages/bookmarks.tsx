import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Bookmark, Heart, MessageCircle, Share2 } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

export default function Bookmarks() {
  const { user } = useAuth();

  // Fetch bookmarked posts
  const { data: bookmarkedPosts = [] } = useQuery({
    queryKey: ["/api/bookmarks"],
    enabled: !!user,
    retry: false,
  });

  return (
    <div className="min-h-screen max-w-md mx-auto bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center sticky top-0 z-40">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => window.history.back()}
          className="p-2 hover:bg-gray-100 rounded-lg mr-3"
        >
          <ArrowLeft className="h-6 w-6 text-gray-700" />
        </Button>
        <h1 className="text-xl font-semibold text-gray-800">Bookmarks</h1>
      </header>

      <div className="p-4 space-y-6">
        {/* Stats */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Bookmark className="h-5 w-5 text-green-500" />
              <span>Saved Memories</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-500">{bookmarkedPosts.length}</div>
              <div className="text-sm text-gray-600">Bookmarked Posts</div>
            </div>
          </CardContent>
        </Card>

        {/* Bookmarked Posts */}
        <div className="space-y-4">
          {bookmarkedPosts.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <Bookmark className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-600 mb-2">No Bookmarks Yet</h3>
                <p className="text-gray-500 mb-4">Save your favorite family posts to view them later</p>
                <Button onClick={() => window.history.back()}>
                  Browse Posts
                </Button>
              </CardContent>
            </Card>
          ) : (
            bookmarkedPosts.map((post: any) => (
              <Card key={post.id} className="animate-fade-in">
                <CardContent className="p-4">
                  {/* Post Header */}
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-pink-400 to-teal-400 rounded-full flex items-center justify-center text-white font-bold">
                      {post.user?.firstName?.[0]}{post.user?.lastName?.[0]}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">
                        {post.user?.firstName} {post.user?.lastName}
                      </h3>
                      <p className="text-xs text-gray-500">
                        {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
                      </p>
                    </div>
                  </div>

                  {/* Post Image */}
                  {post.imageUrl && (
                    <img
                      src={post.imageUrl}
                      alt="Post content"
                      className="w-full rounded-lg mb-3 aspect-square object-cover"
                    />
                  )}

                  {/* Post Content */}
                  {post.content && (
                    <p className="text-gray-800 mb-3">{post.content}</p>
                  )}

                  {/* Post Actions */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Heart className="h-4 w-4 text-pink-500" />
                        <span className="text-sm text-gray-600">{post.likesCount}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MessageCircle className="h-4 w-4 text-teal-500" />
                        <span className="text-sm text-gray-600">{post.commentsCount}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm">
                        <Share2 className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Bookmark className="h-4 w-4 fill-green-500 text-green-500" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Tips */}
        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-4">
            <h4 className="font-semibold text-green-800 mb-2">Bookmark Tips</h4>
            <ul className="text-sm text-green-700 space-y-1">
              <li>• Tap the bookmark icon on any post to save it</li>
              <li>• Bookmarked posts are saved privately</li>
              <li>• Access your saved memories anytime</li>
              <li>• Organize your favorite family moments</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}