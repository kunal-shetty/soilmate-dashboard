import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CameraFeed } from "./CameraFeed";
import { ControlPanel } from "./ControlPanel";
import { Shield, Wifi, AlertCircle, CheckCircle } from "lucide-react";

export const Dashboard = () => {
  const [isActive, setIsActive] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'connected' | 'disconnected' | 'checking'>('checking');

  useEffect(() => {
    // Simulate connection check
    const timer = setTimeout(() => {
      setConnectionStatus('connected');
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleStart = async () => {
    // Simulate API call to /start endpoint
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsActive(true);
  };

  const handleStop = async () => {
    // Simulate API call to /stop endpoint
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsActive(false);
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-6">
      {/* Header */}
      <header className="mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Shield className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                  SoilMate Guard Hub
                </h1>
                <p className="text-muted-foreground">IP Security Camera Control Panel</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <Badge 
              variant="secondary" 
              className={`
                ${connectionStatus === 'connected' 
                  ? 'bg-success/20 text-success border-success/30' 
                  : connectionStatus === 'disconnected'
                  ? 'bg-destructive/20 text-destructive border-destructive/30'
                  : 'bg-warning/20 text-warning border-warning/30'
                }
              `}
            >
              {connectionStatus === 'connected' && <CheckCircle className="h-3 w-3 mr-1" />}
              {connectionStatus === 'disconnected' && <AlertCircle className="h-3 w-3 mr-1" />}
              {connectionStatus === 'checking' && <Wifi className="h-3 w-3 mr-1 animate-pulse" />}
              {connectionStatus === 'connected' && 'Connected'}
              {connectionStatus === 'disconnected' && 'Disconnected'}
              {connectionStatus === 'checking' && 'Connecting...'}
            </Badge>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Camera Feed - Takes up 2/3 on large screens */}
        <div className="lg:col-span-2">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wifi className={`h-5 w-5 ${isActive ? 'text-success' : 'text-muted-foreground'}`} />
                Live Feed - Camera 01
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CameraFeed
                isActive={isActive}
                cameraId="CAM_001"
                title="SoilMate Security Camera"
              />
            </CardContent>
          </Card>

          {/* Storage and Uptime Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <Card className="bg-gradient-accent/10 border-accent/20">
              <CardContent className="pt-6">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-accent">2.4 GB</h3>
                  <p className="text-sm text-muted-foreground">Storage Used</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-success/10 border-success/20">
              <CardContent className="pt-6">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-success">
                    {isActive ? '99.9%' : '0%'}
                  </h3>
                  <p className="text-sm text-muted-foreground">Uptime</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Control Panel - Takes up 1/3 on large screens */}
        <div className="lg:col-span-1 space-y-6">
          {/* Active Cameras Card */}
          <Card className="bg-gradient-primary/10 border-primary/20">
            <CardContent className="pt-6">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-primary">
                  {isActive ? '1' : '0'}
                </h3>
                <p className="text-sm text-muted-foreground">Active Cameras</p>
              </div>
            </CardContent>
          </Card>

          <ControlPanel
            isActive={isActive}
            onStart={handleStart}
            onStop={handleStop}
          />
        </div>
      </div>
    </div>
  );
};