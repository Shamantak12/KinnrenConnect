import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Profile from "@/pages/profile";
import FamilyMap from "@/pages/family-map";
import FamilyGames from "@/pages/family-games";
import AnonymousChat from "@/pages/anonymous-chat";
import FamilyOutings from "@/pages/family-outings";
import Calendar from "@/pages/calendar";
import FamilyTree from "@/pages/family-tree";
import StoryTime from "@/pages/story-time";
import TimeCapsule from "@/pages/time-capsule";
import VideoMontage from "@/pages/video-montage";
import Bookmarks from "@/pages/bookmarks";
import Heritage from "@/pages/heritage";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/profile" component={Profile} />
      <Route path="/family-map" component={FamilyMap} />
      <Route path="/family-games" component={FamilyGames} />
      <Route path="/anonymous-chat" component={AnonymousChat} />
      <Route path="/family-outings" component={FamilyOutings} />
      <Route path="/calendar" component={Calendar} />
      <Route path="/family-tree" component={FamilyTree} />
      <Route path="/story-time" component={StoryTime} />
      <Route path="/time-capsule" component={TimeCapsule} />
      <Route path="/video-montage" component={VideoMontage} />
      <Route path="/bookmarks" component={Bookmarks} />
      <Route path="/heritage" component={Heritage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
