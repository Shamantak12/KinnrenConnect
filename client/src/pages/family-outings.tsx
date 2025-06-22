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
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ArrowLeft, Mountain, Calendar, MapPin, Plus, Users } from "lucide-react";
import { format } from "date-fns";

export default function FamilyOutings() {
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [location, setLocation] = useState("");
  
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch events
  const { data: events = [] } = useQuery({
    queryKey: ["/api/events"],
    enabled: !!user?.familyId,
    retry: false,
  });

  // Create event mutation
  const createEvent = useMutation({
    mutationFn: async () => {
      await apiRequest("POST", "/api/events", {
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

  const handleCreate = () => {
    if (!title.trim() || !eventDate) return;
    createEvent.mutate();
  };

  return (
    <div className="min-h-screen max-w-md mx-auto bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => window.history.back()}
            className="p-2 hover:bg-gray-100 rounded-lg mr-3"
          >
            <ArrowLeft className="h-6 w-6 text-gray-700" />
          </Button>
          <h1 className="text-xl font-semibold text-gray-800">Family Outings</h1>
        </div>
        
        <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
          <DialogTrigger asChild>
            <Button className="bg-green-500 hover:bg-green-600" size="sm">
              <Plus className="h-4 w-4 mr-1" />
              New
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-sm mx-auto">
            <DialogHeader>
              <DialogTitle>Plan Family Outing</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Event Title</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Beach Day"
                />
              </div>
              <div>
                <Label htmlFor="date">Date & Time</Label>
                <Input
                  id="date"
                  type="datetime-local"
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
                  placeholder="Sunny Beach Park"
                />
              </div>
              <div>
                <Label htmlFor="description">Description (Optional)</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Let's spend the day at the beach..."
                />
              </div>
              <Button
                onClick={handleCreate}
                disabled={!title.trim() || !eventDate || createEvent.isPending}
                className="w-full bg-green-500 hover:bg-green-600"
              >
                {createEvent.isPending ? "Creating..." : "Create Outing"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </header>

      <div className="p-4 space-y-6">
        {/* Upcoming Events */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-green-500" />
              <span>Upcoming Outings</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {events.length === 0 ? (
              <div className="text-center py-6">
                <Mountain className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-2">No outings planned yet</p>
                <p className="text-sm text-gray-500">Create your first family adventure!</p>
              </div>
            ) : (
              events.map((event: any) => (
                <Card key={event.id} className="border border-gray-200">
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                        <Calendar className="h-6 w-6 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800 mb-1">{event.title}</h3>
                        {event.description && (
                          <p className="text-sm text-gray-600 mb-2">{event.description}</p>
                        )}
                        <div className="space-y-1">
                          <div className="flex items-center text-sm text-gray-500">
                            <Calendar className="h-3 w-3 mr-1" />
                            <span>{format(new Date(event.eventDate), "MMM d, yyyy 'at' h:mm a")}</span>
                          </div>
                          {event.location && (
                            <div className="flex items-center text-sm text-gray-500">
                              <MapPin className="h-3 w-3 mr-1" />
                              <span>{event.location}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </CardContent>
        </Card>

        {/* Quick Ideas */}
        <Card>
          <CardHeader>
            <CardTitle>Outing Ideas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { icon: "🏖️", title: "Beach Day", desc: "Sun, sand, and family fun" },
              { icon: "🥾", title: "Nature Hike", desc: "Explore trails together" },
              { icon: "🎭", title: "Museum Visit", desc: "Learn something new" },
              { icon: "🍕", title: "Picnic", desc: "Outdoor dining experience" },
              { icon: "🎨", title: "Art Workshop", desc: "Get creative together" },
              { icon: "🏛️", title: "City Tour", desc: "Discover local attractions" }
            ].map((idea, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="text-2xl">{idea.icon}</div>
                <div>
                  <h4 className="font-medium text-gray-800">{idea.title}</h4>
                  <p className="text-sm text-gray-600">{idea.desc}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Statistics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-green-500" />
              <span>Family Adventures</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-green-500">{events.length}</div>
                <div className="text-sm text-gray-600">Planned</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-500">8</div>
                <div className="text-sm text-gray-600">Completed</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}