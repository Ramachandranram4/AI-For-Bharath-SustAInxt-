"use client";

import React, { useState } from 'react';
import { Cloud, Database, Zap, Package, Lock, BarChart3, Cpu } from 'lucide-react';

export function AWSInfrastructureInfo() {
  const [isExpanded, setIsExpanded] = useState(false);

  const infrastructure = [
    {
      service: 'Amazon Bedrock',
      icon: '🧠',
      description: 'Foundation Models',
      capabilities: ['Text Generation', 'RAG', 'Multi-modal', 'Agent Support'],
      usage: 'Core AI/ML inference and generative capabilities'
    },
    {
      service: 'AWS Lambda',
      icon: '⚡',
      description: 'Serverless Compute',
      capabilities: ['Event-driven', 'Auto-scaling', 'Pay-per-use'],
      usage: 'Backend workflow orchestration and API handlers'
    },
    {
      service: 'Amazon DynamoDB',
      icon: '🗄️',
      description: 'NoSQL Database',
      capabilities: ['Real-time', 'Scalable', 'Global tables'],
      usage: 'Incident logs, user data, and real-time analytics'
    },
    {
      service: 'Amazon S3',
      icon: '📦',
      description: 'Object Storage',
      capabilities: ['Durable', 'Secure', 'Global access'],
      usage: 'Media uploads, incident footage, backup storage'
    },
    {
      service: 'Amazon API Gateway',
      icon: '🔌',
      description: 'API Management',
      capabilities: ['REST APIs', 'Rate limiting', 'CORS handling'],
      usage: 'Frontend-backend communication and external integrations'
    },
    {
      service: 'Amazon EC2',
      icon: '🖥️',
      description: 'Compute Instances',
      capabilities: ['Flexible', 'Scalable', 'Full control'],
      usage: 'Optional deployment for specialized workloads'
    },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        className="cursor-pointer p-6 rounded-xl bg-gradient-to-r from-[#FF9900]/20 to-[#FF9900]/10 border border-[#FF9900]/40 hover:border-[#FF9900]/60 transition-all"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Cloud className="w-6 h-6 text-[#FF9900]" />
            <div>
              <h3 className="text-sm font-black text-white uppercase tracking-widest">AWS Infrastructure Architecture</h3>
              <p className="text-xs text-white/60 mt-1">Click to view all AWS services in use</p>
            </div>
          </div>
          <div className={`text-[#FF9900] transition-transform ${isExpanded ? 'rotate-180' : ''}`}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </div>

      {isExpanded && (
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {infrastructure.map((service) => (
            <div
              key={service.service}
              className="p-4 rounded-lg bg-[#232F3E]/60 border border-[#FF9900]/20 hover:border-[#FF9900]/40 transition-all hover:shadow-lg hover:shadow-[#FF9900]/10"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">{service.icon}</span>
                <div>
                  <h4 className="text-sm font-black text-[#FF9900] uppercase tracking-wider">{service.service}</h4>
                  <p className="text-xs text-white/60">{service.description}</p>
                </div>
              </div>
              <p className="text-xs text-white/70 mb-3 font-semibold">{service.usage}</p>
              <div className="flex flex-wrap gap-1">
                {service.capabilities.map((cap) => (
                  <span
                    key={cap}
                    className="text-[7px] px-2 py-1 rounded bg-[#FF9900]/10 border border-[#FF9900]/30 text-white font-bold uppercase tracking-wider"
                  >
                    {cap}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
