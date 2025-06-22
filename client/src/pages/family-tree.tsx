import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ArrowLeft, GitBranch, Plus, Users, Heart } from "lucide-react";

export default function FamilyTree() {
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [selectedMember, setSelectedMember] = useState<any>(null);

  const familyData = {
    grandparents: [
      { id: 1, name: "Robert Johnson", relation: "Grandfather", birth: "1945", photo: null },
      { id: 2, name: "Mary Johnson", relation: "Grandmother", birth: "1948", photo: null }
    ],
    parents: [
      { id: 3, name: "David Johnson", relation: "Father", birth: "1970", photo: null },
      { id: 4, name: "Sarah Johnson", relation: "Mother", birth: "1972", photo: null }
    ],
    children: [
      { id: 5, name: "Mike Johnson", relation: "Son", birth: "1995", photo: null },
      { id: 6, name: "Emma Johnson", relation: "Daughter", birth: "1998", photo: null }
    ]
  };

  const MemberCard = ({ member, size = "normal" }: { member: any; size?: "small" | "normal" }) => (
    <Card 
      className={`cursor-pointer hover:shadow-lg transition-all ${size === "small" ? "p-2" : "p-3"}`}
      onClick={() => setSelectedMember(member)}
    >
      <div className="text-center">
        <div className={`mx-auto rounded-full bg-gradient-to-br from-pink-400 to-teal-400 flex items-center justify-center text-white font-bold ${
          size === "small" ? "w-12 h-12 text-lg" : "w-16 h-16 text-xl"
        }`}>
          {member.name.split(' ').map((n: string) => n[0]).join('')}
        </div>
        <h3 className={`font-semibold text-gray-800 mt-2 ${size === "small" ? "text-sm" : "text-base"}`}>
          {member.name}
        </h3>
        <p className={`text-gray-600 ${size === "small" ? "text-xs" : "text-sm"}`}>
          {member.relation}
        </p>
        <p className={`text-gray-500 ${size === "small" ? "text-xs" : "text-sm"}`}>
          Born {member.birth}
        </p>
      </div>
    </Card>
  );

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
          <h1 className="text-xl font-semibold text-gray-800">Family Tree</h1>
        </div>
        
        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogTrigger asChild>
            <Button className="bg-pink-500 hover:bg-pink-600" size="sm">
              <Plus className="h-4 w-4 mr-1" />
              Add
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-sm mx-auto">
            <DialogHeader>
              <DialogTitle>Add Family Member</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Input placeholder="Full Name" />
              <Input placeholder="Relation (e.g., Uncle, Cousin)" />
              <Input type="date" placeholder="Birth Date" />
              <Button className="w-full bg-pink-500 hover:bg-pink-600">
                Add Member
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </header>

      <div className="p-4 space-y-6">
        {/* Family Tree Visualization */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <GitBranch className="h-5 w-5 text-pink-500" />
              <span>Johnson Family Tree</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Grandparents */}
            <div>
              <h3 className="text-sm font-semibold text-gray-600 mb-3 text-center">Grandparents</h3>
              <div className="grid grid-cols-2 gap-3">
                {familyData.grandparents.map(member => (
                  <MemberCard key={member.id} member={member} size="small" />
                ))}
              </div>
              <div className="flex justify-center my-2">
                <div className="w-px h-6 bg-gray-300"></div>
              </div>
            </div>

            {/* Parents */}
            <div>
              <h3 className="text-sm font-semibold text-gray-600 mb-3 text-center">Parents</h3>
              <div className="grid grid-cols-2 gap-3">
                {familyData.parents.map(member => (
                  <MemberCard key={member.id} member={member} size="small" />
                ))}
              </div>
              <div className="flex justify-center my-2">
                <div className="w-px h-6 bg-gray-300"></div>
              </div>
            </div>

            {/* Children */}
            <div>
              <h3 className="text-sm font-semibold text-gray-600 mb-3 text-center">Children</h3>
              <div className="grid grid-cols-2 gap-3">
                {familyData.children.map(member => (
                  <MemberCard key={member.id} member={member} size="small" />
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Family Stats */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-teal-500" />
              <span>Family Statistics</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-pink-500">6</div>
                <div className="text-sm text-gray-600">Members</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-teal-500">3</div>
                <div className="text-sm text-gray-600">Generations</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Heritage Info */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Heart className="h-5 w-5 text-red-500" />
              <span>Family Heritage</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="p-3 bg-blue-50 rounded-lg">
              <h4 className="font-medium text-gray-800">Origin</h4>
              <p className="text-sm text-gray-600">Scotland & Ireland</p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <h4 className="font-medium text-gray-800">Family Motto</h4>
              <p className="text-sm text-gray-600">"Together we are stronger"</p>
            </div>
            <div className="p-3 bg-yellow-50 rounded-lg">
              <h4 className="font-medium text-gray-800">Founded</h4>
              <p className="text-sm text-gray-600">1945 - Robert & Mary Johnson</p>
            </div>
          </CardContent>
        </Card>

        {/* Recent Additions */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Additions</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 text-center py-4">No recent additions to the family tree</p>
          </CardContent>
        </Card>
      </div>

      {/* Member Detail Modal */}
      {selectedMember && (
        <Dialog open={!!selectedMember} onOpenChange={() => setSelectedMember(null)}>
          <DialogContent className="max-w-sm mx-auto">
            <DialogHeader>
              <DialogTitle>{selectedMember.name}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="text-center">
                <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-pink-400 to-teal-400 flex items-center justify-center text-white font-bold text-2xl">
                  {selectedMember.name.split(' ').map((n: string) => n[0]).join('')}
                </div>
              </div>
              <div className="space-y-2">
                <div>
                  <span className="font-medium">Relation:</span> {selectedMember.relation}
                </div>
                <div>
                  <span className="font-medium">Born:</span> {selectedMember.birth}
                </div>
              </div>
              <Button className="w-full" variant="outline">
                Edit Details
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}