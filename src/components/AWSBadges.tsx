"use client";

import React from 'react';
import { Cloud, Zap, Database, Cpu } from 'lucide-react';

export function AWSBadges() {
  const services = [
    { name: 'Bedrock', icon: '🧠', description: 'Gen AI' },
    { name: 'Lambda', icon: '⚡', description: 'Serverless' },
    { name: 'DynamoDB', icon: '🗄️', description: 'Database' },
    { name: 'S3', icon: '📦', description: 'Storage' },
  ];

  return (
    <div className="flex flex-wrap gap-2 items-center justify-center lg:justify-start">
      <span className="text-[9px] font-black text-[#FF9900] uppercase tracking-widest mr-2">Powered by:</span>
      {services.map((service) => (
        <div
          key={service.name}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#232F3E]/60 border border-[#FF9900]/30 hover:border-[#FF9900]/60 transition-all group cursor-default"
          title={`${service.name} - ${service.description}`}
        >
          <span className="text-sm group-hover:scale-110 transition-transform">{service.icon}</span>
          <span className="text-[8px] font-black text-white uppercase tracking-wider">{service.name}</span>
        </div>
      ))}
    </div>
  );
}
