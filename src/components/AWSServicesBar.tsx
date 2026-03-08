"use client";

import React from 'react';

const services = [
  {
    name: 'Amazon Bedrock',
    short: 'Bedrock',
    emoji: '🧠',
    description: 'Foundation Models & Gen AI',
    color: '#FF9900'
  },
  {
    name: 'AWS Lambda',
    short: 'Lambda',
    emoji: '⚡',
    description: 'Serverless Compute',
    color: '#FF9900'
  },
  {
    name: 'DynamoDB',
    short: 'DynamoDB',
    emoji: '🗄️',
    description: 'Database & Analytics',
    color: '#FF9900'
  },
  {
    name: 'Amazon S3',
    short: 'S3',
    emoji: '📦',
    description: 'Storage & Backup',
    color: '#FF9900'
  },
];

export function AWSServicesBar() {
  return (
    <div style={{ fontFamily: 'Arial, Helvetica, sans-serif' }} className="hidden lg:flex items-center gap-3 ml-8 pl-8 border-l border-[#334155]">
      <span style={{ fontSize: '11px' }} className="text-[#94A3B8] uppercase font-bold">Services:</span>
      <div className="flex items-center gap-4">
        {services.map((service, idx) => (
          <div
            key={service.short}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#FF9900]/8 border border-[#FF9900]/20 hover:bg-[#FF9900]/15 hover:border-[#FF9900]/40 transition-all cursor-default group"
          >
            <span style={{ fontSize: '14px' }}>{service.emoji}</span>
            <span style={{ fontSize: '12px' }} className="text-[#FF9900] font-bold group-hover:text-white transition-colors">
              {service.short}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
