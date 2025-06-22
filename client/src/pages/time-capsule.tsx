import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ArrowLeft, Archive, Plus, Lock, Calendar, Gift } from "lucide-react";
import { format, isBefore } from "date-fns";

export default function TimeCapsule() {
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [openDate, setOpenDate] = useState("");
  
  const { user } = useAuth();

  // Fetch time capsules
  const { data: timeCapsules = [] } = useQuery({
    queryKey: ["/api/time-capsules"],
    enabled: !!user,
    retry: false,
  });

  const canOpen = (capsule: any) => {
    return isBefore(new Date(capsule.openDate), new Date()) && !capsule.isOpened;
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
          <h1 className="text-xl font-semibold text-gray-800">Time Capsule</h1>
        </div>
        
        <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
          <DialogTrigger asChild>
            <Button className="bg-teal-500 hover:bg-teal-600" size="sm">
              <Plus className="h-4 w-4 mr-1" />
              Create
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-sm mx-auto">
            <DialogHeader>
              <DialogTitle>Create Time Capsule</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Capsule Title"
                />
              </div>
              <div>
                <Textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Write a message to your future family..."
                />
              </div>
              <div>
                <label className="text-sm font-medium">Open Date</label>
                <Input
                  type="date"
                  value={openDate}
                  onChange={(e) => setOpenDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
              <Button
                disabled={!title.trim() || !content.trim() || !openDate}
                className="w-full bg-teal-500 hover:bg-teal-600"
              >
                Create Time Capsule
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </header>

      <div className="p-4 space-y-6">
        {/* Introduction */}
        <Card className="bg-gradient-to-br from-teal-50 to-blue-50 border-teal-200">
          <CardContent className="p-4">
            <div className="flex items-start space-x-3">
              <Archive className="h-6 w-6 text-teal-600 mt-1" />
              <div>
                <h3 className="font-semibold text-teal-800 mb-1">Preserve Memories</h3>
                <p className="text-sm text-teal-700">
                  Create digital time capsules with photos, videos, and messages to open in the future.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Time Capsules */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Archive className="h-5 w-5 text-teal-500" />
              <span>Family Time Capsules</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {timeCapsules.length === 0 ? (
              <div className="text-center py-8">
                <Archive className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-2">No time capsules yet</p>
                <p className="text-sm text-gray-500">Create your first memory to preserve</p>
              </div>
            ) : (
              timeCapsules.map((capsule: any) => (
                <Card key={capsule.id} className="border border-gray-200">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800 mb-1">{capsule.title}</h3>
                        <p className="text-sm text-gray-600 mb-2">{capsule.content}</p>
                        <div className="flex items-center space-x-2 text-xs text-gray-500">
                          <Calendar className="h-3 w-3" />
                          <span>Opens: {format(new Date(capsule.openDate), "MMM d, yyyy")}</span>
                        </div>
                      </div>
                      <div className="ml-3">
                        {capsule.isOpened ? (
                          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                            <Gift className="h-6 w-6 text-green-600" />
                          </div>
                        ) : canOpen(capsule) ? (
                          <Button className="bg-teal-500 hover:bg-teal-600" size="sm">
                            Open
                          </Button>
                        ) : (
                          <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                            <Lock className="h-6 w-6 text-gray-600" />
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </CardContent>
        </Card>

        {/* Categories */}
        <Card>
          <CardHeader>
            <CardTitle>Capsule Ideas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { title: "Birthday Messages", desc: "Write to future birthdays", icon: "🎂" },
              { title: "Anniversary Notes", desc: "Celebrate milestones", icon: "💍" },
              { title: "Childhood Memories", desc: "Preserve precious moments", icon: "👶" },
              { title: "Family Traditions", desc: "Document yearly customs", icon: "🎄" },
              { title: "Achievement Goals", desc: "Set future aspirations", icon: "🏆" },
              { title: "Love Letters", desc: "Express feelings for later", icon: "💝" }
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
            <CardTitle>Capsule Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-teal-500">{timeCapsules.length}</div>
                <div className="text-sm text-gray-600">Created</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-500">
                  {timeCapsules.filter((c: any) => canOpen(c)).length}
                </div>
                <div className="text-sm text-gray-600">Ready</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-500">
                  {timeCapsules.filter((c: any) => c.isOpened).length}
                </div>
                <div className="text-sm text-gray-600">Opened</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}