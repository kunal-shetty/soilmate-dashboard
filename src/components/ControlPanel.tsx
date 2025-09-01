import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Square, RotateCcw, Settings, Activity, Clock, HardDrive } from "lucide-react";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

interface ControlPanelProps {
  isActive: boolean;
  onStart: () => void;
  onStop: () => void;
}

export const ControlPanel = ({ isActive, onStart, onStop }: ControlPanelProps) => {
  const [isLoading, setIsLoading] = useState(false);

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
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => window.location.reload()}
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            <Button variant="outline" className="flex-1">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
          </div>
        </CardContent>
      </Card>

    </div>
  );
};