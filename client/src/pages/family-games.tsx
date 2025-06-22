import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Gamepad2, Trophy, Users, Star, Play } from "lucide-react";

export default function FamilyGames() {
  const [activeGame, setActiveGame] = useState<string | null>(null);

  const games = [
    {
      id: "trivia",
      title: "Family Trivia",
      description: "Test your knowledge about family members",
      players: "2-8 players",
      difficulty: "Easy",
      status: "available",
      icon: "🧠"
    },
    {
      id: "scavenger",
      title: "Photo Scavenger Hunt",
      description: "Find and photograph items around your home",
      players: "1-6 players",
      difficulty: "Medium",
      status: "available",
      icon: "📸"
    },
    {
      id: "storytelling",
      title: "Story Building",
      description: "Create stories together, one sentence at a time",
      players: "2-10 players",
      difficulty: "Easy",
      status: "popular",
      icon: "📚"
    },
    {
      id: "memory",
      title: "Memory Lane",
      description: "Share and guess family memories",
      players: "3-8 players",
      difficulty: "Medium",
      status: "new",
      icon: "🎭"
    }
  ];

  const leaderboard = [
    { name: "Sarah", score: 2450, rank: 1 },
    { name: "Mike", score: 2200, rank: 2 },
    { name: "Emma", score: 1980, rank: 3 },
    { name: "John", score: 1750, rank: 4 }
  ];

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
        <h1 className="text-xl font-semibold text-gray-800">Family Games</h1>
      </header>

      <div className="p-4 space-y-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3">
          <Card className="text-center p-3">
            <div className="text-2xl font-bold text-teal-500">12</div>
            <div className="text-xs text-gray-600">Games Played</div>
          </Card>
          <Card className="text-center p-3">
            <div className="text-2xl font-bold text-pink-500">156</div>
            <div className="text-xs text-gray-600">Points Earned</div>
          </Card>
          <Card className="text-center p-3">
            <div className="text-2xl font-bold text-yellow-500">3rd</div>
            <div className="text-xs text-gray-600">Rank</div>
          </Card>
        </div>

        {/* Available Games */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Gamepad2 className="h-5 w-5 text-teal-500" />
              <span>Available Games</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {games.map((game) => (
              <div key={game.id} className="p-4 border border-gray-200 rounded-lg hover:border-teal-300 transition-colors">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">{game.icon}</div>
                    <div>
                      <h3 className="font-semibold text-gray-800">{game.title}</h3>
                      <p className="text-sm text-gray-600">{game.description}</p>
                    </div>
                  </div>
                  {game.status === "new" && <Badge variant="secondary">New</Badge>}
                  {game.status === "popular" && <Badge className="bg-pink-500">Popular</Badge>}
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                    <span className="flex items-center space-x-1">
                      <Users className="h-3 w-3" />
                      <span>{game.players}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Star className="h-3 w-3" />
                      <span>{game.difficulty}</span>
                    </span>
                  </div>
                  <Button 
                    size="sm" 
                    className="bg-teal-500 hover:bg-teal-600"
                    onClick={() => setActiveGame(game.id)}
                  >
                    <Play className="h-3 w-3 mr-1" />
                    Play
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Leaderboard */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Trophy className="h-5 w-5 text-yellow-500" />
              <span>Family Leaderboard</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {leaderboard.map((player, index) => (
              <div key={player.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                    index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : index === 2 ? 'bg-amber-600' : 'bg-gray-300'
                  }`}>
                    {player.rank}
                  </div>
                  <span className="font-medium text-gray-800">{player.name}</span>
                </div>
                <span className="font-semibold text-teal-600">{player.score}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Game Rules */}
        <Card>
          <CardHeader>
            <CardTitle>How to Earn Points</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-gray-600">
            <div className="flex justify-between">
              <span>Complete a game</span>
              <span className="font-semibold text-teal-600">+50 points</span>
            </div>
            <div className="flex justify-between">
              <span>Win a game</span>
              <span className="font-semibold text-teal-600">+100 points</span>
            </div>
            <div className="flex justify-between">
              <span>Daily game streak</span>
              <span className="font-semibold text-teal-600">+25 points</span>
            </div>
            <div className="flex justify-between">
              <span>Create new game</span>
              <span className="font-semibold text-teal-600">+75 points</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}