"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { User, Mail, Moon, Sun, Bell, BellOff } from "lucide-react";
import { useTheme } from "@/components/theme-provider";

interface SettingsClientProps {
  initialName: string;
  email: string;
}

export function SettingsClient({ initialName, email }: SettingsClientProps) {
  const [name, setName] = useState(initialName);
  const [notifications, setNotifications] = useState(true);
  const [saving, setSaving] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  const handleSave = async () => {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 600));
    setSaving(false);
    toast.success("Settings saved", {
      description: "Your preferences have been updated.",
    });
  };

  return (
    <div className="max-w-2xl space-y-6">
      {/* Profile Section */}
      <Card className="bg-surface/50 border-border/50">
        <CardContent className="p-6 space-y-5">
          <h2 className="text-base font-bold text-text-primary flex items-center gap-2">
            <User className="w-4 h-4 text-primary" /> Profile
          </h2>

          <div className="space-y-4">
            <div>
              <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-text-primary/50 mb-2 block">
                Display Name
              </label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-surface/40 border-border/60 h-11"
                placeholder="Your name"
              />
            </div>

            <div>
              <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-text-primary/50 mb-2 block">
                Email Address
              </label>
              <div className="flex items-center gap-3">
                <div className="flex-1 h-11 bg-surface/20 border border-border/40 rounded-md px-3 flex items-center text-sm text-text-primary/60">
                  <Mail className="w-4 h-4 mr-2 text-text-primary/40 shrink-0" />
                  <span className="truncate">{email}</span>
                </div>
                <span className="text-[9px] font-bold text-text-primary/40 tracking-wider uppercase whitespace-nowrap">
                  Read-only
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Preferences Section */}
      <Card className="bg-surface/50 border-border/50">
        <CardContent className="p-6 space-y-5">
          <h2 className="text-base font-bold text-text-primary flex items-center gap-2">
            {isDark ? <Moon className="w-4 h-4 text-primary" /> : <Sun className="w-4 h-4 text-yellow-400" />} Preferences
          </h2>

          {/* Theme Toggle */}
          <div className="flex items-center justify-between py-1">
            <div>
              <p className="text-sm font-semibold text-text-primary">Theme</p>
              <p className="text-xs text-text-primary/50 mt-0.5">
                {isDark ? "Dark mode active" : "Light mode active"}
              </p>
            </div>
            <button
              onClick={toggleTheme}
              className={`relative w-14 h-7 rounded-full transition-all duration-300 ${
                isDark
                  ? "bg-primary shadow-[0_0_12px_rgba(79,70,229,0.3)]"
                  : "bg-yellow-400 shadow-[0_0_12px_rgba(250,204,21,0.3)]"
              }`}
              aria-label="Toggle theme"
            >
              <div
                className={`absolute top-0.5 w-6 h-6 rounded-full bg-white shadow-md transition-transform duration-300 flex items-center justify-center ${
                  isDark ? "translate-x-7" : "translate-x-0.5"
                }`}
              >
                {isDark ? (
                  <Moon className="w-3 h-3 text-primary" />
                ) : (
                  <Sun className="w-3 h-3 text-yellow-500" />
                )}
              </div>
            </button>
          </div>

          {/* Notifications Toggle */}
          <div className="flex items-center justify-between py-1">
            <div className="flex items-center gap-3">
              {notifications ? (
                <Bell className="w-4 h-4 text-success" />
              ) : (
                <BellOff className="w-4 h-4 text-text-primary/40" />
              )}
              <div>
                <p className="text-sm font-semibold text-text-primary">Notifications</p>
                <p className="text-xs text-text-primary/50 mt-0.5">Learning reminders and updates</p>
              </div>
            </div>
            <button
              onClick={() => setNotifications(!notifications)}
              className={`relative w-14 h-7 rounded-full transition-all duration-300 ${
                notifications
                  ? "bg-success shadow-[0_0_12px_rgba(16,185,129,0.3)]"
                  : "bg-surface border border-border"
              }`}
              aria-label="Toggle notifications"
            >
              <div
                className={`absolute top-0.5 w-6 h-6 rounded-full bg-white shadow-md transition-transform duration-300 ${
                  notifications ? "translate-x-7" : "translate-x-0.5"
                }`}
              />
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end pt-2">
        <Button
          variant="primary"
          className="px-8 shadow-md border-transparent font-bold tracking-wider text-xs"
          onClick={handleSave}
          disabled={saving}
        >
          {saving ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </div>
  );
}
