import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, MessageCircle, Bell, User, Shield, Eye, Volume2, Moon, Globe, HelpCircle, LogOut, ChevronRight } from "lucide-react";

export default function Settings() {
  const [chatSettings, setChatSettings] = useState({
    readReceipts: true,
    onlineStatus: true,
    lastSeen: false,
    groupNotifications: true,
    messagePreview: true
  });

  const [notificationSettings, setNotificationSettings] = useState({
    pushNotifications: true,
    soundAlerts: true,
    vibration: true,
    familyPosts: true,
    directMessages: true,
    storyUpdates: false,
    eventReminders: true
  });

  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: true,
    activityStatus: true,
    familyTreeVisible: true,
    locationSharing: false
  });

  const [accountSettings, setAccountSettings] = useState({
    darkMode: false,
    language: "English",
    autoSave: true,
    dataUsage: "WiFi Only"
  });

  const settingSections = [
    {
      title: "Chat Management",
      icon: MessageCircle,
      color: "text-[#936cbf]",
      settings: [
        { key: "readReceipts", label: "Read Receipts", description: "Let others know when you've read their messages" },
        { key: "onlineStatus", label: "Show Online Status", description: "Display when you're active" },
        { key: "lastSeen", label: "Last Seen", description: "Show when you were last active" },
        { key: "groupNotifications", label: "Group Chat Notifications", description: "Get notified for group messages" },
        { key: "messagePreview", label: "Message Preview", description: "Show message content in notifications" }
      ],
      state: chatSettings,
      setState: setChatSettings
    },
    {
      title: "Notifications",
      icon: Bell,
      color: "text-[#f38e57]",
      settings: [
        { key: "pushNotifications", label: "Push Notifications", description: "Receive notifications on your device" },
        { key: "soundAlerts", label: "Sound Alerts", description: "Play sounds for new messages" },
        { key: "vibration", label: "Vibration", description: "Vibrate for notifications" },
        { key: "familyPosts", label: "Family Posts", description: "Notify when family members post" },
        { key: "directMessages", label: "Direct Messages", description: "Notify for private messages" },
        { key: "storyUpdates", label: "Story Updates", description: "Notify for new stories" },
        { key: "eventReminders", label: "Event Reminders", description: "Remind me of family events" }
      ],
      state: notificationSettings,
      setState: setNotificationSettings
    },
    {
      title: "Privacy & Security",
      icon: Shield,
      color: "text-[#d65d8b]",
      settings: [
        { key: "profileVisibility", label: "Profile Visibility", description: "Make your profile visible to family" },
        { key: "activityStatus", label: "Activity Status", description: "Show your activity to others" },
        { key: "familyTreeVisible", label: "Family Tree Visibility", description: "Display in family tree" },
        { key: "locationSharing", label: "Location Sharing", description: "Share your location with family" }
      ],
      state: privacySettings,
      setState: setPrivacySettings
    }
  ];

  const accountOptions = [
    { icon: User, label: "Edit Profile", description: "Update your personal information", action: () => window.location.href = "/profile" },
    { icon: Eye, label: "Privacy Policy", description: "Review our privacy policy", action: () => {} },
    { icon: Globe, label: "Language", description: "English", action: () => {} },
    { icon: Moon, label: "Dark Mode", description: "Toggle dark theme", hasSwitch: true, value: accountSettings.darkMode },
    { icon: Volume2, label: "Data Usage", description: "WiFi Only", action: () => {} },
    { icon: HelpCircle, label: "Help & Support", description: "Get help with Kinnren", action: () => {} },
    { icon: LogOut, label: "Sign Out", description: "Sign out of your account", action: () => {}, danger: true }
  ];

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
            <h1 className="text-xl font-bold">Settings</h1>
            <p className="text-sm text-white/80">Manage your account & preferences</p>
          </div>
        </div>
      </header>

      <div className="flex-1 p-4 space-y-6">
        {/* User Profile Summary */}
        <div className="bg-gradient-to-r from-[#936cbf]/10 to-[#f38e57]/10 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
              alt="Profile"
              className="w-16 h-16 rounded-full"
            />
            <div>
              <h3 className="text-lg font-semibold text-gray-900">John Doe</h3>
              <p className="text-gray-600">Family Member</p>
              <p className="text-sm text-[#936cbf]">Active now</p>
            </div>
          </div>
        </div>

        {/* Settings Sections */}
        {settingSections.map((section, index) => (
          <div key={index} className="space-y-4">
            <div className="flex items-center space-x-2">
              <section.icon className={`h-5 w-5 ${section.color}`} />
              <h2 className="text-lg font-semibold text-gray-900">{section.title}</h2>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4 space-y-4">
              {section.settings.map((setting, settingIndex) => (
                <div key={settingIndex} className="flex items-center justify-between">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{setting.label}</h4>
                    <p className="text-sm text-gray-600">{setting.description}</p>
                  </div>
                  <Switch
                    checked={section.state[setting.key as keyof typeof section.state]}
                    onCheckedChange={(checked) => 
                      section.setState((prev: any) => ({ ...prev, [setting.key]: checked }))
                    }
                    className="data-[state=checked]:bg-[#936cbf]"
                  />
                </div>
              ))}
            </div>
            {index < settingSections.length - 1 && <Separator />}
          </div>
        ))}

        <Separator />

        {/* Account Options */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">Account</h2>
          <div className="space-y-2">
            {accountOptions.map((option, index) => (
              <div
                key={index}
                className={`flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors ${
                  option.danger ? 'hover:bg-red-50' : ''
                }`}
                onClick={option.action}
              >
                <div className="flex items-center space-x-3">
                  <option.icon className={`h-5 w-5 ${option.danger ? 'text-red-500' : 'text-gray-600'}`} />
                  <div>
                    <h4 className={`font-medium ${option.danger ? 'text-red-600' : 'text-gray-900'}`}>
                      {option.label}
                    </h4>
                    <p className="text-sm text-gray-600">{option.description}</p>
                  </div>
                </div>
                {option.hasSwitch ? (
                  <Switch
                    checked={option.value}
                    onCheckedChange={(checked) => 
                      setAccountSettings((prev: any) => ({ ...prev, darkMode: checked }))
                    }
                    className="data-[state=checked]:bg-[#936cbf]"
                  />
                ) : (
                  <ChevronRight className="h-4 w-4 text-gray-400" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* App Info */}
        <div className="text-center py-6 text-gray-500 text-sm">
          <p>Kinnren v1.0.0</p>
          <p>Revisiting the memories</p>
        </div>
      </div>
    </div>
  );
}