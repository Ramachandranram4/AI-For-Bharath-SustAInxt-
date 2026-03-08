"use client";

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Activity, MapPin, Clock, ShieldCheck, Navigation, Globe, Languages } from 'lucide-react';

export const LogsPanel = ({ logs }: any) => {
  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-20">
      <div className="space-y-3">
        <h2 className="text-4xl font-black uppercase tracking-tight leading-none">Tactical <span className="text-primary">Logs</span></h2>
        <p className="text-xs font-semibold uppercase text-white/40 tracking-wider">Incident Response Records</p>
      </div>

      {logs.length === 0 ? (
        <Card className="bg-[#232F3E]/10 border border-dashed border-white/10 rounded-2xl py-32 flex flex-col items-center gap-6 opacity-40">
          <div className="w-20 h-20 rounded-lg border border-white/10 flex items-center justify-center">
            <ShieldCheck className="w-10 h-10 text-white" />
          </div>
          <p className="text-xs font-bold uppercase tracking-wider">No Records Found</p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {logs.map((log: any) => (
            <Card key={log.id} className="bg-[#232F3E]/20 border border-[#FF9900]/10 rounded-2xl overflow-hidden hover:border-primary/30 hover:bg-[#232F3E]/35 hover:shadow-lg hover:shadow-[#FF9900]/10 transition-all duration-300">
              <CardContent className="p-0 flex flex-col h-full">
                <div className="relative h-48 w-full overflow-hidden bg-black/40">
                  {log.media && log.media.startsWith('data:video') ? (
                    <video src={log.media} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" muted loop autoPlay />
                  ) : (
                    <img src={log.media} alt="Log" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                  <div className="absolute top-3 right-3">
                    <Badge className="bg-primary/20 text-primary font-semibold text-xs uppercase tracking-wide px-3 py-1.5 border border-primary/30 shadow-lg">
                      {log.severity}
                    </Badge>
                  </div>
                  <div className="absolute bottom-3 left-3 flex items-center gap-2">
                    <div className="w-9 h-9 rounded-lg bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center flex-shrink-0">
                      <Activity className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wide text-white block leading-none">{log.incidentType}</span>
                      <span className="text-[10px] font-semibold text-white/50 uppercase tracking-wider mt-0.5 block">Logged</span>
                    </div>
                  </div>
                </div>
                
                <div className="px-5 py-5 space-y-4 flex-1 flex flex-col">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <div className="flex flex-col min-w-0">
                        <span className="text-[10px] font-semibold text-white/40 uppercase tracking-wide">Location</span>
                        <span className="text-xs font-bold text-white uppercase tracking-wider truncate">{log.city || 'Global'}</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Clock className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <div className="flex flex-col min-w-0">
                        <span className="text-[10px] font-semibold text-white/40 uppercase tracking-wide">Time</span>
                        <span className="text-xs font-bold text-white uppercase tracking-wider truncate">{log.timestamp}</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Languages className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <div className="flex flex-col min-w-0">
                        <span className="text-[10px] font-semibold text-white/40 uppercase tracking-wide">Language</span>
                        <span className="text-xs font-bold text-white uppercase tracking-wider truncate">{log.language || 'Auto'}</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Globe className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <div className="flex flex-col min-w-0">
                        <span className="text-[10px] font-semibold text-white/40 uppercase tracking-wide">Region</span>
                        <span className="text-xs font-bold text-white uppercase tracking-wider truncate">Global</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-white/5">
                    <div className="flex flex-col gap-2">
                       <span className="text-xs font-semibold text-white/40 uppercase tracking-wider">Coordinates</span>
                       <div className="flex items-center gap-3 text-xs font-mono text-primary font-semibold">
                          <span className="flex items-center gap-1.5"><Navigation className="w-3 h-3 rotate-45" />{log.lat?.toFixed(4)}°</span>
                          <span className="flex items-center gap-1.5"><Navigation className="w-3 h-3" />{log.lng?.toFixed(4)}°</span>
                       </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};