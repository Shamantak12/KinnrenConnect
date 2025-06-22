import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Trophy, Users, Play, Star, Crown, Target, Music, Search, Gift } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function FamilyGames() {
  const [activeGame, setActiveGame] = useState<string | null>(null);
  const { toast } = useToast();

  const games = [
    {
      id: "bingo",
      name: "Family Bingo",
      icon: Target,
      color: "from-[#936cbf] to-[#f38e57]",
      players: "2-8 players",
      duration: "15-30 min",
      description: "Complete family-themed bingo cards together"
    },
    {
      id: "ludo",
      name: "Ludo",
      icon: Crown,
      color: "from-[#f38e57] to-[#d65d8b]",
      players: "2-4 players", 
      duration: "20-45 min",
      description: "Classic board game with family members"
    },
    {
      id: "karaoke",
      name: "Family Karaoke",
      icon: Music,
      color: "from-[#d65d8b] to-[#936cbf]",
      players: "1-10 players",
      duration: "30-60 min",
      description: "Sing favorite songs together and vote for performances"
    },
    {
      id: "scavenger",
      name: "Scavenger Hunt",
      icon: Search,
      color: "from-[#936cbf] to-[#d65d8b]", 
      players: "2-12 players",
      duration: "45-90 min",
      description: "Find hidden items around the house or neighborhood"
    }
  ];

  const leaderboards = {
    bingo: [
      { rank: 1, name: "Sarah Doe", score: 1250, avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face" },
      { rank: 2, name: "John Doe", score: 1180, avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face" },
      { rank: 3, name: "Mike Doe", score: 950, avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" }
    ],
    ludo: [
      { rank: 1, name: "Mike Doe", score: 890, avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" },
      { rank: 2, name: "Sarah Doe", score: 720, avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face" },
      { rank: 3, name: "John Doe", score: 680, avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face" }
    ],
    karaoke: [
      { rank: 1, name: "John Doe", score: 1420, avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face" },
      { rank: 2, name: "Mike Doe", score: 1100, avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" },
      { rank: 3, name: "Sarah Doe", score: 980, avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face" }
    ],
    scavenger: [
      { rank: 1, name: "Sarah Doe", score: 1650, avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face" },
      { rank: 2, name: "John Doe", score: 1320, avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face" },
      { rank: 3, name: "Mike Doe", score: 1150, avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" }
    ]
  };

  const startGame = (gameId: string, gameName: string) => {
    setActiveGame(gameId);
    toast({
      title: "Game Started!",
      description: `${gameName} has been launched. Have fun!`,
    });
  };

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1: return "text-yellow-600 bg-yellow-100";
      case 2: return "text-gray-600 bg-gray-100";
      case 3: return "text-amber-600 bg-amber-100";
      default: return "text-gray-500 bg-gray-50";
    }
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return "🥇";
      case 2: return "🥈";
      case 3: return "🥉";
      default: return `#${rank}`;
    }
  };

  return (
    <div className="min-h-screen max-w-md mx-auto bg-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-[#936cbf] to-[#f38e57] text-white px-4 py-4 sticky top-0 z-40">
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
            <h1 className="text-xl font-bold">Family Games</h1>
            <p className="text-sm text-white/80">Play together, stay connected</p>
          </div>
        </div>
      </header>

      <Tabs defaultValue="games" className="w-full">
        <TabsList className="grid w-full grid-cols-2 sticky top-20 z-30 bg-white border-b">
          <TabsTrigger value="games">Games</TabsTrigger>
          <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
        </TabsList>

        {/* Games Tab */}
        <TabsContent value="games" className="p-4 space-y-4">
          <div className="grid grid-cols-1 gap-4">
            {games.map((game) => (
              <Card key={game.id} className="overflow-hidden border-l-4 border-l-[#936cbf]">
                <CardContent className="p-0">
                  <div className={`bg-gradient-to-r ${game.color} p-4 text-white`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <game.icon className="h-8 w-8" />
                        <div>
                          <h3 className="font-bold text-lg">{game.name}</h3>
                          <p className="text-sm text-white/80">{game.description}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex space-x-4 text-sm">
                        <div className="flex items-center text-gray-600">
                          <Users className="h-4 w-4 mr-1" />
                          {game.players}
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Trophy className="h-4 w-4 mr-1" />
                          {game.duration}
                        </div>
                      </div>
                    </div>
                    <Button
                      onClick={() => startGame(game.id, game.name)}
                      className="w-full bg-[#936cbf] hover:bg-[#7a5ca8] text-white"
                      disabled={activeGame === game.id}
                    >
                      <Play className="h-4 w-4 mr-2" />
                      {activeGame === game.id ? "Game Active" : "Start Game"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Quick Stats */}
          <Card className="bg-gradient-to-r from-[#936cbf]/10 to-[#f38e57]/10">
            <CardContent className="p-4">
              <h3 className="font-semibold text-gray-900 mb-3">Today's Gaming Stats</h3>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-[#936cbf]">8</p>
                  <p className="text-xs text-gray-600">Games Played</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-[#d65d8b]">450</p>
                  <p className="text-xs text-gray-600">Points Earned</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Leaderboard Tab */}
        <TabsContent value="leaderboard" className="p-4 space-y-4">
          <Tabs defaultValue="bingo" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="bingo" className="text-xs">Bingo</TabsTrigger>
              <TabsTrigger value="ludo" className="text-xs">Ludo</TabsTrigger>
              <TabsTrigger value="karaoke" className="text-xs">Karaoke</TabsTrigger>
              <TabsTrigger value="scavenger" className="text-xs">Hunt</TabsTrigger>
            </TabsList>

            {Object.entries(leaderboards).map(([gameKey, rankings]) => (
              <TabsContent key={gameKey} value={gameKey} className="space-y-3 mt-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-gray-900">
                    {games.find(g => g.id === gameKey)?.name} Rankings
                  </h3>
                  <Badge className="bg-[#936cbf] text-white">
                    <Trophy className="h-3 w-3 mr-1" />
                    Season 1
                  </Badge>
                </div>
                
                {rankings.map((player, index) => (
                  <Card key={index} className={`${player.rank <= 3 ? 'border-l-4' : ''} ${
                    player.rank === 1 ? 'border-l-yellow-500' :
                    player.rank === 2 ? 'border-l-gray-400' :
                    player.rank === 3 ? 'border-l-amber-500' : ''
                  }`}>
                    <CardContent className="p-3">
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${getRankColor(player.rank)}`}>
                          {getRankIcon(player.rank)}
                        </div>
                        <img
                          src={player.avatar}
                          alt={player.name}
                          className="w-10 h-10 rounded-full"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{player.name}</h4>
                          <div className="flex items-center space-x-2">
                            <Star className="h-3 w-3 text-[#f38e57]" />
                            <span className="text-sm text-gray-600">{player.score.toLocaleString()} points</span>
                          </div>
                        </div>
                        {player.rank === 1 && (
                          <div className="flex items-center space-x-1">
                            <Crown className="h-4 w-4 text-yellow-500" />
                            <Badge className="bg-yellow-100 text-yellow-800">Champion</Badge>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
                <Button
                  variant="outline"
                  className="w-full border-[#936cbf] text-[#936cbf] hover:bg-[#936cbf] hover:text-white"
                  onClick={() => toast({ title: "Coming Soon", description: "Full leaderboard view will be available soon" })}
                >
                  View Full Leaderboard
                </Button>
              </TabsContent>
            ))}
          </Tabs>
        </TabsContent>
      </Tabs>
    </div>
  );
}