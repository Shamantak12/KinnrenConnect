import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Plus } from "lucide-react";

interface StoriesSectionProps {
  stories: any[];
}

export default function StoriesSection({ stories }: StoriesSectionProps) {
  return (
    <div className="px-4 py-3 border-b border-gray-200 bg-white">
      <div className="flex space-x-4 overflow-x-auto pb-2">
        {/* Add Story Button */}
        <div className="flex flex-col items-center space-y-1 flex-shrink-0">
          <Button 
            variant="outline"
            className="w-16 h-16 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 border-2 border-dashed border-gray-400 hover:from-gray-300 hover:to-gray-400"
          >
            <Plus className="h-6 w-6 text-gray-600" />
          </Button>
          <span className="text-xs text-gray-600">Add Story</span>
        </div>
        
        {/* Stories */}
        {stories.map((story) => (
          <div key={story.id} className="flex flex-col items-center space-y-1 flex-shrink-0">
            <div className="story-gradient p-0.5 rounded-full">
              <Avatar className="w-14 h-14 border-2 border-white">
                <AvatarImage 
                  src={story.user.profileImageUrl || `https://ui-avatars.com/api/?name=${story.user.firstName}+${story.user.lastName}&background=4ecdc4&color=fff`}
                  alt={`${story.user.firstName}'s Story`}
                />
                <AvatarFallback>
                  {story.user.firstName?.[0]}{story.user.lastName?.[0]}
                </AvatarFallback>
              </Avatar>
            </div>
            <span className="text-xs text-gray-700 text-center w-16 truncate">
              {story.user.firstName}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
