import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Camera, Wifi, WifiOff } from "lucide-react";

interface CameraFeedProps {
  isActive: boolean;
  cameraId: string;
  title: string;
}

export const CameraFeed = ({ isActive, cameraId, title }: CameraFeedProps) => {
  return (
    <Card className="relative overflow-hidden shadow-card transition-smooth hover:shadow-glow">
      {/* Camera Feed Area */}
      <div className="aspect-video bg-camera-bg flex items-center justify-center relative">
        {isActive ? (
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
            <Camera className="h-16 w-16 text-muted-foreground animate-pulse" />
            <div className="absolute bottom-4 left-4">
              <Badge variant="secondary" className="bg-success/20 text-success border-success/30">
                <Wifi className="h-3 w-3 mr-1" />
                LIVE
              </Badge>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-muted-foreground">
            <Camera className="h-16 w-16 mb-2 opacity-50" />
            <p className="text-sm">Camera Offline</p>
            <div className="absolute bottom-4 left-4">
              <Badge variant="secondary" className="bg-destructive/20 text-destructive border-destructive/30">
                <WifiOff className="h-3 w-3 mr-1" />
                OFFLINE
              </Badge>
            </div>
          </div>
        )}
        
        {/* Camera Info Overlay */}
        <div className="absolute top-4 left-4">
          <div className="bg-background/80 backdrop-blur-sm rounded px-2 py-1">
            <p className="text-xs font-medium">{title}</p>
            <p className="text-xs text-muted-foreground">ID: {cameraId}</p>
          </div>
        </div>
      </div>
    </Card>
  );
};