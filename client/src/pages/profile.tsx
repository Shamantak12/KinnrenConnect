import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Users, Settings, LogOut, Trophy, Star, Award, Target, Crown, Gift } from "lucide-react";

export default function Profile() {
  const [familyName, setFamilyName] = useState("");
  const [familyDescription, setFamilyDescription] = useState("");
  const [familyIdToJoin, setFamilyIdToJoin] = useState("");
  
  // Mock user for demo
  const user = {
    id: "1",
    firstName: "John",
    lastName: "Doe",
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
  
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch family members if user has a family
  const { data: familyMembers = [] } = useQuery({
    queryKey: ["/api/families", user?.familyId, "members"],
    enabled: !!user?.familyId,
    retry: false,
  });

  const createFamily = useMutation({
    mutationFn: async () => {
      const response = await apiRequest("POST", "/api/families", {
        name: familyName,
        description: familyDescription,
      });
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Family created successfully!",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/auth/user"] });
      setFamilyName("");
      setFamilyDescription("");
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to create family",
        variant: "destructive",
      });
    },
  });

  const joinFamily = useMutation({
    mutationFn: async () => {
      await apiRequest("POST", `/api/families/${familyIdToJoin}/join`);
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Joined family successfully!",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/auth/user"] });
      setFamilyIdToJoin("");
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to join family",
        variant: "destructive",
      });
    },
  });

  const handleLogout = () => {
    window.location.href = "/api/logout";
  };

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
        
        <h1 className="text-xl font-semibold text-gray-800">Profile</h1>
      </header>

      <div className="p-4 space-y-6">
        {/* User Profile Card */}
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-3">
              <img
                src={user?.profileImageUrl || `https://ui-avatars.com/api/?name=${user?.firstName}+${user?.lastName}&background=ff6b6b&color=fff`}
                alt="Profile"
                className="w-16 h-16 rounded-full object-cover border-3 border-pink-500"
              />
              <div>
                <h2 className="font-semibold text-gray-800">
                  {user?.firstName} {user?.lastName}
                </h2>
                <p className="text-sm text-gray-500">{user?.email}</p>
              </div>
            </div>
          </CardHeader>
        </Card>

        {!user?.familyId ? (
          <>
            {/* Create Family */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-pink-500" />
                  <span>Create Your Family</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="familyName">Family Name</Label>
                  <Input
                    id="familyName"
                    value={familyName}
                    onChange={(e) => setFamilyName(e.target.value)}
                    placeholder="The Smith Family"
                  />
                </div>
                <div>
                  <Label htmlFor="familyDescription">Description (Optional)</Label>
                  <Textarea
                    id="familyDescription"
                    value={familyDescription}
                    onChange={(e) => setFamilyDescription(e.target.value)}
                    placeholder="A loving family that enjoys spending time together..."
                  />
                </div>
                <Button
                  onClick={() => createFamily.mutate()}
                  disabled={!familyName.trim() || createFamily.isPending}
                  className="w-full bg-gradient-to-r from-pink-500 to-teal-500 hover:from-pink-600 hover:to-teal-600"
                >
                  {createFamily.isPending ? "Creating..." : "Create Family"}
                </Button>
              </CardContent>
            </Card>

            {/* Join Family */}
            <Card>
              <CardHeader>
                <CardTitle>Join Existing Family</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="familyId">Family ID</Label>
                  <Input
                    id="familyId"
                    value={familyIdToJoin}
                    onChange={(e) => setFamilyIdToJoin(e.target.value)}
                    placeholder="family_123456789"
                  />
                </div>
                <Button
                  onClick={() => joinFamily.mutate()}
                  disabled={!familyIdToJoin.trim() || joinFamily.isPending}
                  variant="outline"
                  className="w-full"
                >
                  {joinFamily.isPending ? "Joining..." : "Join Family"}
                </Button>
              </CardContent>
            </Card>
          </>
        ) : (
          <>
            {/* Family Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-pink-500" />
                  <span>Your Family</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-2">Family ID: {user.familyId}</p>
                <p className="text-lg font-semibold mb-4">{familyMembers.length} Members</p>
                
                <div className="space-y-2">
                  {familyMembers.map((member: any) => (
                    <div key={member.id} className="flex items-center space-x-3 p-2 bg-gray-50 rounded-lg">
                      <img
                        src={member.profileImageUrl || `https://ui-avatars.com/api/?name=${member.firstName}+${member.lastName}&background=4ecdc4&color=fff`}
                        alt={`${member.firstName} ${member.lastName}`}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-medium text-gray-800">
                          {member.firstName} {member.lastName}
                        </p>
                        <p className="text-sm text-gray-500">{member.email}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </>
        )}

        {/* Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Settings className="h-5 w-5 text-gray-600" />
              <span>Settings</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Button
              onClick={handleLogout}
              variant="destructive"
              className="w-full flex items-center space-x-2"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
