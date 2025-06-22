import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ArrowLeft, Video, Plus, Play, Download, Share2, Film } from "lucide-react";

export default function VideoMontage() {
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [selectedMontage, setSelectedMontage] = useState<any>(null);

  const montages = [
    {
      id: 1,
      title: "Summer 2024 Memories",
      description: "Beach trips and family barbecues",
      duration: "3:45",
      photos: 24,
      status: "completed",
      thumbnail: null,
      createdDate: "2024-08-15"
    },
    {
      id: 2,
      title: "Emma's Birthday",
      description: "Celebrating Emma's 16th birthday",
      duration: "2:30",
      photos: 18,
      status: "processing",
      thumbnail: null,
      createdDate: "2024-09-20"
    },
    {
      id: 3,
      title: "Family Vacation",
      description: "Our trip to the mountains",
      duration: "5:12",
      photos: 35,
      status: "completed",
      thumbnail: null,
      createdDate: "2024-07-10"
    }
  ];

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
          <h1 className="text-xl font-semibold text-gray-800">Video Montage</h1>
        </div>
        
        <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
          <DialogTrigger asChild>
            <Button className="bg-purple-500 hover:bg-purple-600" size="sm">
              <Plus className="h-4 w-4 mr-1" />
              Create
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-sm mx-auto">
            <DialogHeader>
              <DialogTitle>Create Video Montage</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Input placeholder="Montage Title" />
              <Input placeholder="Description" />
              <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg text-center">
                <Video className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Select photos and videos</p>
                <Button variant="outline" size="sm" className="mt-2">
                  Choose Files
                </Button>
              </div>
              <Button className="w-full bg-purple-500 hover:bg-purple-600">
                Create Montage
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </header>

      <div className="p-4 space-y-6">
        {/* Introduction */}
        <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
          <CardContent className="p-4">
            <div className="flex items-start space-x-3">
              <Film className="h-6 w-6 text-purple-600 mt-1" />
              <div>
                <h3 className="font-semibold text-purple-800 mb-1">Create Beautiful Videos</h3>
                <p className="text-sm text-purple-700">
                  Turn your family photos into stunning video montages with music and transitions.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Video Montages */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Video className="h-5 w-5 text-purple-500" />
              <span>Your Montages</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {montages.map((montage) => (
              <Card key={montage.id} className="border border-gray-200">
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Video className="h-8 w-8 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800 mb-1">{montage.title}</h3>
                      <p className="text-sm text-gray-600 mb-2">{montage.description}</p>
                      <div className="flex items-center space-x-4 text-xs text-gray-500">
                        <span>{montage.duration}</span>
                        <span>{montage.photos} photos</span>
                        <span className={`px-2 py-1 rounded-full ${
                          montage.status === 'completed' 
                            ? 'bg-green-100 text-green-600' 
                            : 'bg-yellow-100 text-yellow-600'
                        }`}>
                          {montage.status}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col space-y-1">
                      {montage.status === 'completed' ? (
                        <>
                          <Button size="sm" variant="outline">
                            <Play className="h-3 w-3 mr-1" />
                            Play
                          </Button>
                          <Button size="sm" variant="outline">
                            <Download className="h-3 w-3 mr-1" />
                            Save
                          </Button>
                        </>
                      ) : (
                        <div className="text-center">
                          <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-1"></div>
                          <span className="text-xs text-gray-500">Processing</span>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </CardContent>
        </Card>

        {/* Features */}
        <Card>
          <CardHeader>
            <CardTitle>Montage Features</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { title: "Auto Transitions", desc: "Smooth transitions between photos", icon: "🎬" },
              { title: "Music Library", desc: "Choose from family-friendly music", icon: "🎵" },
              { title: "Custom Duration", desc: "Set your preferred video length", icon: "⏱️" },
              { title: "HD Quality", desc: "Export in high definition", icon: "📺" },
              { title: "Easy Sharing", desc: "Share with family or download", icon: "📤" },
              { title: "Template Styles", desc: "Multiple video styles available", icon: "🎨" }
            ].map((feature, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="text-2xl">{feature.icon}</div>
                <div>
                  <h4 className="font-medium text-gray-800">{feature.title}</h4>
                  <p className="text-sm text-gray-600">{feature.desc}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Statistics */}
        <Card>
          <CardHeader>
            <CardTitle>Your Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-purple-500">{montages.length}</div>
                <div className="text-sm text-gray-600">Montages</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-500">
                  {montages.reduce((acc, m) => acc + m.photos, 0)}
                </div>
                <div className="text-sm text-gray-600">Photos Used</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-500">
                  {montages.filter(m => m.status === 'completed').length}
                </div>
                <div className="text-sm text-gray-600">Completed</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tips */}
        <Card className="bg-purple-50 border-purple-200">
          <CardContent className="p-4">
            <h4 className="font-semibold text-purple-800 mb-2">Pro Tips</h4>
            <ul className="text-sm text-purple-700 space-y-1">
              <li>• Use 15-30 photos for best results</li>
              <li>• Mix portraits and landscape photos</li>
              <li>• Choose photos from the same event or timeframe</li>
              <li>• Processing time depends on video length</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}