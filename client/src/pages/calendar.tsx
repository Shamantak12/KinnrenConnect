import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import {
  ArrowLeft,
  Calendar as CalendarIcon,
  Plus,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
} from "date-fns";

interface EventItem {
  id: number;
  title: string;
  eventDate: string;
  description?: string;
  type: string;
  color: string;
}

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);
  const [showEventDialog, setShowEventDialog] = useState(false);
  const [eventTitle, setEventTitle] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventDateInput, setEventDateInput] = useState("");

  const { toast } = useToast();

  const [events, setEvents] = useState<EventItem[]>([
    {
      id: 1,
      title: "Family Dinner",
      eventDate: "2024-06-22",
      type: "event",
      color: "bg-blue-500",
    },
    {
      id: 2,
      title: "Game Night",
      eventDate: "2024-06-25",
      type: "event",
      color: "bg-green-500",
    },
    {
      id: 3,
      title: "Birthday Celebration",
      eventDate: "2024-06-28",
      type: "event",
      color: "bg-purple-500",
    },
  ]);

  const timeCapsules = [
    {
      id: 1,
      title: "Summer Memories 2024",
      openDate: "2024-06-30",
      type: "timeCapsule",
      status: "sealed",
      description: "Photos and videos from our beach vacation",
      color: "bg-orange-500",
    },
    {
      id: 2,
      title: "First Day of School",
      openDate: "2025-09-01",
      type: "timeCapsule",
      status: "sealed",
      description: "Emma's first day memories",
      color: "bg-pink-500",
    },
  ];

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const getEventsForDay = (day: Date) =>
    events.filter((event) => isSameDay(new Date(event.eventDate), day));

  const getTimeCapsulesForDay = (day: Date) =>
    timeCapsules.filter((capsule) =>
      isSameDay(new Date(capsule.openDate), day),
    );

  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));

  const handleSaveEvent = () => {
    if (!eventTitle.trim() || !eventDateInput.trim()) {
      toast({
        title: "Missing fields",
        description: "Please enter both event title and date.",
        variant: "destructive",
      });
      return;
    }

    const newEvent: EventItem = {
      id: events.length + 1,
      title: eventTitle,
      eventDate: eventDateInput,
      description: eventDescription,
      type: "event",
      color: "bg-blue-500",
    };

    setEvents((prev) => [...prev, newEvent]);

    toast({
      title: "Event Added",
      description: `${eventTitle} on ${format(new Date(eventDateInput), "MMM d, yyyy")}`,
    });

    setEventTitle("");
    setEventDescription("");
    setEventDateInput("");
    setShowEventDialog(false);
  };

  return (
    <div className="min-h-screen max-w-md mx-auto bg-gray-50">
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
              <h1 className="text-xl font-bold">Calendar & Time Capsules</h1>
              <p className="text-sm text-white/80">
                Events and memories timeline
              </p>
            </div>
          </div>
          <Button
            className="bg-white/20 hover:bg-white/30 text-white border-white/30"
            size="sm"
            onClick={() => setShowEventDialog(true)}
          >
            <Plus className="h-4 w-4 mr-1" />
            Add
          </Button>
        </div>
      </header>

      <div className="p-4 space-y-6">
        {/* Month Navigation */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <Button variant="ghost" size="sm" onClick={prevMonth}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <CardTitle className="text-lg">
                {format(currentDate, "MMMM yyyy")}
              </CardTitle>
              <Button variant="ghost" size="sm" onClick={nextMonth}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-1 mb-2">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <div
                  key={day}
                  className="text-center text-xs font-medium text-gray-500 py-2"
                >
                  {day}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1">
              {monthDays.map((day) => {
                const dayEvents = getEventsForDay(day);
                const dayCapsules = getTimeCapsulesForDay(day);
                const isToday = isSameDay(day, new Date());
                const hasItems = dayEvents.length > 0 || dayCapsules.length > 0;

                return (
                  <div
                    key={day.toISOString()}
                    onClick={() => setSelectedDay(day)}
                    className={`
                      relative p-2 text-center text-sm border rounded cursor-pointer transition-colors
                      ${isSameMonth(day, currentDate) ? "text-gray-800" : "text-gray-400"}
                      ${isToday ? "bg-gradient-to-r from-[#936cbf] to-[#f38e57] text-white" : "hover:bg-gray-100"}
                      ${hasItems ? "ring-2 ring-[#936cbf]/30" : ""}
                    `}
                  >
                    <div>{format(day, "d")}</div>
                    {dayEvents.length > 0 && (
                      <div className="absolute -top-1 -right-1 w-2 h-2 bg-blue-500 rounded-full"></div>
                    )}
                    {dayCapsules.length > 0 && (
                      <div className="absolute -top-1 -left-1 w-2 h-2 bg-[#f38e57] rounded-full"></div>
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Today's Events */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <CalendarIcon className="h-5 w-5 text-blue-500" />
              <span>Today's Events</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {getEventsForDay(new Date()).length === 0 ? (
              <p className="text-gray-600 text-center py-4">No events today</p>
            ) : (
              <div className="space-y-3">
                {getEventsForDay(new Date()).map((event: any) => (
                  <div
                    key={event.id}
                    className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg"
                  >
                    <div className="w-2 h-8 bg-blue-500 rounded"></div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-800">
                        {event.title}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {format(new Date(event.eventDate), "h:mm a")}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Upcoming Events */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {events.slice(0, 5).map((event: any) => (
              <div
                key={event.id}
                className="flex items-center justify-between p-3 border border-gray-200 rounded-lg"
              >
                <div>
                  <h4 className="font-medium text-gray-800">{event.title}</h4>
                  <p className="text-sm text-gray-600">
                    {format(new Date(event.eventDate), "MMM d, h:mm a")}
                  </p>
                </div>
                <Badge variant="outline">
                  {format(new Date(event.eventDate), "MMM d")}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Add Event Dialog */}
      <Dialog open={showEventDialog} onOpenChange={setShowEventDialog}>
        <DialogContent className="max-w-md mx-auto">
          <DialogHeader>
            <DialogTitle>Add New Event</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="eventTitle">Event Title</Label>
              <Input
                id="eventTitle"
                value={eventTitle}
                onChange={(e) => setEventTitle(e.target.value)}
                placeholder="Enter event name"
              />
            </div>
            <div>
              <Label htmlFor="eventDate">Event Date</Label>
              <Input
                id="eventDate"
                type="date"
                value={eventDateInput}
                onChange={(e) => setEventDateInput(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="eventDescription">Event Description</Label>
              <Textarea
                id="eventDescription"
                value={eventDescription}
                onChange={(e) => setEventDescription(e.target.value)}
                placeholder="Add event details"
              />
            </div>
            <div className="flex justify-end">
              <Button onClick={handleSaveEvent}>Save Event</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
