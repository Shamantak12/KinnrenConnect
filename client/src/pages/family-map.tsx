import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, MapPin, Users, Navigation, Search, UserPlus, MessageCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function FamilyMap() {
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();

  const familiesData = [
    {
      id: 1,
      name: "Johnson Family",
      location: "New York, USA",
      members: 4,
      avatar: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=150&h=150&fit=crop",
      distance: "2.5 km",
      interests: ["Travel", "Cooking", "Sports"]
    },
    {
      id: 2,
      name: "Smith Family", 
      location: "Los Angeles, USA",
      members: 3,
      avatar: "https://images.unsplash.com/photo-1609220136736-443140cffec6?w=150&h=150&fit=crop",
      distance: "5.8 km",
      interests: ["Music", "Art", "Gaming"]
    },
    {
      id: 3,
      name: "Wilson Family",
      location: "Chicago, USA", 
      members: 5,
      avatar: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=150&h=150&fit=crop",
      distance: "8.2 km",
      interests: ["Reading", "Nature", "Photography"]
    }
  ];

  const filteredFamilies = familiesData.filter(family =>
    family.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    family.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    family.interests.some(interest => interest.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleConnect = (familyName: string) => {
    toast({
      title: "Connection Request Sent",
      description: `Your request to connect with ${familyName} has been sent!`,
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
            <h1 className="text-xl font-bold">Family Map & Search</h1>
            <p className="text-sm text-white/80">Find and connect with families</p>
          </div>
        </div>
      </header>

      {/* Search Section */}
      <div className="px-4 py-3 bg-white border-b border-gray-100">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search families, locations, or interests..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 border-[#936cbf]/20 focus:border-[#936cbf] focus:ring-[#936cbf]/20"
          />
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Map Placeholder */}
        <Card className="h-64 bg-gradient-to-br from-[#936cbf]/20 to-[#f38e57]/20 flex items-center justify-center">
          <div className="text-center">
            <MapPin className="h-12 w-12 text-[#936cbf] mx-auto mb-2" />
            <p className="text-gray-600">Interactive family map coming soon</p>
          </div>
        </Card>

        {/* Search Results */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">
            {searchQuery ? `Search Results (${filteredFamilies.length})` : 'Nearby Families'}
          </h2>
          
          {filteredFamilies.length === 0 ? (
            <Card className="p-6 text-center">
              <Users className="h-12 w-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-600">No families found matching your search</p>
            </Card>
          ) : (
            filteredFamilies.map((family) => (
              <Card key={family.id} className="border-l-4 border-l-[#936cbf]">
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <img
                      src={family.avatar}
                      alt={family.name}
                      className="w-12 h-12 rounded-full"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-gray-900">{family.name}</h3>
                        <Badge variant="outline" className="text-[#936cbf] border-[#936cbf]">
                          {family.distance}
                        </Badge>
                      </div>
                      <div className="flex items-center text-sm text-gray-600 mb-2">
                        <MapPin className="h-4 w-4 mr-1" />
                        {family.location}
                      </div>
                      <div className="flex items-center text-sm text-gray-600 mb-3">
                        <Users className="h-4 w-4 mr-1" />
                        {family.members} members
                      </div>
                      <div className="flex flex-wrap gap-1 mb-3">
                        {family.interests.map((interest, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {interest}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          onClick={() => handleConnect(family.name)}
                          className="bg-[#936cbf] hover:bg-[#7a5ca8] text-white"
                        >
                          <UserPlus className="h-3 w-3 mr-1" />
                          Connect
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-[#f38e57] text-[#f38e57] hover:bg-[#f38e57] hover:text-white"
                        >
                          <MessageCircle className="h-3 w-3 mr-1" />
                          Message
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Current Family Members */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-[#d65d8b]" />
              <span>Your Family Members</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="font-medium">Sarah Johnson</span>
              </div>
              <span className="text-sm text-gray-500">Home • 2 min ago</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="font-medium">Mike Johnson</span>
              </div>
              <span className="text-sm text-gray-500">Work • 15 min ago</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span className="font-medium">Emma Johnson</span>
              </div>
              <span className="text-sm text-gray-500">School • 1 hour ago</span>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start" variant="outline">
              <Navigation className="h-4 w-4 mr-2" />
              Share My Location
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <MapPin className="h-4 w-4 mr-2" />
              Find Family Members
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}