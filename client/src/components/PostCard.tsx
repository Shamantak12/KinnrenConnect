import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal, Share, Flag, Trash2, Edit } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface PostCardProps {
  post: any;
  onLike: () => void;
  onBookmark: () => void;
  isLiking: boolean;
  isBookmarking: boolean;
}

export default function PostCard({ post, onLike, onBookmark, isLiking, isBookmarking }: PostCardProps) {
  const [showComments, setShowComments] = useState(false);

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
            <DropdownMenuItem className="flex items-center space-x-2">
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
              className={`p-0 transition-transform hover:scale-110 ${post.isLiked ? 'heart-animation' : ''}`}
            >
              <Heart 
                className={`h-6 w-6 ${post.isLiked ? 'fill-pink-500 text-pink-500' : 'text-gray-700 hover:text-pink-500'}`}
              />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="p-0 transition-transform hover:scale-110"
              onClick={() => setShowComments(!showComments)}
            >
              <MessageCircle className="h-6 w-6 text-gray-700 hover:text-teal-500" />
            </Button>
            <Button variant="ghost" size="sm" className="p-0 transition-transform hover:scale-110">
              <Send className="h-6 w-6 text-gray-700 hover:text-yellow-500" />
            </Button>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onBookmark}
            disabled={isBookmarking}
            className="p-0 transition-transform hover:scale-110"
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
        {post.commentsCount > 0 && (
          <Button 
            variant="ghost" 
            className="p-0 text-sm text-gray-500 hover:text-gray-700 mb-2"
            onClick={() => setShowComments(!showComments)}
          >
            View all {post.commentsCount} comments
          </Button>
        )}
        
        {/* Time ago */}
        <p className="text-xs text-gray-400 uppercase">{timeAgo}</p>
      </CardContent>
    </Card>
  );
}
