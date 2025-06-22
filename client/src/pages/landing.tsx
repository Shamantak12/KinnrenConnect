import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Users, Camera, MapPin, Calendar, MessageCircle } from "lucide-react";

export default function Landing() {
  const handleLogin = () => {
    window.location.href = "/api/login";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-teal-50 flex flex-col">
      {/* Header */}
      <header className="px-6 py-4 flex justify-between items-center bg-white/80 backdrop-blur-sm border-b border-gray-200">
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-teal-500 bg-clip-text text-transparent">
            Kinnren
          </h1>
          <p className="text-sm text-gray-600">Revisiting the memories</p>
        </div>
        <Button onClick={handleLogin} className="bg-gradient-to-r from-pink-500 to-teal-500 hover:from-pink-600 hover:to-teal-600">
          Sign In
        </Button>
      </header>

      {/* Hero Section */}
      <main className="flex-1 container mx-auto px-6 py-12 max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">
            Bringing Families
            <span className="block bg-gradient-to-r from-pink-500 to-teal-500 bg-clip-text text-transparent">
              Closer Together
            </span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Share precious moments, create lasting memories, and stay connected with your loved ones 
            through our family-focused social platform.
          </p>
          <Button 
            onClick={handleLogin}
            size="lg"
            className="bg-gradient-to-r from-pink-500 to-teal-500 hover:from-pink-600 hover:to-teal-600 text-white px-8 py-4 rounded-full text-lg animate-bounce-in"
          >
            Get Started Today
          </Button>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          <Card className="hover:shadow-lg transition-shadow animate-fade-in">
            <CardHeader>
              <Heart className="w-12 h-12 text-pink-500 mb-4" />
              <CardTitle>Share Memories</CardTitle>
              <CardDescription>
                Post photos and stories that capture your family's most precious moments
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-lg transition-shadow animate-fade-in">
            <CardHeader>
              <Users className="w-12 h-12 text-teal-500 mb-4" />
              <CardTitle>Family Tree</CardTitle>
              <CardDescription>
                Explore your family heritage and connect with relatives across generations
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-lg transition-shadow animate-fade-in">
            <CardHeader>
              <Camera className="w-12 h-12 text-yellow-500 mb-4" />
              <CardTitle>Story Time</CardTitle>
              <CardDescription>
                Share temporary stories that bring your family closer together every day
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-lg transition-shadow animate-fade-in">
            <CardHeader>
              <MapPin className="w-12 h-12 text-blue-500 mb-4" />
              <CardTitle>Family Map</CardTitle>
              <CardDescription>
                See where your family members are and plan gatherings with ease
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-lg transition-shadow animate-fade-in">
            <CardHeader>
              <Calendar className="w-12 h-12 text-purple-500 mb-4" />
              <CardTitle>Family Events</CardTitle>
              <CardDescription>
                Organize outings, celebrations, and special moments together
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-lg transition-shadow animate-fade-in">
            <CardHeader>
              <MessageCircle className="w-12 h-12 text-green-500 mb-4" />
              <CardTitle>Anonymous Chat</CardTitle>
              <CardDescription>
                Share thoughts and feelings in a safe, supportive family environment
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* CTA Section */}
        <Card className="bg-gradient-to-r from-pink-500 to-teal-500 text-white text-center p-8">
          <CardContent>
            <h3 className="text-3xl font-bold mb-4">Ready to Start Your Family Journey?</h3>
            <p className="text-lg mb-6 opacity-90">
              Join thousands of families who are already creating lasting memories together.
            </p>
            <Button 
              onClick={handleLogin}
              size="lg"
              variant="secondary"
              className="bg-white text-gray-800 hover:bg-gray-100 px-8 py-4 rounded-full text-lg"
            >
              Create Your Family Account
            </Button>
          </CardContent>
        </Card>
      </main>

      {/* Footer */}
      <footer className="bg-white/80 backdrop-blur-sm border-t border-gray-200 py-6 text-center text-gray-600">
        <p>&copy; 2025 Kinnren. Bringing families together through technology.</p>
      </footer>
    </div>
  );
}
