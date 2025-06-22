import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Video, VideoOff, Mic, MicOff, Users, Phone, MessageCircle, Settings, Share2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function VideoRoom() {
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isAudioOn, setIsAudioOn] = useState(true);
  const [isConnected, setIsConnected] = useState(false);
  const [participants, setParticipants] = useState([
    { id: 1, name: "John Doe", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face", isVideoOn: true, isAudioOn: true },
    { id: 2, name: "Sarah Doe", avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face", isVideoOn: true, isAudioOn: false },
    { id: 3, name: "Mike Doe", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face", isVideoOn: false, isAudioOn: true }
  ]);
  const [callDuration, setCallDuration] = useState(0);
  const [roomId] = useState("family-room-123");
  const { toast } = useToast();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Simulate connection
    const timer = setTimeout(() => {
      setIsConnected(true);
      toast({
        title: "Connected",
        description: "Successfully joined the family video room",
      });
    }, 2000);

    return () => clearTimeout(timer);
  }, [toast]);

  useEffect(() => {
    // Call duration timer
    let interval: NodeJS.Timeout;
    if (isConnected) {
      interval = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isConnected]);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const toggleVideo = () => {
    setIsVideoOn(!isVideoOn);
    toast({
      title: isVideoOn ? "Camera Off" : "Camera On",
      description: `Your camera is now ${isVideoOn ? 'disabled' : 'enabled'}`,
    });
  };

  const toggleAudio = () => {
    setIsAudioOn(!isAudioOn);
    toast({
      title: isAudioOn ? "Microphone Off" : "Microphone On",
      description: `Your microphone is now ${isAudioOn ? 'muted' : 'unmuted'}`,
    });
  };

  const endCall = () => {
    toast({
      title: "Call Ended",
      description: "You have left the family video room",
    });
    window.history.back();
  };

  const shareScreen = () => {
    toast({
      title: "Screen Sharing",
      description: "Screen sharing feature will be available soon",
    });
  };

  return (
    <div className="min-h-screen max-w-md mx-auto bg-gray-900 text-white relative">
      {/* Header */}
      <header className="bg-gray-800/80 backdrop-blur-md px-4 py-3 flex items-center justify-between sticky top-0 z-40">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => window.history.back()}
          className="text-white hover:bg-white/20 p-2"
        >
          <ArrowLeft className="h-6 w-6" />
        </Button>
        
        <div className="text-center">
          <h1 className="text-lg font-semibold">Family Video Room</h1>
          <p className="text-sm text-gray-300">
            {isConnected ? formatDuration(callDuration) : "Connecting..."}
          </p>
        </div>
        
        <div className="flex items-center space-x-1">
          <Badge className="bg-[#936cbf] text-white text-xs">
            <Users className="h-3 w-3 mr-1" />
            {participants.length}
          </Badge>
        </div>
      </header>

      {/* Connection Status */}
      {!isConnected && (
        <div className="absolute inset-0 bg-gray-900/90 flex items-center justify-center z-50">
          <div className="text-center">
            <div className="animate-pulse">
              <Video className="h-16 w-16 text-[#936cbf] mx-auto mb-4" />
            </div>
            <h2 className="text-xl font-semibold mb-2">Connecting to Family Room</h2>
            <p className="text-gray-400">Please wait while we connect you...</p>
            <div className="mt-4 flex justify-center">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-[#936cbf] rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-[#f38e57] rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-[#d65d8b] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Video Area */}
      <div className="p-4 space-y-4">
        {/* Primary Video */}
        <Card className="overflow-hidden bg-gray-800 border-gray-700">
          <CardContent className="p-0 relative">
            <div className="aspect-video bg-gradient-to-br from-[#936cbf] to-[#f38e57] flex items-center justify-center relative">
              {isVideoOn ? (
                <video
                  ref={videoRef}
                  className="w-full h-full object-cover"
                  autoPlay
                  muted
                  playsInline
                />
              ) : (
                <div className="text-center">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
                    alt="You"
                    className="w-20 h-20 rounded-full mx-auto mb-2"
                  />
                  <p className="text-white font-medium">You</p>
                </div>
              )}
              
              {/* Video controls overlay */}
              <div className="absolute bottom-3 left-3 flex items-center space-x-2">
                <Badge className={`${isAudioOn ? 'bg-green-500' : 'bg-red-500'} text-white`}>
                  {isAudioOn ? <Mic className="h-3 w-3" /> : <MicOff className="h-3 w-3" />}
                </Badge>
                <Badge className={`${isVideoOn ? 'bg-green-500' : 'bg-red-500'} text-white`}>
                  {isVideoOn ? <Video className="h-3 w-3" /> : <VideoOff className="h-3 w-3" />}
                </Badge>
              </div>

              <div className="absolute bottom-3 right-3">
                <Badge className="bg-black/50 text-white text-xs">
                  Room: {roomId}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Participants Grid */}
        <div className="grid grid-cols-2 gap-3">
          {participants.slice(1).map((participant) => (
            <Card key={participant.id} className="overflow-hidden bg-gray-800 border-gray-700">
              <CardContent className="p-0 relative">
                <div className="aspect-video bg-gradient-to-br from-gray-700 to-gray-600 flex items-center justify-center">
                  {participant.isVideoOn ? (
                    <div className="w-full h-full bg-gradient-to-br from-[#936cbf]/50 to-[#f38e57]/50 flex items-center justify-center">
                      <img
                        src={participant.avatar}
                        alt={participant.name}
                        className="w-12 h-12 rounded-full"
                      />
                    </div>
                  ) : (
                    <div className="text-center">
                      <img
                        src={participant.avatar}
                        alt={participant.name}
                        className="w-12 h-12 rounded-full mx-auto mb-1"
                      />
                    </div>
                  )}
                  
                  <div className="absolute bottom-1 left-1 flex items-center space-x-1">
                    <Badge className={`${participant.isAudioOn ? 'bg-green-500' : 'bg-red-500'} text-white text-xs p-1`}>
                      {participant.isAudioOn ? <Mic className="h-2 w-2" /> : <MicOff className="h-2 w-2" />}
                    </Badge>
                  </div>

                  <div className="absolute bottom-1 right-1">
                    <Badge className="bg-black/50 text-white text-xs">
                      {participant.name.split(' ')[0]}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Call Controls */}
      <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md bg-gray-800/95 backdrop-blur-md border-t border-gray-700 p-4">
        <div className="flex items-center justify-center space-x-4">
          {/* Audio Toggle */}
          <Button
            onClick={toggleAudio}
            className={`rounded-full p-3 ${
              isAudioOn 
                ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                : 'bg-red-500 hover:bg-red-600 text-white'
            }`}
          >
            {isAudioOn ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
          </Button>

          {/* Video Toggle */}
          <Button
            onClick={toggleVideo}
            className={`rounded-full p-3 ${
              isVideoOn 
                ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                : 'bg-red-500 hover:bg-red-600 text-white'
            }`}
          >
            {isVideoOn ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
          </Button>

          {/* End Call */}
          <Button
            onClick={endCall}
            className="bg-red-500 hover:bg-red-600 text-white rounded-full p-3"
          >
            <Phone className="h-5 w-5 rotate-[135deg]" />
          </Button>

          {/* Chat */}
          <Button
            onClick={() => window.location.href = "/chats"}
            className="bg-[#936cbf] hover:bg-[#7a5ca8] text-white rounded-full p-3"
          >
            <MessageCircle className="h-5 w-5" />
          </Button>

          {/* Screen Share */}
          <Button
            onClick={shareScreen}
            className="bg-gray-700 hover:bg-gray-600 text-white rounded-full p-3"
          >
            <Share2 className="h-5 w-5" />
          </Button>
        </div>

        {/* Quick Actions */}
        <div className="mt-3 flex justify-center">
          <Badge className="bg-[#936cbf]/20 text-[#936cbf] text-xs px-3 py-1">
            Tap and hold video to switch camera
          </Badge>
        </div>
      </div>
    </div>
  );
}