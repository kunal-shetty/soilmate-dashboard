"use client";

import { useEffect, useState } from "react";
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

export const CameraFeed = ({
  isActive,
  cameraId,
  title,
  onStart,
  onStop,
  onScreenshot,
  handleAddCamera,
}: CameraFeedProps) => {
  const [ipAddress, setIpAddress] = useState("");
  const port = "8080";

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const ip = params.get("ip");

    if (!ip) {
      const userIp = prompt("Enter your IP address (example: 192.168.1.50)");
      if (userIp) {
        params.set("ip", userIp);
        window.location.search = params.toString(); // reload with new param
      }
    } else {
      setIpAddress(ip);
    }
  }, []);

  const finalAddress = `${ipAddress}:${port}`;

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
          
        </div>
      </CardHeader>

      {/* Feed area */}
      <CardContent className="relative">
        <div className="aspect-[16/10] bg-camera-bg flex items-center justify-center relative">
          {isActive ? (
            <div className="absolute inset-0">
              <iframe
                src={`http://${finalAddress}`}
        title="IP Camera Feed"
        allow="camera"
        scrolling="no"
        className="absolute top-1/2 left-1/2 border-0"
        style={{
          width: "100vh", // use the container's height
          height: "100vw", // use the container's width
          objectFit: "cover",
          transform: "translate(-50%, -50%) rotate(90deg)",
          transformOrigin: "center center",
                }}
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

          {/* Info overlay */}
          
        </div>
      </CardContent>
    </Card>
  );
};
