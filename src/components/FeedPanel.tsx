"use client";

import React from 'react';
import dynamic from 'next/dynamic';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Clock } from 'lucide-react';

const MiniMap = dynamic(() => import('@/components/MapPanel').then((mod) => mod.MapPanel), { 
  ssr: false,
  loading: () => <div className="w-full h-full bg-neutral-900 animate-pulse" />
});

export const FeedPanel = ({ items, onSelect }: any) => {
  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-20">
      <div className="flex items-end justify-between px-0">
        <div className="space-y-3">
          <h2 className="text-4xl font-black uppercase tracking-tight leading-none">Community <span className="text-primary">Grid</span></h2>
          <p className="text-xs font-semibold uppercase text-white/40 tracking-wider">Live Incident Feed</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item: any) => (
          <Card key={item.id} className="bg-[#232F3E]/20 border border-[#FF9900]/10 rounded-2xl overflow-hidden group cursor-pointer hover:border-primary/40 hover:bg-[#232F3E]/35 hover:shadow-lg hover:shadow-[#FF9900]/10 transition-all duration-300 flex flex-col" onClick={() => onSelect(item.location, item.locationName)}>
            <div className="relative h-56 w-full bg-gradient-to-b from-transparent to-black">
              <div className="absolute inset-0 pointer-events-none z-10 opacity-60 group-hover:opacity-80 transition-opacity duration-300">
                 <MiniMap initialLocation={{ latitude: item.location.lat, longitude: item.location.lng, city: item.locationName }} isEmergencyActive={false} />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-20" />
              <Badge className="absolute top-4 right-4 bg-red-500/20 text-red-300 font-bold text-xs uppercase border border-red-500/30 px-3 py-1.5 z-30 shadow-lg">{item.severity}</Badge>
              <div className="absolute bottom-4 left-4 z-30">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/20 border border-primary/40 flex items-center justify-center text-xs font-bold text-primary uppercase backdrop-blur-md">{item.user[0]}</div>
                  <div>
                    <h4 className="text-xs font-bold uppercase text-white leading-none">{item.user}</h4>
                    <div className="flex items-center gap-1.5 text-primary text-[10px] font-semibold uppercase mt-1.5">
                      <MapPin className="w-3 h-3" /> {item.locationName}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <CardContent className="px-6 py-5 space-y-4 flex-1 flex flex-col">
              <h3 className="text-base font-bold uppercase text-white tracking-tight group-hover:text-primary transition-colors duration-200">{item.type}</h3>
              <p className="text-xs text-white/50 line-clamp-2 leading-relaxed font-medium flex-1">{item.description}</p>
              <div className="flex items-center gap-2 text-xs text-white/30 uppercase font-semibold pt-3 border-t border-white/5 mt-auto">
                <Clock className="w-3 h-3" /> {item.time}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
