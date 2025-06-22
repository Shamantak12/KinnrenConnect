import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Video, VideoOff, Mic, MicOff, Phone, Users, Settings, Share2 } from "lucide-react";

export default function VideoRoom() {
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isAudioOn, setIsAudioOn] = useState(true);
  const [roomName, setRoomName] = useState("Family Virtual Room");
  const [isInCall, setIsInCall] = useState(false);

  const familyMembers = [
    {
      id: 1,
      name: "Sarah Johnson",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      isOnline: true,
      isInCall: false
    },
    {
      id: 2,
      name: "Mike Smith",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      isOnline: true,
      isInCall: true
    },
    {
      id: 3,
      name: "Emma Wilson",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      isOnline: false,
      isInCall: false
    },
    {
      id: 4,
      name: "John Doe",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      isOnline: true,
      isInCall: true
    }
  ];

  const joinCall = () => {
    setIsInCall(true);
  };

  const leaveCall = () => {
    setIsInCall(false);
  };

  return (
    <div className="min-h-screen max-w-md mx-auto bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-[#936cbf] to-[#f38e57] px-4 py-4 sticky top-0 z-40">
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
              <h1 className="text-xl font-bold">Video Room</h1>
              <p className="text-sm text-white/80">Private family space</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="text-white hover:bg-white/20 p-2"
          >
            <Share2 className="h-5 w-5" />
          </Button>
        </div>
      </header>

      {!isInCall ? (
        /* Pre-call Screen */
        <div className="flex-1 p-6">
          {/* Room Info */}
          <div className="text-center mb-8">
            <div className="w-24 h-24 bg-gradient-to-br from-[#936cbf] to-[#f38e57] rounded-full flex items-center justify-center mx-auto mb-4">
              <Video className="h-12 w-12 text-white" />
            </div>
            <h2 className="text-2xl font-bold mb-2">{roomName}</h2>
            <p className="text-gray-400">Connect with your family members</p>
          </div>

          {/* Room Settings */}
          <div className="space-y-4 mb-8">
            <div>
              <label className="block text-sm font-medium mb-2">Room Name</label>
              <Input
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
                className="bg-gray-800 border-gray-700 text-white focus:border-[#936cbf]"
              />
            </div>
          </div>

          {/* Family Members Status */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Users className="h-5 w-5 mr-2" />
              Family Members
            </h3>
            <div className="space-y-3">
              {familyMembers.map((member) => (
                <div key={member.id} className="flex items-center justify-between bg-gray-800 rounded-lg p-3">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <img
                        src={member.avatar}
                        alt={member.name}
                        className="w-10 h-10 rounded-full"
                      />
                      <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-gray-800 ${
                        member.isOnline ? 'bg-green-500' : 'bg-gray-500'
                      }`}></div>
                    </div>
                    <div>
                      <p className="font-medium">{member.name}</p>
                      <p className="text-sm text-gray-400">
                        {member.isInCall ? 'In call' : member.isOnline ? 'Online' : 'Offline'}
                      </p>
                    </div>
                  </div>
                  {member.isInCall && (
                    <div className="bg-[#936cbf] text-white px-2 py-1 rounded-full text-xs">
                      In call
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Controls Preview */}
          <div className="flex justify-center space-x-4 mb-8">
            <Button
              variant={isVideoOn ? "default" : "destructive"}
              size="lg"
              className={`w-14 h-14 rounded-full ${isVideoOn ? 'bg-gray-700 hover:bg-gray-600' : ''}`}
              onClick={() => setIsVideoOn(!isVideoOn)}
            >
              {isVideoOn ? <Video className="h-6 w-6" /> : <VideoOff className="h-6 w-6" />}
            </Button>
            <Button
              variant={isAudioOn ? "default" : "destructive"}
              size="lg"
              className={`w-14 h-14 rounded-full ${isAudioOn ? 'bg-gray-700 hover:bg-gray-600' : ''}`}
              onClick={() => setIsAudioOn(!isAudioOn)}
            >
              {isAudioOn ? <Mic className="h-6 w-6" /> : <MicOff className="h-6 w-6" />}
            </Button>
          </div>

          {/* Join Button */}
          <Button
            onClick={joinCall}
            className="w-full bg-gradient-to-r from-[#936cbf] to-[#f38e57] hover:from-[#7a5ca8] hover:to-[#e07b48] text-white py-4 text-lg font-semibold"
          >
            Join Family Room
          </Button>
        </div>
      ) : (
        /* In Call Screen */
        <div className="flex-1 relative">
          {/* Video Grid */}
          <div className="grid grid-cols-2 gap-2 p-4 h-screen">
            {/* Main Video */}
            <div className="col-span-2 bg-gray-800 rounded-lg relative overflow-hidden" style={{ height: '60%' }}>
              <div className="absolute inset-0 bg-gradient-to-br from-[#936cbf]/20 to-[#f38e57]/20 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 bg-[#936cbf] rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-2xl font-bold">JD</span>
                  </div>
                  <p className="text-lg font-semibold">You</p>
                </div>
              </div>
            </div>

            {/* Other Participants */}
            <div className="bg-gray-800 rounded-lg relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#d65d8b]/20 to-[#936cbf]/20 flex items-center justify-center">
                <div className="text-center">
                  <img
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
                    alt="Mike"
                    className="w-12 h-12 rounded-full mx-auto mb-1"
                  />
                  <p className="text-sm font-medium">Mike</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-700 rounded-lg relative overflow-hidden opacity-50">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <Users className="h-8 w-8 mx-auto mb-1 text-gray-400" />
                  <p className="text-xs text-gray-400">Waiting...</p>
                </div>
              </div>
            </div>
          </div>

          {/* Call Controls */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
            <div className="flex items-center space-x-4 bg-black/50 backdrop-blur-sm rounded-full px-6 py-3">
              <Button
                variant={isVideoOn ? "default" : "destructive"}
                size="lg"
                className={`w-12 h-12 rounded-full ${isVideoOn ? 'bg-gray-700 hover:bg-gray-600' : ''}`}
                onClick={() => setIsVideoOn(!isVideoOn)}
              >
                {isVideoOn ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
              </Button>
              <Button
                variant={isAudioOn ? "default" : "destructive"}
                size="lg"
                className={`w-12 h-12 rounded-full ${isAudioOn ? 'bg-gray-700 hover:bg-gray-600' : ''}`}
                onClick={() => setIsAudioOn(!isAudioOn)}
              >
                {isAudioOn ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
              </Button>
              <Button
                variant="destructive"
                size="lg"
                className="w-12 h-12 rounded-full"
                onClick={leaveCall}
              >
                <Phone className="h-5 w-5" />
              </Button>
              <Button
                variant="default"
                size="lg"
                className="w-12 h-12 rounded-full bg-gray-700 hover:bg-gray-600"
              >
                <Settings className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}