import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Play, Square, RotateCcw, Settings, Activity, Camera, Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

interface ControlPanelProps {
  isActive: boolean;
  onStart: () => void;
  onStop: () => void;
  onScreenshot: () => void;
}

export const ControlPanel = ({ isActive, onStart, onStop, onScreenshot }: ControlPanelProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [newCameraIP, setNewCameraIP] = useState("");

  const handleStart = async () => {
    setIsLoading(true);
    try {
      await onStart();
      toast({
        title: "Camera Started",
        description: "SoilMate security camera is now active",
      });
    } catch {
      toast({
        title: "Error",
        description: "Failed to start camera",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleStop = async () => {
    setIsLoading(true);
    try {
      await onStop();
      toast({
        title: "Camera Stopped",
        description: "SoilMate security camera has been stopped",
      });
    } catch {
      toast({
        title: "Error",
        description: "Failed to stop camera",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleScreenshot = async () => {
    setIsLoading(true);
    try {
      await onScreenshot();
      toast({
        title: "Screenshot Captured",
        description: "Screenshot saved successfully",
      });
    } catch {
      toast({
        title: "Error",
        description: "Failed to capture screenshot",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddCamera = () => {
    if (newCameraIP.trim()) {
      toast({
        title: "Camera Added",
        description: `New camera with IP ${newCameraIP} has been added`,
      });
      setNewCameraIP("");
      setIsSettingsOpen(false);
    } else {
      toast({
        title: "Error",
        description: "Please enter a valid IP address",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <Card className="shadow-md rounded-2xl border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg font-semibold">
            <Activity className="h-5 w-5 text-primary" />
            Camera Controls
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          {/* Main action buttons */}
          <div className="flex gap-3">
            <Button
              onClick={handleStart}
              disabled={isActive || isLoading}
              className="flex-1"
              size="lg"
            >
              <Play className="h-4 w-4 mr-2" />
              Start
            </Button>
            <Button
              onClick={handleStop}
              disabled={!isActive || isLoading}
              variant="destructive"
              className="flex-1"
              size="lg"
            >
              <Square className="h-4 w-4 mr-2" />
              Stop
            </Button>
            <Button
              onClick={handleScreenshot}
              disabled={!isActive || isLoading}
              variant="secondary"
              className="flex-1"
              size="lg"
            >
              <Camera className="h-4 w-4 mr-2" />
              Screenshot
            </Button>
          </div>

          {/* Refresh + Settings */}
          <div className="flex gap-3">
            <Button variant="outline" className="flex-1">
              <RotateCcw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="flex-1">
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Camera Settings</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="ip" className="text-right">
                      Camera IP
                    </Label>
                    <Input
                      id="ip"
                      placeholder="192.168.1.100"
                      value={newCameraIP}
                      onChange={(e) => setNewCameraIP(e.target.value)}
                      className="col-span-3"
                    />
                  </div>
                  <Button onClick={handleAddCamera} className="w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Camera
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
