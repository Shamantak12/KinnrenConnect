import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, MapPin, Users, Navigation } from "lucide-react";

export default function FamilyMap() {
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
        <h1 className="text-xl font-semibold text-gray-800">Family Map</h1>
      </header>

      <div className="p-4 space-y-6">
        {/* Map Placeholder */}
        <Card className="h-64 bg-gradient-to-br from-blue-100 to-teal-100 flex items-center justify-center">
          <div className="text-center">
            <MapPin className="h-12 w-12 text-blue-500 mx-auto mb-2" />
            <p className="text-gray-600">Interactive family map coming soon</p>
          </div>
        </Card>

        {/* Family Members Locations */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-pink-500" />
              <span>Family Members</span>
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