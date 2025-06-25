import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Trophy,
  Star,
  Award,
  Target,
  Crown,
  Gift,
  Settings,
  LogOut,
  Phone,
  Mail,
  MapPin,
  MessageSquare,
  Video,
  Edit3,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Profile() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("about");

  const user = {
    id: "1",
    firstName: "Robert",
    lastName: "Johnson",
    email: "robert.johnson@email.com",
    phone: "+1 (555) 123-4567",
    location: "Seattle, WA",
    profileImageUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    level: 8,
    points: 2450,
    achievements: [
      {
        id: 1,
        name: "Story Master",
        description: "Shared 10 family stories",
        icon: "📚",
        earned: true,
      },
      {
        id: 2,
        name: "Game Champion",
        description: "Won 5 family games",
        icon: "🎮",
        earned: true,
      },
      {
        id: 3,
        name: "Memory Keeper",
        description: "Added 20 photos",
        icon: "📸",
        earned: true,
      },
      {
        id: 4,
        name: "Social Butterfly",
        description: "Connect with 5 families",
        icon: "🦋",
        earned: false,
      },
      {
        id: 5,
        name: "Time Traveler",
        description: "Create 3 time capsules",
        icon: "⏰",
        earned: false,
      },
    ],
    connections: [
      { name: "Emily Johnson", relation: "Granddaughter" },
      { name: "David Johnson", relation: "Grandson" },
      { name: "Sarah Wilson", relation: "Daughter" },
      { name: "Michael Johnson", relation: "Son" },
    ],
    interests: ["Fishing", "Gardening", "Reading", "Photography"],
    about:
      "Loving grandfather who enjoys fishing, gardening, and spending time with family. Retired teacher with 40 years of experience.",
  };

  const handleLogout = () => {
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out",
    });
  };

  return (
    <div className="min-h-screen max-w-md mx-auto bg-white dark:bg-gray-900 relative">
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
        {/* Profile Card with Actions */}
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
                  <span>
                    {user.firstName} {user.lastName}
                  </span>
                  <Crown className="h-5 w-5 text-yellow-500" />
                </h2>
                <div className="flex items-center space-x-2 mt-1">
                  <Star className="h-4 w-4 text-[#f38e57]" />
                  <span className="text-lg font-semibold text-[#936cbf]">
                    {user.points.toLocaleString()} points
                  </span>
                </div>
                <p className="text-sm text-gray-600">
                  Level {user.level} • Family Patriarch
                </p>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-around mt-4">
              {/* <Button variant="secondary" size="sm" className="gap-1">
                <MessageSquare className="h-4 w-4" />
                Message
              </Button>
              <Button variant="secondary" size="sm" className="gap-1">
                <Phone className="h-4 w-4" />
                Call
              </Button>
              <Button variant="secondary" size="sm" className="gap-1">
                <Video className="h-4 w-4" />
                Video
              </Button> */}
              <Button variant="secondary" size="sm" className="gap-1">
                <Edit3 className="h-4 w-4" />
                Edit
              </Button>
            </div>

            {/* Progress Bar */}
            <div className="mt-4">
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>Progress to Level {user.level + 1}</span>
                <span>75%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-[#936cbf] to-[#f38e57] h-2 rounded-full"
                  style={{ width: "75%" }}
                ></div>
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
                onClick={() => (window.location.href = "/settings")}
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

        {/* Tabs */}
        <div className="flex justify-around border-b mt-4">
          {["about", "posts", "photos"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-2 px-4 font-medium ${activeTab === tab ? "text-[#936cbf] border-b-2 border-[#936cbf]" : "text-gray-500"}`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {activeTab === "about" && (
          <>
            {/* About */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm text-gray-600">About</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 text-sm">{user.about}</p>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm text-gray-600">
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-gray-700">
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 text-[#936cbf]" />
                  <span>{user.phone}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-[#f38e57]" />
                  <span>{user.email}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-[#d65d8b]" />
                  <span>{user.location}</span>
                </div>
              </CardContent>
            </Card>

            {/* Family Connections */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm text-gray-600">
                  Family Connections
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-1 text-sm text-gray-700">
                  {user.connections.map((member, index) => (
                    <li key={index}>
                      {member.name} – {member.relation}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Interests */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm text-gray-600">
                  Interests
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {user.interests.map((interest) => (
                    <Badge key={interest} variant="outline" className="text-sm">
                      {interest}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </>
        )}

        {activeTab === "posts" && (
          <Card>
            <CardContent className="text-center text-sm text-gray-500 py-8">
              <p>No posts yet.</p>
            </CardContent>
          </Card>
        )}

        {activeTab === "photos" && (
          <Card>
            <CardContent className="text-center text-sm text-gray-500 py-8">
              <p>No photos uploaded.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
