import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Mountain, Calendar, MapPin, Plus, Users, Church, TreePine, UtensilsCrossed, Car, Star, Clock, DollarSign, Phone } from "lucide-react";
import { format } from "date-fns";

export default function FamilyOutings() {
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [activeTab, setActiveTab] = useState("events");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [location, setLocation] = useState("");
  
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Mock user for demo
  const user = {
    id: "1",
    familyId: "family-1"
  };

  // Fetch events
  const { data: events = [] } = useQuery({
    queryKey: ["/api/events"],
    retry: false,
  });

  // Create event mutation
  const createEvent = useMutation({
    mutationFn: async () => {
      await apiRequest("/api/events", "POST", {
        title,
        description,
        eventDate: new Date(eventDate).toISOString(),
        location,
      });
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Family outing created successfully!",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/events"] });
      setShowCreateDialog(false);
      setTitle("");
      setDescription("");
      setEventDate("");
      setLocation("");
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to create family outing",
        variant: "destructive",
      });
    },
  });

  // Holy Places Data
  const holyPlaces = [
    {
      id: 1,
      name: "Sacred Heart Cathedral",
      type: "Church",
      location: "Downtown District",
      rating: 4.8,
      distance: "2.5 km",
      services: ["Sunday Mass", "Wedding Ceremonies", "Baptisms"],
      image: "https://images.unsplash.com/photo-1520637836862-4d197d17c55a?w=400&h=300&fit=crop"
    },
    {
      id: 2,
      name: "St. Mary's Temple",
      type: "Temple",
      location: "Heritage District",
      rating: 4.9,
      distance: "3.2 km",
      services: ["Daily Prayers", "Religious Festivals", "Meditation"],
      image: "https://images.unsplash.com/photo-1564729707793-1ac9a0c3ce87?w=400&h=300&fit=crop"
    },
    {
      id: 3,
      name: "Peace Monastery",
      type: "Monastery",
      location: "Hillside Area",
      rating: 4.7,
      distance: "8.1 km",
      services: ["Retreat Programs", "Spiritual Guidance", "Silent Prayer"],
      image: "https://images.unsplash.com/photo-1555854877-bab0e5480d34?w=400&h=300&fit=crop"
    }
  ];

  // Picnic Spots Data
  const picnicSpots = [
    {
      id: 1,
      name: "Riverside Park",
      type: "Lakeside",
      location: "North Valley",
      rating: 4.6,
      facilities: ["BBQ Grills", "Playground", "Restrooms", "Parking"],
      price: "Free",
      image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop"
    },
    {
      id: 2,
      name: "Mountain View Gardens",
      type: "Botanical",
      location: "East Hills",
      rating: 4.8,
      facilities: ["Picnic Tables", "Walking Trails", "Gardens", "Pavilion"],
      price: "$5 per person",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop"
    },
    {
      id: 3,
      name: "Cedar Creek Forest",
      type: "Nature Reserve",
      location: "West Woods",
      rating: 4.5,
      facilities: ["Hiking Trails", "Wildlife Viewing", "Fire Pits", "Camping"],
      price: "$10 per vehicle",
      image: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=400&h=300&fit=crop"
    }
  ];

  // Restaurants Data
  const restaurants = [
    {
      id: 1,
      name: "Family Feast",
      cuisine: "American",
      rating: 4.4,
      priceRange: "$$",
      location: "Central Plaza",
      specialties: ["Family Platters", "Kids Menu", "Group Dining"],
      phone: "(555) 123-4567",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop"
    },
    {
      id: 2,
      name: "Garden Bistro",
      cuisine: "Mediterranean",
      rating: 4.7,
      priceRange: "$$$",
      location: "Garden District",
      specialties: ["Outdoor Seating", "Fresh Ingredients", "Wine Selection"],
      phone: "(555) 234-5678",
      image: "https://images.unsplash.com/photo-1552566090-a8c47de1de7a?w=400&h=300&fit=crop"
    },
    {
      id: 3,
      name: "Cozy Corner Cafe",
      cuisine: "International",
      rating: 4.3,
      priceRange: "$",
      location: "Old Town",
      specialties: ["Coffee & Pastries", "Brunch", "Casual Dining"],
      phone: "(555) 345-6789",
      image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400&h=300&fit=crop"
    }
  ];

  // Transportation Options
  const transportationOptions = [
    {
      id: 1,
      type: "Family Van Rental",
      provider: "CityRent",
      capacity: "8 passengers",
      price: "$89/day",
      features: ["GPS Navigation", "Child Seats Available", "Full Insurance"],
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop"
    },
    {
      id: 2,
      type: "Private Bus Charter",
      provider: "GroupTravel Co",
      capacity: "25 passengers",
      price: "$250/day",
      features: ["Professional Driver", "AC/Heating", "Entertainment System"],
      image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=400&h=300&fit=crop"
    },
    {
      id: 3,
      type: "Ride Share Family",
      provider: "FamShare",
      capacity: "6 passengers",
      price: "$25-40/trip",
      features: ["Multiple Stops", "Car Seats", "Family-Verified Drivers"],
      image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop"
    }
  ];

  const handleBooking = (type: string, name: string) => {
    toast({
      title: "Booking Request",
      description: `Booking request sent for ${name}. We'll contact you shortly!`,
    });
  };

  return (
    <div className="min-h-screen max-w-md mx-auto bg-white">
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
              <h1 className="text-xl font-bold">Family Outings</h1>
              <p className="text-sm text-white/80">Plan your next adventure</p>
            </div>
          </div>
          <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
            <DialogTrigger asChild>
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/20 p-2">
                <Plus className="h-6 w-6" />
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-sm mx-auto">
              <DialogHeader>
                <DialogTitle>Create Family Outing</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Event Title</Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Family picnic at the park"
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Details about the outing..."
                  />
                </div>
                <div>
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Central Park"
                  />
                </div>
                <Button
                  onClick={() => createEvent.mutate()}
                  disabled={createEvent.isPending}
                  className="w-full bg-[#936cbf] hover:bg-[#7a5ca8]"
                >
                  {createEvent.isPending ? "Creating..." : "Create Outing"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </header>

      {/* Tabs Navigation */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5 sticky top-20 z-30 bg-white border-b">
          <TabsTrigger value="events" className="text-xs">Events</TabsTrigger>
          <TabsTrigger value="holy" className="text-xs">Holy</TabsTrigger>
          <TabsTrigger value="picnic" className="text-xs">Picnic</TabsTrigger>
          <TabsTrigger value="dining" className="text-xs">Dining</TabsTrigger>
          <TabsTrigger value="transport" className="text-xs">Travel</TabsTrigger>
        </TabsList>

        {/* Events Tab */}
        <TabsContent value="events" className="p-4 space-y-4">
          {(events as any[]).length === 0 ? (
            <div className="text-center py-12">
              <Mountain className="h-16 w-16 text-[#936cbf] mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No Family Outings Yet</h3>
              <p className="text-gray-600 mb-6">Create your first family adventure and make memories together!</p>
            </div>
          ) : (
            (events as any[]).map((event: any) => (
              <Card key={event.id} className="border-l-4 border-l-[#936cbf]">
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg text-gray-900">{event.title}</CardTitle>
                      <div className="flex items-center text-sm text-gray-600 mt-1">
                        <Calendar className="h-4 w-4 mr-1" />
                        {format(new Date(event.date), "MMM dd, yyyy")}
                      </div>
                    </div>
                    <Badge className="bg-[#f38e57] text-white">
                      <Users className="h-3 w-3 mr-1" />
                      Family
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-3">{event.description}</p>
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="h-4 w-4 mr-1" />
                    {event.location}
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>

        {/* Holy Places Tab */}
        <TabsContent value="holy" className="p-4 space-y-4">
          <div className="text-center mb-6">
            <Church className="h-12 w-12 text-[#936cbf] mx-auto mb-2" />
            <h2 className="text-xl font-bold text-gray-900">Sacred Places</h2>
            <p className="text-gray-600">Spiritual destinations for family visits</p>
          </div>
          
          {holyPlaces.map((place) => (
            <Card key={place.id} className="overflow-hidden">
              <div className="relative">
                <img src={place.image} alt={place.name} className="w-full h-32 object-cover" />
                <Badge className="absolute top-2 right-2 bg-[#936cbf] text-white">
                  {place.type}
                </Badge>
              </div>
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-gray-900">{place.name}</h3>
                  <div className="flex items-center text-yellow-500">
                    <Star className="h-4 w-4 fill-current" />
                    <span className="text-sm ml-1">{place.rating}</span>
                  </div>
                </div>
                <div className="flex items-center text-sm text-gray-600 mb-2">
                  <MapPin className="h-4 w-4 mr-1" />
                  {place.location} • {place.distance}
                </div>
                <div className="flex flex-wrap gap-1 mb-3">
                  {place.services.map((service, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {service}
                    </Badge>
                  ))}
                </div>
                <Button 
                  className="w-full bg-[#936cbf] hover:bg-[#7a5ca8]"
                  onClick={() => handleBooking("holy place", place.name)}
                >
                  Get Directions
                </Button>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* Picnic Spots Tab */}
        <TabsContent value="picnic" className="p-4 space-y-4">
          <div className="text-center mb-6">
            <TreePine className="h-12 w-12 text-[#f38e57] mx-auto mb-2" />
            <h2 className="text-xl font-bold text-gray-900">Picnic Spots</h2>
            <p className="text-gray-600">Perfect locations for family gatherings</p>
          </div>
          
          {picnicSpots.map((spot) => (
            <Card key={spot.id} className="overflow-hidden">
              <div className="relative">
                <img src={spot.image} alt={spot.name} className="w-full h-32 object-cover" />
                <Badge className="absolute top-2 right-2 bg-[#f38e57] text-white">
                  {spot.type}
                </Badge>
              </div>
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-gray-900">{spot.name}</h3>
                  <div className="flex items-center text-yellow-500">
                    <Star className="h-4 w-4 fill-current" />
                    <span className="text-sm ml-1">{spot.rating}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    {spot.location}
                  </div>
                  <div className="flex items-center text-[#936cbf] font-medium">
                    <DollarSign className="h-4 w-4 mr-1" />
                    {spot.price}
                  </div>
                </div>
                <div className="flex flex-wrap gap-1 mb-3">
                  {spot.facilities.map((facility, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {facility}
                    </Badge>
                  ))}
                </div>
                <Button 
                  className="w-full bg-[#f38e57] hover:bg-[#e07b48]"
                  onClick={() => handleBooking("picnic spot", spot.name)}
                >
                  Reserve Spot
                </Button>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* Dining Tab */}
        <TabsContent value="dining" className="p-4 space-y-4">
          <div className="text-center mb-6">
            <UtensilsCrossed className="h-12 w-12 text-[#d65d8b] mx-auto mb-2" />
            <h2 className="text-xl font-bold text-gray-900">Family Restaurants</h2>
            <p className="text-gray-600">Great dining experiences for the whole family</p>
          </div>
          
          {restaurants.map((restaurant) => (
            <Card key={restaurant.id} className="overflow-hidden">
              <div className="relative">
                <img src={restaurant.image} alt={restaurant.name} className="w-full h-32 object-cover" />
                <Badge className="absolute top-2 right-2 bg-[#d65d8b] text-white">
                  {restaurant.cuisine}
                </Badge>
              </div>
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-gray-900">{restaurant.name}</h3>
                  <div className="flex items-center text-yellow-500">
                    <Star className="h-4 w-4 fill-current" />
                    <span className="text-sm ml-1">{restaurant.rating}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    {restaurant.location}
                  </div>
                  <div className="flex items-center text-[#936cbf] font-medium">
                    <DollarSign className="h-4 w-4 mr-1" />
                    {restaurant.priceRange}
                  </div>
                </div>
                <div className="flex flex-wrap gap-1 mb-3">
                  {restaurant.specialties.map((specialty, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {specialty}
                    </Badge>
                  ))}
                </div>
                <div className="flex items-center text-sm text-gray-600 mb-3">
                  <Phone className="h-4 w-4 mr-1" />
                  {restaurant.phone}
                </div>
                <Button 
                  className="w-full bg-[#d65d8b] hover:bg-[#c54a7a]"
                  onClick={() => handleBooking("restaurant", restaurant.name)}
                >
                  Book Table
                </Button>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* Transportation Tab */}
        <TabsContent value="transport" className="p-4 space-y-4">
          <div className="text-center mb-6">
            <Car className="h-12 w-12 text-[#936cbf] mx-auto mb-2" />
            <h2 className="text-xl font-bold text-gray-900">Transportation</h2>
            <p className="text-gray-600">Get your family there safely and comfortably</p>
          </div>
          
          {transportationOptions.map((option) => (
            <Card key={option.id} className="overflow-hidden">
              <div className="relative">
                <img src={option.image} alt={option.type} className="w-full h-32 object-cover" />
                <Badge className="absolute top-2 right-2 bg-[#936cbf] text-white">
                  {option.capacity}
                </Badge>
              </div>
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-gray-900">{option.type}</h3>
                  <div className="flex items-center text-[#f38e57] font-bold">
                    <DollarSign className="h-4 w-4 mr-1" />
                    {option.price}
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-2">by {option.provider}</p>
                <div className="flex flex-wrap gap-1 mb-3">
                  {option.features.map((feature, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                </div>
                <Button 
                  className="w-full bg-[#936cbf] hover:bg-[#7a5ca8]"
                  onClick={() => handleBooking("transportation", option.type)}
                >
                  Book Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}