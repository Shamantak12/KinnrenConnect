import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar as CalendarIcon, Plus, ChevronLeft, ChevronRight } from "lucide-react";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths } from "date-fns";

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const { user } = useAuth();

  // Fetch events
  const { data: events = [] } = useQuery({
    queryKey: ["/api/events"],
    enabled: !!user?.familyId,
    retry: false,
  });

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const getEventsForDay = (day: Date) => {
    return events.filter((event: any) => 
      isSameDay(new Date(event.eventDate), day)
    );
  };

  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));

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
          <h1 className="text-xl font-semibold text-gray-800">Calendar</h1>
        </div>
        <Button className="bg-blue-500 hover:bg-blue-600" size="sm">
          <Plus className="h-4 w-4 mr-1" />
          Event
        </Button>
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
            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="text-center text-xs font-medium text-gray-500 py-2">
                  {day}
                </div>
              ))}
            </div>
            
            <div className="grid grid-cols-7 gap-1">
              {monthDays.map(day => {
                const dayEvents = getEventsForDay(day);
                const isToday = isSameDay(day, new Date());
                
                return (
                  <div
                    key={day.toISOString()}
                    className={`
                      relative p-2 text-center text-sm border rounded cursor-pointer transition-colors
                      ${isSameMonth(day, currentDate) ? 'text-gray-800' : 'text-gray-400'}
                      ${isToday ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'}
                      ${dayEvents.length > 0 ? 'ring-2 ring-pink-200' : ''}
                    `}
                  >
                    <div>{format(day, 'd')}</div>
                    {dayEvents.length > 0 && (
                      <div className="absolute -top-1 -right-1 w-2 h-2 bg-pink-500 rounded-full"></div>
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
                  <div key={event.id} className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                    <div className="w-2 h-8 bg-blue-500 rounded"></div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-800">{event.title}</h4>
                      <p className="text-sm text-gray-600">
                        {format(new Date(event.eventDate), "h:mm a")}
                      </p>
                      {event.location && (
                        <p className="text-xs text-gray-500">{event.location}</p>
                      )}
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
              <div key={event.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
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

        {/* Quick Stats */}
        <Card>
          <CardHeader>
            <CardTitle>This Month</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-blue-500">{events.length}</div>
                <div className="text-sm text-gray-600">Events</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-500">5</div>
                <div className="text-sm text-gray-600">Birthdays</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-500">2</div>
                <div className="text-sm text-gray-600">Holidays</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}