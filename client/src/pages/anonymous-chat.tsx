import { useState, useEffect, useRef } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Send, MessageSquare, Shield } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

export default function AnonymousChat() {
  const [message, setMessage] = useState("");
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch messages
  const { data: messages = [] } = useQuery({
    queryKey: ["/api/anonymous-chat"],
    enabled: !!user?.familyId,
    retry: false,
  });

  // Send message mutation
  const sendMessage = useMutation({
    mutationFn: async (content: string) => {
      await apiRequest("POST", "/api/anonymous-chat", { content });
    },
    onSuccess: () => {
      setMessage("");
      queryClient.invalidateQueries({ queryKey: ["/api/anonymous-chat"] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to send message",
        variant: "destructive",
      });
    },
  });

  // WebSocket connection
  useEffect(() => {
    if (!user?.familyId) return;

    const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
    const wsUrl = `${protocol}//${window.location.host}/ws`;
    const ws = new WebSocket(wsUrl);

    ws.onopen = () => {
      console.log("Connected to WebSocket");
      setSocket(ws);
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'anonymous_message') {
        queryClient.invalidateQueries({ queryKey: ["/api/anonymous-chat"] });
      }
    };

    ws.onclose = () => {
      console.log("WebSocket connection closed");
      setSocket(null);
    };

    return () => {
      ws.close();
    };
  }, [user?.familyId, queryClient]);

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!message.trim()) return;
    sendMessage.mutate(message);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="min-h-screen max-w-md mx-auto bg-gray-50 flex flex-col">
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
        <div className="flex items-center space-x-2">
          <MessageSquare className="h-5 w-5 text-purple-500" />
          <h1 className="text-xl font-semibold text-gray-800">Anonymous Chat</h1>
        </div>
      </header>

      {/* Privacy Notice */}
      <div className="p-4">
        <Card className="bg-purple-50 border-purple-200">
          <CardContent className="p-3">
            <div className="flex items-start space-x-2">
              <Shield className="h-4 w-4 text-purple-600 mt-0.5" />
              <div className="text-sm text-purple-800">
                <p className="font-medium mb-1">Safe Space</p>
                <p>Messages are anonymous within your family. Share thoughts and feelings freely in this supportive environment.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 space-y-4 overflow-y-auto">
        {messages.length === 0 ? (
          <div className="text-center py-8">
            <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-2">No messages yet</p>
            <p className="text-sm text-gray-500">Be the first to share something anonymously</p>
          </div>
        ) : (
          messages.map((msg: any) => (
            <Card key={msg.id} className="animate-fade-in">
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">?</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-800 mb-2">{msg.content}</p>
                    <p className="text-xs text-gray-500">
                      {formatDistanceToNow(new Date(msg.createdAt), { addSuffix: true })}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="p-4 bg-white border-t border-gray-200">
        <div className="flex items-center space-x-2">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Share something anonymously..."
            className="flex-1"
            disabled={sendMessage.isPending}
          />
          <Button
            onClick={handleSend}
            disabled={!message.trim() || sendMessage.isPending}
            className="bg-purple-500 hover:bg-purple-600"
            size="sm"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
        <p className="text-xs text-gray-500 mt-2 text-center">
          Your identity is hidden • Messages are visible to family members only
        </p>
      </div>
    </div>
  );
}