import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ArrowLeft, Landmark, Plus, MapPin, Calendar, Book, Award } from "lucide-react";

export default function Heritage() {
  const [showAddDialog, setShowAddDialog] = useState(false);

  const heritageItems = [
    {
      id: 1,
      type: "tradition",
      title: "Christmas Morning Pancakes",
      description: "Every Christmas morning, Grandma Mary makes her special pancakes with secret ingredients passed down from her mother.",
      origin: "Scotland, 1920s",
      keeper: "Mary Johnson",
      year: "1948"
    },
    {
      id: 2,
      type: "recipe",
      title: "Family Apple Pie Recipe",
      description: "The original recipe brought from Ireland by Great-Grandfather Patrick. Still made the same way for 100 years.",
      origin: "County Cork, Ireland",
      keeper: "Sarah Johnson",
      year: "1895"
    },
    {
      id: 3,
      type: "story",
      title: "The Great Adventure",
      description: "How Robert and Mary met during a community dance in 1943, and their courtship during wartime.",
      origin: "Local folklore",
      keeper: "Robert Johnson",
      year: "1943"
    },
    {
      id: 4,
      type: "artifact",
      title: "Wedding Ring Collection",
      description: "Three generations of wedding rings, each with its own love story and significance to our family.",
      origin: "Family heirlooms",
      keeper: "Family vault",
      year: "1945-1995"
    }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "tradition": return "🎄";
      case "recipe": return "🥧";
      case "story": return "📖";
      case "artifact": return "💍";
      default: return "📜";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "tradition": return "bg-green-100 text-green-800";
      case "recipe": return "bg-orange-100 text-orange-800";
      case "story": return "bg-blue-100 text-blue-800";
      case "artifact": return "bg-purple-100 text-purple-800";
      default: return "bg-gray-100 text-gray-800";
    }
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
          <h1 className="text-xl font-semibold text-gray-800">Heritage</h1>
        </div>
        
        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogTrigger asChild>
            <Button className="bg-amber-500 hover:bg-amber-600" size="sm">
              <Plus className="h-4 w-4 mr-1" />
              Add
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-sm mx-auto">
            <DialogHeader>
              <DialogTitle>Add Heritage Item</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Input placeholder="Title" />
              <Textarea placeholder="Description and story..." />
              <Input placeholder="Origin (location/time)" />
              <Input placeholder="Current keeper" />
              <Button className="w-full bg-amber-500 hover:bg-amber-600">
                Add to Heritage
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </header>

      <div className="p-4 space-y-6">
        {/* Introduction */}
        <Card className="bg-gradient-to-br from-amber-50 to-yellow-50 border-amber-200">
          <CardContent className="p-4">
            <div className="flex items-start space-x-3">
              <Landmark className="h-6 w-6 text-amber-600 mt-1" />
              <div>
                <h3 className="font-semibold text-amber-800 mb-1">Family Heritage</h3>
                <p className="text-sm text-amber-700">
                  Preserve and share the traditions, recipes, stories, and artifacts that define your family's legacy.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Heritage Collection */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Book className="h-5 w-5 text-amber-500" />
              <span>Johnson Family Heritage</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {heritageItems.map((item) => (
              <Card key={item.id} className="border border-gray-200">
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <div className="text-3xl">{getTypeIcon(item.type)}</div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="font-semibold text-gray-800">{item.title}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(item.type)}`}>
                          {item.type}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{item.description}</p>
                      <div className="space-y-1 text-xs text-gray-500">
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-3 w-3" />
                          <span>{item.origin}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-3 w-3" />
                          <span>Since {item.year}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Award className="h-3 w-3" />
                          <span>Keeper: {item.keeper}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </CardContent>
        </Card>

        {/* Heritage Categories */}
        <Card>
          <CardHeader>
            <CardTitle>Heritage Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <div className="text-2xl mb-1">🎄</div>
                <div className="font-medium text-green-800">Traditions</div>
                <div className="text-sm text-green-600">1 item</div>
              </div>
              <div className="text-center p-3 bg-orange-50 rounded-lg">
                <div className="text-2xl mb-1">🥧</div>
                <div className="font-medium text-orange-800">Recipes</div>
                <div className="text-sm text-orange-600">1 item</div>
              </div>
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <div className="text-2xl mb-1">📖</div>
                <div className="font-medium text-blue-800">Stories</div>
                <div className="text-sm text-blue-600">1 item</div>
              </div>
              <div className="text-center p-3 bg-purple-50 rounded-lg">
                <div className="text-2xl mb-1">💍</div>
                <div className="font-medium text-purple-800">Artifacts</div>
                <div className="text-sm text-purple-600">1 item</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Family Origins */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MapPin className="h-5 w-5 text-blue-500" />
              <span>Family Origins</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="p-3 bg-green-50 rounded-lg">
              <h4 className="font-medium text-green-800">Ireland</h4>
              <p className="text-sm text-green-600">County Cork - Patrick's lineage</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <h4 className="font-medium text-blue-800">Scotland</h4>
              <p className="text-sm text-blue-600">Highlands - Mary's ancestry</p>
            </div>
          </CardContent>
        </Card>

        {/* Statistics */}
        <Card>
          <CardHeader>
            <CardTitle>Heritage Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-amber-500">{heritageItems.length}</div>
                <div className="text-sm text-gray-600">Total Items</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-500">3</div>
                <div className="text-sm text-gray-600">Generations</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-500">125</div>
                <div className="text-sm text-gray-600">Years</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}