import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CameraFeed } from "./CameraFeed";
import { Shield, Wifi, AlertCircle, CheckCircle, Activity, Droplets, Thermometer, Leaf, BarChart2, LayoutDashboard } from "lucide-react";
import { ipAddress } from "./CameraFeed";
import { toast } from "@/hooks/use-toast";
import {
  LineChart, Line, BarChart, Bar,
  XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer,
  Label
} from "recharts";

// Sidebar component
const Sidebar = ({ active, setActive }: { active: string; setActive: (val: string) => void }) => {
  const navItems = [
    { key: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { key: "analytics", label: "Analytics", icon: Activity },
    { key: "charts", label: "Charts", icon: BarChart2 },
    { key: "trends", label: "Trends", icon: BarChart2},
    { key: "settings", label: "Settings", icon: BarChart2},
    { key: "subscription", label: "Subscription", icon: BarChart2},
    { key: "help", label: "Help & Support", icon: BarChart2},
    { key: "about", label: "About", icon: BarChart2},
  ];

  return (
    <aside className="h-screen w-60 bg-background border-r shadow-md p-4 space-y-4 fixed top-0 left-0">
      <div className="flex items-center gap-2 mb-6">
        <Shield className="h-7 w-7 text-primary" />
        <h2 className="font-bold text-xl">SoilMate</h2>
      </div>
      <nav className="space-y-2">
        {navItems.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setActive(key)}
            className={`flex items-center gap-3 w-full px-3 py-2 rounded-lg transition ${
              active === key ? "bg-primary/10 text-primary font-semibold" : "text-muted-foreground hover:bg-muted"
            }`}
          >
            <Icon className="h-5 w-5" />
            {label}
          </button>
        ))}
      </nav>
    </aside>
  );
};

export const Dashboard = () => {
  const [isActive, setIsActive] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'connected' | 'disconnected' | 'checking'>('checking');
  const [activityLog, setActivityLog] = useState<string[]>([]);
  const [activePage, setActivePage] = useState("dashboard");
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [newCameraIP, setNewCameraIP] = useState("");
  const [liveData, setLiveData] = useState({
  moisture: " - ",
  fertility: " - ",
  ph: " - ",
});
const [history, setHistory] = useState<{time: string, moisture: number, fertility: number, pH: number}[]>([]);

  // Dynamic soil data
  const [moisture, setMoisture] = useState(" - ");
  const [temperature, setTemperature] = useState(" - ");
  const [ph, setPh] = useState(" - ");

  useEffect(() => {
    const timer = setTimeout(() => {
      setConnectionStatus("connected");
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Randomize soil data every 6 sec
  useEffect(() => {
  if (!isActive) return;
  const interval = setInterval(() => {
    const newMoisture = Math.floor(Math.random() * 100); // 0–100 %
    const newTemp = Math.floor(Math.random() * 6 + 26); // 0–50 °C
    const newPh = parseFloat((Math.random() * 3 + 4.5).toFixed(1)); // 4.5–7.5
    const newData = {
      moisture: newMoisture,
      fertility: Math.floor(Math.random() * 10) + 1,
      ph: newPh
    };

    setLiveData(newData);
    setMoisture(newMoisture);
    setTemperature(newTemp);
    setPh(newPh);

    setHistory((prev) => [
      ...prev.slice(-11), // keep last 12 entries (~1 min if 5s interval)
      {
        time: new Date().toLocaleTimeString().split(" ")[0],
        moisture: newData.moisture,
        fertility: newData.fertility,
        pH: newData.ph
      },
    ]);

    anomalyCheck(newMoisture, newTemp, newPh);
  }, 5000);

  return () => clearInterval(interval);
}, [isActive]);

  const addLog = (msg: string) => {
    setActivityLog((prev) => [`${new Date().toLocaleTimeString()} - ${msg}`, ...prev].slice(0, 5));
  };

  // Anomaly detection
const anomalyCheck = (moisture: number, temperature: number, ph: number) => {
  if (moisture < 20)
    addLog("⚠️ Soil too dry!");

  if (ph < 5.5) 
    addLog("⚠️ Soil too acidic!");
};

  const handleStart = async () => {
    await fetch(`http://${ipAddress}/start`);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsActive(true);
    addLog("Camera started");
  };

  const handleStop = async () => {
    await fetch(`http://${ipAddress}/stop`);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsActive(false);
    setTemperature(" - ");
    setMoisture(" - ");
    setPh(" - ");
    addLog("Camera stopped");
  };

  const handleScreenshot = async () => {
    try {
      const baseUrl = `http://${ipAddress}`;
      const res = await fetch(`${baseUrl}/screenshot`);
      if (!res.ok) throw new Error("No screenshot available");
      window.open(`${baseUrl}/screenshot`, "_blank");
      addLog("Screenshot captured");
    } catch (err) {
      console.error(err);
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
    <div className="flex">
      {/* Sidebar */}
      <Sidebar active={activePage} setActive={setActivePage} />

      {/* Main Content */}
      <main className="ml-60 flex-1 p-6 bg-background text-foreground min-h-screen">
        {activePage === "dashboard" && (
          <>
            {/* Header */}
            <header className="mb-8 flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold">Dashboard</h1>
                <p className="text-muted-foreground">Surveillance & Soil Monitoring</p>
              </div>
              <Badge
                variant="secondary"
                className={`
                  ${connectionStatus === "connected"
                    ? "bg-success/20 text-success border-success/30"
                    : connectionStatus === "disconnected"
                    ? "bg-destructive/20 text-destructive border-destructive/30"
                    : "bg-warning/20 text-warning border-warning/30"}
                `}
              >
                {connectionStatus === "connected" && <CheckCircle className="h-3 w-3 mr-1" />}
                {connectionStatus === "disconnected" && <AlertCircle className="h-3 w-3 mr-1" />}
                {connectionStatus === "checking" && <Wifi className="h-3 w-3 mr-1 animate-pulse" />}
                {connectionStatus === "connected" && "Connected"}
                {connectionStatus === "disconnected" && "Disconnected"}
                {connectionStatus === "checking" && "Connecting..."}
              </Badge>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Camera Feed */}
              <div className="lg:col-span-2">
                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Wifi className={`h-5 w-5 ${isActive ? "text-success" : "text-muted-foreground"}`} />
                      Live Feed - Camera 01
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CameraFeed isActive={isActive} cameraId="CAM_001" title="SoilMate Security Camera" onStart={handleStart} onStop={handleStop} onScreenshot={handleScreenshot} handleAddCamera={handleAddCamera}/>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar content */}
              <div className="lg:col-span-1 space-y-6">
                {/* Active Cameras */}
                <Card className="bg-gradient-primary/10 border-primary/20">
                  <CardContent className="pt-6 text-center">
                    <h3 className="text-2xl font-bold text-primary">{isActive ? "1" : "0"}</h3>
                    <p className="text-sm text-muted-foreground">Active Cameras</p>
                  </CardContent>
                </Card>

                {/* Soil Data */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Leaf className="h-5 w-5 text-green-600" /> Soil Health
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <Droplets className="h-5 w-5 mx-auto text-blue-500" />
                      <p className="font-bold">{moisture}%</p>
                      <p className="text-xs text-muted-foreground">Moisture</p>
                    </div>
                    <div>
                      <Thermometer className="h-5 w-5 mx-auto text-red-500" />
                      <p className="font-bold">{temperature}°C</p>
                      <p className="text-xs text-muted-foreground">Temp</p>
                    </div>
                    <div>
                      <Activity className="h-5 w-5 mx-auto text-purple-500" />
                      <p className="font-bold">{ph}</p>
                      <p className="text-xs text-muted-foreground">pH Level</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Activity Log */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Activity className="h-5 w-5 text-primary" /> Activity Log
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      {activityLog.length > 0 ? (
                        activityLog.map((log, i) => <li key={i}>• {log}</li>)
                      ) : (
                        <li>No recent activity</li>
                      )}
                    </ul>
                  </CardContent>
                </Card>

                {/* Control Panel */}
              </div>
            </div>
          </>
        )}

        {activePage === "analytics" && (
  <div className="space-y-6">
    <h1 className="text-2xl font-bold mb-4">Analytics</h1>
    <p className="text-muted-foreground mb-6">
      Live soil trend analysis with randomized demo values every 5 seconds.
    </p>

    {/* Summary cards */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Moisture</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{liveData.moisture}%</p>
          <p className="text-sm text-muted-foreground">Optimal: 40–60%</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Fertility</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{liveData.fertility}</p>
          <p className="text-sm text-muted-foreground">Scale 1–10</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>pH Level</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{liveData.ph}</p>
          <p className="text-sm text-muted-foreground">Neutral: 6.0–7.5</p>
        </CardContent>
      </Card>
    </div>

    {/* Line Chart for Moisture & Fertility */}
    <Card>
      <CardHeader>
        <CardTitle>Soil Trends (last 60 sec)</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={history}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="moisture"
              stroke="#3b82f6"
              name="Moisture %"
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="fertility"
              stroke="#10b981"
              name="Fertility"
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="pH"
              stroke="#de3163"
              name="pH level"
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>

  </div>
)}

        {activePage === "charts" && (
  <div className="space-y-8">
    <h1 className="text-2xl font-bold mb-4">Charts</h1>
    <p className="text-muted-foreground mb-6">
      Key reference charts on soil health, crop requirements, and farming best practices.
    </p>

    {/* Optimal pH Range for Common Crops */}
    <Card>
      <CardHeader>
        <CardTitle>Optimal Soil pH Range for Crops</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={[
              { crop: "Wheat", phLow: 6.0, phHigh: 7.5 },
              { crop: "Rice", phLow: 5.5, phHigh: 7.0 },
              { crop: "Corn", phLow: 5.8, phHigh: 7.0 },
              { crop: "Potato", phLow: 5.0, phHigh: 6.5 },
              { crop: "Soybean", phLow: 6.0, phHigh: 7.0 },
              { crop: "Tomato", phLow: 6.0, phHigh: 6.8 },
            ]}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="crop" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="phLow" fill="#60a5fa" name="pH Min" />
            <Bar dataKey="phHigh" fill="#34d399" name="pH Max" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>

    {/* Nutrient Requirements (NPK for crops) */}
    <Card>
      <CardHeader>
        <CardTitle>Average NPK Requirements for Major Crops (kg/ha)</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={[
              { crop: "Wheat", N: 120, P: 60, K: 40 },
              { crop: "Rice", N: 150, P: 80, K: 60 },
              { crop: "Corn", N: 180, P: 70, K: 50 },
              { crop: "Potato", N: 160, P: 80, K: 120 },
              { crop: "Soybean", N: 100, P: 60, K: 40 },
            ]}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="crop" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="N" fill="#ef4444" name="Nitrogen (N)" />
            <Bar dataKey="P" fill="#3b82f6" name="Phosphorus (P)" />
            <Bar dataKey="K" fill="#f59e0b" name="Potassium (K)" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>

    {/* Soil Moisture Retention by Soil Type */}
    <Card>
      <CardHeader>
        <CardTitle>Soil Moisture Retention by Soil Type (%)</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={[
              { type: "Sandy", retention: 10 },
              { type: "Loamy", retention: 25 },
              { type: "Clay", retention: 40 },
              { type: "Silty", retention: 30 },
              { type: "Peaty", retention: 50 },
            ]}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="type" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="retention" stroke="#8b5cf6" name="Moisture Retention" />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>

    {/* Crop Water Requirements */}
    <Card>
      <CardHeader>
        <CardTitle>Water Requirement of Crops (mm/season)</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={[
              { crop: "Wheat", water: 450 },
              { crop: "Rice", water: 1200 },
              { crop: "Corn", water: 600 },
              { crop: "Potato", water: 500 },
              { crop: "Sugarcane", water: 1800 },
            ]}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="crop" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="water" fill="#06b6d4" name="Water Requirement" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  </div>
)}

      </main>
    </div>
  );
};
