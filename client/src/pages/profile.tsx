import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Trophy, Star, Award, Target, Crown, Gift, Settings, LogOut } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Profile() {
  const { toast } = useToast();
  
  // Mock user data with points and achievements
  const user = {
    id: "1",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    profileImageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    familyId: "family-1",
    points: 2450,
    level: 8,
    achievements: [
      { id: 1, name: "Story Master", description: "Shared 10 family stories", icon: "📚", earned: true },
      { id: 2, name: "Game Champion", description: "Won 5 family games", icon: "🎮", earned: true },
      { id: 3, name: "Memory Keeper", description: "Added 20 photos", icon: "📸", earned: true },
      { id: 4, name: "Social Butterfly", description: "Connect with 5 families", icon: "🦋", earned: false },
      { id: 5, name: "Time Traveler", description: "Create 3 time capsules", icon: "⏰", earned: false }
    ]
  };

  const handleLogout = () => {
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out",
    });
  };

  return (
    <div className="min-h-screen max-w-md mx-auto bg-gray-50">
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
          <div>
            <h1 className="text-xl font-bold">Profile</h1>
            <p className="text-sm text-white/80">Your family journey</p>
          </div>
        </div>
      </header>

      <div className="p-4 space-y-6">
        {/* User Profile Card with Points */}
        <Card className="overflow-hidden">
          <div className="bg-gradient-to-r from-[#936cbf]/10 to-[#f38e57]/10 p-6">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <img
                  src={user.profileImageUrl}
                  alt="Profile"
                  className="w-20 h-20 rounded-full border-4 border-white shadow-lg"
                />
                <div className="absolute -bottom-1 -right-1 bg-[#936cbf] text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                  {user.level}
                </div>
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-gray-900 flex items-center space-x-2">
                  <span>{user.firstName} {user.lastName}</span>
                  <Crown className="h-5 w-5 text-yellow-500" />
                </h2>
                <div className="flex items-center space-x-2 mt-1">
                  <Star className="h-4 w-4 text-[#f38e57]" />
                  <span className="text-lg font-semibold text-[#936cbf]">{user.points.toLocaleString()} points</span>
                </div>
                <p className="text-sm text-gray-600">Level {user.level} • Family Champion</p>
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="mt-4">
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>Progress to Level {user.level + 1}</span>
                <span>75%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-gradient-to-r from-[#936cbf] to-[#f38e57] h-2 rounded-full" style={{ width: '75%' }}></div>
              </div>
            </div>
          </div>
          
          <CardContent className="p-4">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <Trophy className="h-6 w-6 text-[#f38e57] mx-auto mb-1" />
                <p className="text-lg font-bold text-gray-900">12</p>
                <p className="text-xs text-gray-600">Achievements</p>
              </div>
              <div>
                <Target className="h-6 w-6 text-[#936cbf] mx-auto mb-1" />
                <p className="text-lg font-bold text-gray-900">8</p>
                <p className="text-xs text-gray-600">Goals Met</p>
              </div>
              <div>
                <Gift className="h-6 w-6 text-[#d65d8b] mx-auto mb-1" />
                <p className="text-lg font-bold text-gray-900">3</p>
                <p className="text-xs text-gray-600">Rewards</p>
              </div>
            </div>
            
            <div className="flex justify-between mt-6">
              <Button
                variant="outline"
                onClick={() => window.location.href = "/settings"}
                className="flex items-center space-x-2 border-[#936cbf] text-[#936cbf] hover:bg-[#936cbf] hover:text-white"
              >
                <Settings className="h-4 w-4" />
                <span>Settings</span>
              </Button>
              
              <Button
                variant="outline"
                onClick={handleLogout}
                className="flex items-center space-x-2 text-red-600 border-red-200 hover:bg-red-50"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Achievements Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Award className="h-5 w-5 text-[#f38e57]" />
              <span>Achievements</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {user.achievements.map((achievement) => (
              <div key={achievement.id} className={`flex items-center space-x-3 p-3 rounded-lg ${
                achievement.earned ? 'bg-green-50 border border-green-200' : 'bg-gray-50 border border-gray-200'
              }`}>
                <div className="text-2xl">{achievement.icon}</div>
                <div className="flex-1">
                  <h4 className={`font-medium ${achievement.earned ? 'text-green-800' : 'text-gray-600'}`}>
                    {achievement.name}
                  </h4>
                  <p className={`text-sm ${achievement.earned ? 'text-green-600' : 'text-gray-500'}`}>
                    {achievement.description}
                  </p>
                </div>
                {achievement.earned && (
                  <div className="flex items-center space-x-1">
                    <Trophy className="h-4 w-4 text-green-600" />
                    <span className="text-xs text-green-600 font-medium">Earned</span>
                  </div>
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Star className="h-5 w-5 text-[#936cbf]" />
              <span>Recent Activity</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between p-2">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-700">Completed daily task</span>
              </div>
              <Badge className="bg-[#f38e57] text-white">+10 pts</Badge>
            </div>
            <div className="flex items-center justify-between p-2">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-sm text-gray-700">Won Family Bingo</span>
              </div>
              <Badge className="bg-[#936cbf] text-white">+50 pts</Badge>
            </div>
            <div className="flex items-center justify-between p-2">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span className="text-sm text-gray-700">Shared family photo</span>
              </div>
              <Badge className="bg-[#d65d8b] text-white">+25 pts</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Encouraging Message */}
        <Card className="bg-gradient-to-r from-[#936cbf]/10 to-[#f38e57]/10">
          <CardContent className="p-4 text-center">
            <Trophy className="h-8 w-8 text-[#f38e57] mx-auto mb-2" />
            <h3 className="font-semibold text-gray-900 mb-1">You're doing amazing!</h3>
            <p className="text-sm text-gray-600">Keep connecting with your family to earn more points and unlock new achievements.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}