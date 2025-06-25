import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription 
} from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal, Share, Flag, Trash2, Edit, Smile, X, Copy, MessageSquare, Phone, Mail } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { useToast } from "@/hooks/use-toast";

interface PostCardProps {
  post: any;
  onLike: () => void;
  onBookmark: () => void;
  isLiking: boolean;
  isBookmarking: boolean;
}

export default function PostCard({ post, onLike, onBookmark, isLiking, isBookmarking }: PostCardProps) {
  const [showComments, setShowComments] = useState(false);
  const [showShareDialog, setShowShareDialog] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([
    {
      id: 1,
      user: { firstName: "Sarah", lastName: "Smith", profileImageUrl: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face" },
      content: "This looks amazing! 😍",
      createdAt: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
      likes: 3
    },
    {
      id: 2,
      user: { firstName: "Mike", lastName: "Johnson", profileImageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" },
      content: "Can't wait to join you next time!",
      createdAt: new Date(Date.now() - 1000 * 60 * 8).toISOString(),
      likes: 1
    }
  ]);
  const { toast } = useToast();

  const timeAgo = formatDistanceToNow(new Date(post.createdAt), { addSuffix: true });

  return (
    <Card className="border-0 border-b border-gray-200 dark:border-gray-700 dark:bg-gray-900 rounded-none post-shadow animate-fade-in">
      {/* Post Header */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-3">
          <Avatar className="w-10 h-10">
            <AvatarImage 
              src={post.user.profileImageUrl || `https://ui-avatars.com/api/?name=${post.user.firstName}+${post.user.lastName}&background=ff6b6b&color=fff`} 
              alt={`${post.user.firstName} ${post.user.lastName}`}
              className="cursor-pointer"
              onClick={() => window.location.href = `/profile/${post.user.id}`}
            />
            <AvatarFallback>
              {post.user.firstName?.[0]}{post.user.lastName?.[0]}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold text-gray-800 dark:text-gray-200">
              {post.user.firstName} {post.user.lastName}
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">{timeAgo}</p>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full">
              <MoreHorizontal className="h-5 w-5 text-gray-600 dark:text-gray-400" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem 
              className="flex items-center space-x-2"
              onClick={() => setShowShareDialog(true)}
            >
              <Share className="h-4 w-4" />
              <span>Share Post</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center space-x-2">
              <Edit className="h-4 w-4" />
              <span>Edit Post</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center space-x-2">
              <Flag className="h-4 w-4" />
              <span>Report</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center space-x-2 text-red-600 dark:text-red-400">
              <Trash2 className="h-4 w-4" />
              <span>Delete Post</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      {/* Post Image */}
      {post.imageUrl && (
        <div className="relative">
          <img
            src={post.imageUrl}
            alt="Post content"
            className="w-full aspect-square object-cover"
          />
        </div>
      )}
      
      {/* Post Content */}
      <CardContent className="p-4">
        {/* Action Buttons */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={onLike}
              disabled={isLiking}
              className={`p-0 transition-transform hover:scale-110 touch-feedback ${post.isLiked ? 'heart-animation' : ''}`}
            >
              <Heart 
                className={`h-6 w-6 ${post.isLiked ? 'fill-pink-500 text-pink-500' : 'text-gray-700 hover:text-pink-500'}`}
              />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="p-0 transition-transform hover:scale-110 touch-feedback"
              onClick={() => setShowComments(!showComments)}
            >
              <MessageCircle className="h-6 w-6 text-gray-700 hover:text-teal-500" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="p-0 transition-transform hover:scale-110 touch-feedback"
              onClick={() => setShowShareDialog(true)}
            >
              <Send className="h-6 w-6 text-gray-700 hover:text-yellow-500" />
            </Button>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onBookmark}
            disabled={isBookmarking}
            className="p-0 transition-transform hover:scale-110 touch-feedback"
          >
            <Bookmark 
              className={`h-6 w-6 ${post.isBookmarked ? 'fill-green-500 text-green-500' : 'text-gray-700 hover:text-green-500'}`}
            />
          </Button>
        </div>
        
        {/* Likes Count */}
        <p className="font-semibold text-sm mb-1">{post.likesCount} likes</p>
        
        {/* Post Caption */}
        {post.content && (
          <p className="text-sm text-gray-800 mb-2">
            <span className="font-semibold">{post.user.firstName} {post.user.lastName}</span>
            <span className="ml-2">{post.content}</span>
          </p>
        )}
        
        {/* Comments Count */}
        {(post.commentsCount > 0 || comments.length > 0) && (
          <Button 
            variant="ghost" 
            className="p-0 text-sm text-gray-500 hover:text-gray-700 mb-2"
            onClick={() => setShowComments(!showComments)}
          >
            View all {post.commentsCount || comments.length} comments
          </Button>
        )}

        {/* Comments Section */}
        {showComments && (
          <div className="space-y-3 mb-4 border-t border-gray-100 dark:border-gray-700 pt-3">
            {/* Existing Comments */}
            {comments.map((comment) => (
              <div key={comment.id} className="flex space-x-3">
                <Avatar className="w-8 h-8 flex-shrink-0">
                  <AvatarImage src={comment.user.profileImageUrl} alt={comment.user.firstName} />
                  <AvatarFallback className="text-xs">
                    {comment.user.firstName[0]}{comment.user.lastName[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="comment-bubble px-3 py-2 animate-slide-up">
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {comment.user.firstName} {comment.user.lastName}
                    </p>
                    <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                      {comment.content}
                    </p>
                  </div>
                  <div className="flex items-center space-x-4 mt-1 ml-3">
                    <span className="text-xs text-gray-500">
                      {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                    </span>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-xs text-gray-500 hover:text-gray-700 p-0 h-auto font-medium"
                    >
                      Like
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-xs text-gray-500 hover:text-gray-700 p-0 h-auto font-medium"
                    >
                      Reply
                    </Button>
                    {comment.likes > 0 && (
                      <span className="text-xs text-gray-500">
                        {comment.likes} {comment.likes === 1 ? 'like' : 'likes'}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {/* Add Comment */}
            <div className="flex space-x-3 mt-4">
              <Avatar className="w-8 h-8 flex-shrink-0">
                <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face" alt="You" />
                <AvatarFallback>You</AvatarFallback>
              </Avatar>
              <div className="flex-1 flex space-x-2">
                <div className="flex-1 relative">
                  <Input
                    placeholder="Add a comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="rounded-full border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 pr-10"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && newComment.trim()) {
                        const comment = {
                          id: comments.length + 1,
                          user: { firstName: "You", lastName: "", profileImageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face" },
                          content: newComment.trim(),
                          createdAt: new Date().toISOString(),
                          likes: 0
                        };
                        setComments([...comments, comment]);
                        setNewComment("");
                        toast({
                          title: "Comment added",
                          description: "Your comment has been posted"
                        });
                      }
                    }}
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1"
                    onClick={() => toast({ title: "Emoji picker", description: "Coming soon!" })}
                  >
                    <Smile className="h-4 w-4 text-gray-500" />
                  </Button>
                </div>
                {newComment.trim() && (
                  <Button
                    size="sm"
                    onClick={() => {
                      const comment = {
                        id: comments.length + 1,
                        user: { firstName: "You", lastName: "", profileImageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face" },
                        content: newComment.trim(),
                        createdAt: new Date().toISOString(),
                        likes: 0
                      };
                      setComments([...comments, comment]);
                      setNewComment("");
                      toast({
                        title: "Comment added",
                        description: "Your comment has been posted"
                      });
                    }}
                    className="bg-[#936cbf] hover:bg-[#7a5ca8] text-white rounded-full px-4"
                  >
                    Post
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
        
        {/* Time ago */}
        <p className="text-xs text-gray-400 uppercase">{timeAgo}</p>
      </CardContent>

      {/* Share Dialog */}
      <Dialog open={showShareDialog} onOpenChange={setShowShareDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Share Post</DialogTitle>
            <DialogDescription>
              Share this post with your family and friends
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            {/* Quick Share Options */}
            {/* <div className="grid grid-cols-4 gap-4">
              <Button
                variant="outline"
                className="flex flex-col items-center p-4 h-auto hover:bg-blue-50 border-blue-200"
                onClick={() => {
                  navigator.share?.({
                    title: `${post.user.firstName}'s post`,
                    text: post.content,
                    url: window.location.href
                  });
                  toast({ title: "Shared", description: "Post shared successfully" });
                  setShowShareDialog(false);
                }}
              >
                <Share className="h-6 w-6 text-blue-500 mb-2" />
                <span className="text-xs">Share</span>
              </Button> */}
              
              {/* <Button
                variant="outline"
                className="flex flex-col items-center p-4 h-auto hover:bg-green-50 border-green-200"
                onClick={() => {
                  const text = `Check out ${post.user.firstName}'s post: ${post.content}`;
                  const url = `sms:?body=${encodeURIComponent(text)}`;
                  window.location.href = url;
                  toast({ title: "SMS opened", description: "Opening SMS app" });
                  setShowShareDialog(false);
                }}
              >
                <MessageSquare className="h-6 w-6 text-green-500 mb-2" />
                <span className="text-xs">SMS</span>
              </Button> */}

              {/* <Button
                variant="outline"
                className="flex flex-col items-center p-4 h-auto hover:bg-red-50 border-red-200"
                onClick={() => {
                  const subject = `${post.user.firstName}'s Family Post`;
                  const body = `Check out this post from ${post.user.firstName}: ${post.content}`;
                  const url = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
                  window.location.href = url;
                  toast({ title: "Email opened", description: "Opening email app" });
                  setShowShareDialog(false);
                }}
              >
                <Mail className="h-6 w-6 text-red-500 mb-2" />
                <span className="text-xs">Email</span>
              </Button> */}

              {/* <Button
                variant="outline"
                className="flex flex-col items-center p-4 h-auto hover:bg-gray-50 border-gray-200"
                onClick={() => {
                  const postUrl = `${window.location.origin}/post/${post.id}`;
                  navigator.clipboard.writeText(postUrl);
                  toast({ title: "Link copied", description: "Post link copied to clipboard" });
                  setShowShareDialog(false);
                }}
              >
                <Copy className="h-6 w-6 text-gray-500 mb-2" />
                <span className="text-xs">Copy</span>
              </Button>
            </div> */}

            {/* Family Members Quick Share */}
            <div className="border-t pt-4">
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Share with Family
              </h4>
              <div className="space-y-2">
                {[
                  { name: "Mom", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face" },
                  { name: "Dad", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" },
                  { name: "Sister", avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face" }
                ].map((member) => (
                  <Button
                    key={member.name}
                    variant="ghost"
                    className="w-full flex items-center space-x-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg"
                    onClick={() => {
                      toast({ 
                        title: "Shared", 
                        description: `Post shared with ${member.name}` 
                      });
                      setShowShareDialog(false);
                    }}
                  >
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={member.avatar} alt={member.name} />
                      <AvatarFallback>{member.name[0]}</AvatarFallback>
                    </Avatar>
                    <span className="flex-1 text-left">{member.name}</span>
                    <Send className="h-4 w-4 text-gray-400" />
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
