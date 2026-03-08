
"use client";

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { 
  LayoutDashboard, 
  Radio, 
  History, 
  MapPin, 
  Search, 
  LocateFixed,
  Settings,
  Target
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UploadSection } from '@/components/UploadSection';
import { ChatPanel } from '@/components/ChatPanel';
import { AWSBadges } from '@/components/AWSBadges';
import { AWSServicesBar } from '@/components/AWSServicesBar';
import { AWSBrandingFooter } from '@/components/AWSBrandingFooter';
import { FeedPanel } from '@/components/FeedPanel';
import { LogsPanel } from '@/components/LogsPanel';
import { SettingsModal } from '@/components/SettingsModal';
import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/hooks/use-toast';
import { 
  UserLocation, 
  PRESET_LOCATIONS, 
  SEARCHABLE_CITIES, 
  getCurrentLocation 
} from '@/lib/location';
import { analyzeUploadedMediaForIncident } from '@/ai/flows/analyze-uploaded-media-for-incident';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Button } from '@/components/ui/button';

const MapPanel = dynamic(() => import('@/components/MapPanel').then((mod) => mod.MapPanel), { 
  ssr: false,
  loading: () => <div className="w-full h-full bg-neutral-900 animate-pulse rounded-[3rem]" />
});

const MOCK_COMMUNITY = [
  { id: '1', user: 'Ram', locationName: 'Chennai', location: { lat: 13.0827, lng: 80.2707 }, type: 'Electrical Hazard', severity: 'High', description: 'Transformer burst near T-Nagar. Live wires on road.', time: '10m ago', image: 'https://picsum.photos/seed/elec/800/600' },
  { id: '2', user: 'Reshma', locationName: 'Bangalore', location: { lat: 12.9716, lng: 77.5946 }, type: 'Flash Flood', severity: 'High', description: 'Heavy water logging in Silk Board junction. Traffic stalled.', time: '25m ago', image: 'https://picsum.photos/seed/flood/800/600' },
  { id: '3', user: 'Fazil', locationName: 'Beijing', location: { lat: 39.9042, lng: 116.4074 }, type: 'Structure Fire', severity: 'High', description: 'Commercial building fire reported in Chaoyang District.', time: '5m ago', image: 'https://picsum.photos/seed/beijing/800/600' },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState('grid');
  const [location, setLocation] = useState<UserLocation>(PRESET_LOCATIONS['Chennai HQ']);
  const [locationMode, setLocationMode] = useState<'gps' | 'fixed' | 'manual'>('fixed');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [incidentData, setIncidentData] = useState<any>(null);
  const [isEmergencyActive, setIsEmergencyActive] = useState(false);
  const [uploadedMedia, setUploadedMedia] = useState<string | null>(null);
  const [myLogs, setMyLogs] = useState<any[]>([]);
  const [searchOpen, setSearchOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const { toast } = useToast();

  const handleModeChange = async (mode: 'gps' | 'fixed' | 'manual') => {
    setLocationMode(mode);
    if (mode === 'gps') {
      const gpsLoc = await getCurrentLocation();
      setLocation(gpsLoc);
      toast({ title: "GPS ACQUIRED", description: "Centering on live coordinates." });
    } else if (mode === 'fixed') {
      setLocation(PRESET_LOCATIONS['Chennai HQ']);
      toast({ title: "HQ GRID LOCKED", description: "Defaulting to HQ sector." });
    }
  };

  const handleManualSelect = (city: any) => {
    setLocation({
      latitude: city.lat,
      longitude: city.lng,
      city: city.name,
      state: city.state,
      country: city.country || 'Global',
      mode: 'manual'
    });
    setSearchOpen(false);
    toast({ title: "GLOBAL RELOCATION", description: `SustAInex focus shifted to ${city.name}.` });
  };

  const handleUpload = async (dataUri: string) => {
    setUploadedMedia(dataUri);
    setIsAnalyzing(true);
    setAnalysisProgress(0);
    
    const interval = setInterval(() => {
      setAnalysisProgress(prev => {
        const next = prev + Math.random() * 25;
        return next >= 95 ? 95 : next;
      });
    }, 150);

    try {
      const configStr = localStorage.getItem('sentinel_dispatch_config');
      const config = configStr ? JSON.parse(configStr) : {};
      const apiKey = config.googleApiKey || config.geminiApiKey;

      const result = await analyzeUploadedMediaForIncident({
        mediaDataUri: dataUri,
        userLatitude: location.latitude,
        userLongitude: location.longitude,
        googleApiKey: apiKey,
      });

      clearInterval(interval);
      setAnalysisProgress(100);

      setTimeout(() => {
        setIsAnalyzing(false);
        setIncidentData({
          ...result,
          baseLat: location.latitude,
          baseLng: location.longitude
        });
        setIsEmergencyActive(true);
        
        setMyLogs(prev => [{ 
          ...result, 
          id: Date.now().toString(), 
          media: dataUri,
          city: location.city,
          lat: location.latitude,
          lng: location.longitude,
          timestamp: new Date().toLocaleTimeString()
        }, ...prev]);

        toast({ title: "THREAT CONFIRMED", description: `${result.incidentType} detected in sector.` });
      }, 500);
    } catch (error: any) {
      clearInterval(interval);
      setIsAnalyzing(false);
      setAnalysisProgress(0);
      
      const isAuthError = error.message?.toLowerCase().includes('key') || error.message?.toLowerCase().includes('api');
      toast({ 
        variant: "destructive", 
        title: isAuthError ? "CREDENTIAL FAILURE" : "SCAN FAILED", 
        description: isAuthError ? "The API key in settings is invalid or expired." : "Failed to decrypt sector data." 
      });
    }
  };

  const resetGrid = () => {
    setIncidentData(null);
    setIsEmergencyActive(false);
    setUploadedMedia(null);
    toast({ title: "GRID REFRESHED", description: "Tactical data cleared." });
  };

  return (
    <div className="h-screen flex flex-col bg-[#0F172A] text-[#F1F5F9] overflow-hidden" style={{ fontFamily: 'Arial, Helvetica, sans-serif' }}>
      
      {/* Header */}
      <header className="h-28 px-6 border-b border-[#334155] flex items-center justify-between bg-[#1E293B] z-[1001] shrink-0">
        {/* Left: Logo and Title */}
        <div className="flex items-center gap-6">
          <Image 
            src="/AWS.jpg" 
            alt="AWS Logo" 
            width={96} 
            height={96} 
            className="rounded-lg border border-[#FF9900]/50"
            priority
          />
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: 'bold' }} className="text-[#FF9900] leading-none">SustAInxt</h1>
            <p style={{ fontSize: '13px', marginTop: '12px' }} className="text-[#FFFFFF] leading-none">AWS Bedrock Powered Emergency Intelligence Platform</p>
          </div>
          
          {/* AWS Services */}
          <AWSServicesBar />
        </div>

        {/* Center: Search Location */}
        <div className="hidden md:block flex-1 mx-8">
          <Popover open={searchOpen} onOpenChange={setSearchOpen}>
            <PopoverTrigger asChild>
              <button style={{ fontSize: '14px' }} className="w-full h-10 bg-[#0F172A] border border-[#334155] rounded-lg px-4 flex items-center gap-3 text-[#94A3B8] hover:border-[#FF9900] hover:text-[#F1F5F9] transition-all">
                <Search className="w-4 h-4 text-[#FF9900]" />
                <span>{location.city || 'Enter location'}</span>
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-96 p-0 bg-[#1E293B] border border-[#334155] shadow-xl rounded-lg z-[2000]" align="center">
              <Command className="bg-transparent">
                <CommandInput placeholder="Search location..." style={{ fontSize: '14px' }} className="text-[#F1F5F9] border-[#334155]" />
                <CommandList className="max-h-64 p-2">
                  <CommandEmpty style={{ fontSize: '14px' }} className="p-4 text-[#94A3B8] text-center">No results found.</CommandEmpty>
                  <CommandGroup heading="Global Locations" style={{ fontSize: '12px' }} className="text-[#94A3B8]">
                    {SEARCHABLE_CITIES.map((city) => (
                      <CommandItem 
                        key={city.name} 
                        onSelect={() => handleManualSelect(city)}
                        style={{ fontSize: '14px' }}
                        className="text-[#F1F5F9] hover:bg-[#FF9900]/10 cursor-pointer rounded px-3 py-2 flex items-center gap-3"
                      >
                        <MapPin className="w-4 h-4 text-[#FF9900]" />
                        <div className="flex flex-col">
                          <span>{city.name}</span>
                          <span style={{ fontSize: '12px' }} className="text-[#94A3B8]">{city.country}</span>
                        </div>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>

        {/* Right: Location Modes & Settings */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex gap-2">
            <Button 
              onClick={() => handleModeChange('fixed')} 
              style={{ fontSize: '14px' }}
              title="Fixed location"
              className="w-10 h-10 rounded-lg bg-[#0F172A] border border-[#334155] text-[#94A3B8] hover:bg-[#FF9900] hover:text-black hover:border-[#FF9900] transition-all"
            >
              <LocateFixed className="w-4 h-4" />
            </Button>
            <Button 
              onClick={() => handleModeChange('gps')}
              style={{ fontSize: '14px' }}
              title="GPS location"
              className="w-10 h-10 rounded-lg bg-[#0F172A] border border-[#334155] text-[#94A3B8] hover:bg-[#FF9900] hover:text-black hover:border-[#FF9900] transition-all"
            >
              <Target className="w-4 h-4" />
            </Button>
          </div>

          <button 
            onClick={() => setIsSettingsOpen(true)}
            title="Settings"
            className="w-10 h-10 rounded-lg bg-[#0F172A] border border-[#334155] flex items-center justify-center text-[#94A3B8] hover:text-[#FF9900] hover:border-[#FF9900] transition-all"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 relative overflow-hidden bg-[#0F172A]">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
          
          {/* Tab Navigation */}
          <div className="border-b border-[#334155] bg-[#1E293B] px-6 py-0">
            <div className="flex gap-8 h-12 items-center">
              <button 
                onClick={() => setActiveTab('grid')}
                style={{ fontSize: '14px' }}
                className={`px-2 py-2 border-b-2 font-bold transition-all ${
                  activeTab === 'grid' 
                    ? 'text-[#FF9900] border-[#FF9900]' 
                    : 'text-[#94A3B8] border-transparent hover:text-[#F1F5F9]'
                }`}
              >
                Dashboard
              </button>
              <button 
                onClick={() => setActiveTab('feed')}
                style={{ fontSize: '14px' }}
                className={`px-2 py-2 border-b-2 font-bold transition-all ${
                  activeTab === 'feed' 
                    ? 'text-[#FF9900] border-[#FF9900]' 
                    : 'text-[#94A3B8] border-transparent hover:text-[#F1F5F9]'
                }`}
              >
                Incident Feed
              </button>
              <button 
                onClick={() => setActiveTab('logs')}
                style={{ fontSize: '14px' }}
                className={`px-2 py-2 border-b-2 font-bold transition-all ${
                  activeTab === 'logs' 
                    ? 'text-[#FF9900] border-[#FF9900]' 
                    : 'text-[#94A3B8] border-transparent hover:text-[#F1F5F9]'
                }`}
              >
                System Logs
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <TabsContent value="grid" className="flex-1 m-0 p-6 h-full overflow-hidden outline-none">
            <div className="h-full flex flex-col lg:flex-row gap-6">
              <div className="flex-[2] relative rounded-[12px] overflow-hidden border border-[#334155] bg-[#1E293B]">
                {/* Map Header */}
                <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/60 to-transparent p-4">
                  <h2 style={{ fontSize: '16px' }} className="font-bold text-[#F1F5F9]">Incident Intelligence Map</h2>
                  <p style={{ fontSize: '12px' }} className="text-[#94A3B8] mt-1">Real-time location monitoring</p>
                </div>
                <MapPanel 
                  initialLocation={location} 
                  isEmergencyActive={isEmergencyActive} 
                  incidentData={incidentData} 
                  onLocationChange={setLocation} 
                />
              </div>
              <div className="flex-1 overflow-hidden rounded-[12px] border border-[#334155] bg-[#1E293B]">
                {!isEmergencyActive ? (
                  <UploadSection onUpload={handleUpload} isAnalyzing={isAnalyzing} analysisProgress={analysisProgress} />
                ) : (
                  <ChatPanel data={incidentData!} onReset={resetGrid} location={location} uploadedMedia={uploadedMedia} />
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="feed" className="flex-1 m-0 p-6 overflow-y-auto outline-none bg-[#0F172A]">
            <FeedPanel items={MOCK_COMMUNITY} onSelect={(loc: any, name: string) => {
              setLocation({ latitude: loc.lat, longitude: loc.lng, city: name, mode: 'manual' });
              setActiveTab('grid');
              setIsEmergencyActive(false);
              toast({ title: "Location Updated", description: `Viewing activity in ${name}.` });
            }} />
          </TabsContent>

          <TabsContent value="logs" className="flex-1 m-0 p-6 overflow-y-auto outline-none bg-[#0F172A]">
            <LogsPanel logs={myLogs} />
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer style={{ fontSize: '12px' }} className="border-t border-[#334155] bg-[#1E293B] px-6 py-4 shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-[#94A3B8]">
            <span className="font-bold">Powered by AWS Infrastructure</span>
          </div>
          <div className="flex items-center gap-3 text-[#94A3B8]">
            <span style={{ fontSize: '12px' }} className="text-[#FF9900] font-bold">🧠 Bedrock</span>
            <span className="text-[#334155]">·</span>
            <span style={{ fontSize: '12px' }} className="text-[#FF9900] font-bold">⚡ Lambda</span>
            <span className="text-[#334155]">·</span>
            <span style={{ fontSize: '12px' }} className="text-[#FF9900] font-bold">🗄️ DynamoDB</span>
            <span className="text-[#334155]">·</span>
            <span style={{ fontSize: '12px' }} className="text-[#FF9900] font-bold">📦 S3</span>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
      <Toaster />
    </div>
  );
}
