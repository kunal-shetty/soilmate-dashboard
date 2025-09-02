import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Camera, Wifi, WifiOff, Play, Square } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CameraFeedProps {
  isActive: boolean;
  cameraId: string;
  title: string;
  onStart: () => void;
  onStop: () => void;
  onScreenshot: () => void;
  handleAddCamera: () => void;
}

export const urlParams = new URLSearchParams(window.location.search);
export const ipAddress = urlParams.get("ip") || "192.168.1.100:8080";

export const CameraFeed = ({
  isActive,
  cameraId,
  title,
  onStart,
  onStop,
  onScreenshot,
  handleAddCamera
}: CameraFeedProps) => {
  return (
    <Card className="relative overflow-hidden shadow-card transition-smooth hover:shadow-glow">
      {/* Header with title + controls */}
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
        <div className="flex gap-2">
          <Button
            onClick={onStart}
            disabled={isActive}
            size="sm"
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            <Play className="h-4 w-4" />
          </Button>
          <Button
            onClick={onStop}
            disabled={!isActive}
            size="sm"
            variant="destructive"
          >
            <Square className="h-4 w-4" />
          </Button>
          <Button
            onClick={onScreenshot}
            disabled={!isActive}
            size="sm"
            variant="secondary"
          >
            <Camera className="h-4 w-4" />
          </Button>
          <Button
            onClick={handleAddCamera}
            size="sm"
            variant="secondary"
          >
            <Camera className="h-4 w-4" />
            
          </Button>
        </div>
      </CardHeader>

      {/* Feed area */}
      <CardContent className="relative">
        <div className="aspect-[16/10] bg-camera-bg flex items-center justify-center relative">
          {isActive ? (
            <div className="absolute inset-0">
              <iframe
                src={`http://${ipAddress}`}
                className="w-full h-full border-0"
                title="IP Camera Feed"
                allow="camera"
                style={{
                  overflow: "hidden",
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
                scrolling="no"
              />

              <div className="absolute bottom-4 left-4">
                <Badge
                  variant="secondary"
                  className="bg-success/20 text-success border-success/30"
                >
                  <Wifi className="h-3 w-3 mr-1" />
                  LIVE
                </Badge>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-muted-foreground h-full w-full">
              <Camera className="h-16 w-16 mb-2 opacity-50" />
              <p className="text-sm">Camera Offline</p>
              <div className="absolute bottom-4 left-4">
                <Badge
                  variant="secondary"
                  className="bg-destructive/20 text-destructive border-destructive/30"
                >
                  <WifiOff className="h-3 w-3 mr-1" />
                  OFFLINE
                </Badge>
              </div>
            </div>
          )}

          {/* Info overlay bottom-left */}
          <div className="absolute top-4 left-4 bg-background/80 backdrop-blur-sm rounded px-2 py-1">
            <p className="text-xs font-medium">ID: {cameraId}</p>
            <p className="text-xs text-muted-foreground">IP: {ipAddress}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
