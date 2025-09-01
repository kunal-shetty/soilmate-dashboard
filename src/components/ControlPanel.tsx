import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Play, Square, RotateCcw, Settings, Activity, Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

interface ControlPanelProps {
  isActive: boolean;
  onStart: () => void;
  onStop: () => void;
}

export const ControlPanel = ({ isActive, onStart, onStop }: ControlPanelProps) => {
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
    } catch (error) {
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
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to stop camera",
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
      {/* Main Controls */}
      <Card className="bg-control-panel shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-primary" />
            Camera Controls
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-3">
            <Button
              onClick={handleStart}
              disabled={isActive || isLoading}
              className="flex-1 bg-gradient-primary hover:shadow-glow transition-bounce"
              size="lg"
            >
              <Play className="h-4 w-4 mr-2" />
              Start Camera
            </Button>
            <Button
              onClick={handleStop}
              disabled={!isActive || isLoading}
              variant="destructive"
              className="flex-1 bg-gradient-danger hover:shadow-accent-glow transition-bounce"
              size="lg"
            >
              <Square className="h-4 w-4 mr-2" />
              Stop Camera
            </Button>
          </div>
          
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
                    Add New Camera
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