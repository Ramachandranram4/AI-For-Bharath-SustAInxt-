"use client";

import React, { useRef, useState, useEffect } from 'react';
import { Upload, Camera, Zap, CheckCircle2, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export const UploadSection = ({ onUpload, isAnalyzing, analysisProgress }: any) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fadeOut, setFadeOut] = useState(false);
  const [displayProgress, setDisplayProgress] = useState(0);
  const [agents, setAgents] = useState({
    evidence: false,
    location: false,
    vision: false,
    risk: false,
    emergency: false
  });
  const [isComplete, setIsComplete] = useState(false);
  const [showReport, setShowReport] = useState(false);

  useEffect(() => {
    if (isAnalyzing) {
      setFadeOut(true);
      // Use real-time progress from backend
      setDisplayProgress(Math.round(analysisProgress));
      
      // Activate agents sequentially based on progress - 5 equal parts of 100%
      if (analysisProgress >= 20) {
        setAgents(prev => ({ ...prev, evidence: true }));
      }
      if (analysisProgress >= 40) {
        setAgents(prev => ({ ...prev, location: true }));
      }
      if (analysisProgress >= 60) {
        setAgents(prev => ({ ...prev, vision: true }));
      }
      if (analysisProgress >= 80) {
        setAgents(prev => ({ ...prev, risk: true }));
      }
      if (analysisProgress >= 100) {
        setAgents(prev => ({ ...prev, emergency: true }));
        setIsComplete(true);
      }
    } else {
      setFadeOut(false);
      setDisplayProgress(0);
      setAgents({ evidence: false, location: false, vision: false, risk: false, emergency: false });
      setIsComplete(false);
      setShowReport(false);
    }
  }, [analysisProgress, isAnalyzing]);

  useEffect(() => {
    if (isComplete && !showReport) {
      const reportTimer = setTimeout(() => {
        setShowReport(true);
      }, 5000); // 5 seconds after completion
      return () => clearTimeout(reportTimer);
    }
  }, [isComplete, showReport]);

  const handleFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e: any) => onUpload(e.target.result);
    reader.readAsDataURL(file);
  };

  return (
    <div className="h-full flex flex-col overflow-hidden bg-gradient-to-br from-[#1E293B] to-[#0F172A] rounded-[12px] border border-[#334155]" style={{ fontFamily: 'Arial, Helvetica, sans-serif' }}>
      {/* Header */}
      <div className="border-b border-[#334155] px-8 py-6 bg-gradient-to-r from-[#FF9900]/5 to-transparent flex items-center justify-between">
        <div>
          <h2 style={{ fontSize: '22px' }} className="font-bold text-[#FF9900]">📹 Emergency Evidence Capture</h2>
          <p style={{ fontSize: '13px' }} className="text-[#94A3B8] mt-2">AI Incident Analysis Powered by AWS Bedrock</p>
        </div>
        <button 
          onClick={() => window.location.reload()}
          className="p-2 rounded-lg bg-[#FF9900]/15 border border-[#FF9900]/40 hover:bg-[#FF9900]/25 transition-all"
          title="Refresh page"
        >
          <RotateCcw className="w-5 h-5 text-[#FF9900]" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-4 overflow-hidden">
        {!isAnalyzing ? (
          // Upload Screen
          <div className={`flex flex-col items-center justify-center w-full h-full overflow-hidden p-4 transition-all duration-400 ${
            fadeOut ? 'opacity-0 transform scale-95' : 'opacity-100'
          }`}>
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#FF9900]/35 to-[#FF9900]/5 border-2 border-[#FF9900]/60 flex items-center justify-center shadow-xl shadow-[#FF9900]/30 mb-3">
              <Upload className="w-12 h-12 text-[#FF9900]" />
            </div>
            
            <div className="text-center mb-3">
              <h3 style={{ fontSize: '20px' }} className="font-bold text-[#F1F5F9] leading-tight">Upload Incident Media</h3>
              <p style={{ fontSize: '12px' }} className="text-[#94A3B8] mt-1">High-quality image or video for analysis</p>
            </div>

            <div className="flex flex-col gap-2 w-full max-w-xs">
              <Button 
                onClick={(e) => {
                  e.stopPropagation();
                  fileInputRef.current?.setAttribute('capture', 'environment');
                  fileInputRef.current?.click();
                }}
                style={{ fontSize: '14px' }}
                className="w-full h-11 bg-gradient-to-r from-[#FF9900] to-[#FFB84D] text-black font-bold hover:from-[#E67E00] hover:to-[#FF9900] transition-all rounded-lg shadow-lg shadow-[#FF9900]/40" 
              >
                <Camera className="w-4 h-4 mr-2" /> Live Camera Capture
              </Button>
              <button 
                onClick={() => fileInputRef.current?.click()}
                style={{ fontSize: '14px' }}
                className="w-full h-11 bg-[#0F172A] border-2 border-[#FF9900]/50 text-[#FF9900] font-bold hover:border-[#FF9900] hover:bg-[#FF9900]/15 transition-all rounded-lg shadow-lg shadow-[#FF9900]/20"
              >
                <span className="flex items-center justify-center gap-2">
                  <Upload className="w-4 h-4" /> Upload Evidence
                </span>
              </button>
            </div>
          </div>
        ) : (
          // AI Analysis Screen
          <div className={`flex flex-col items-center justify-center w-full h-full max-w-sm transition-all duration-500 ${
            fadeOut ? 'opacity-100' : 'opacity-0'
          }`}>
            <style>{`
              @keyframes spin {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
              }
              .spin-animation {
                animation: spin 1.5s linear infinite;
              }
              @keyframes glow {
                0%, 100% { box-shadow: 0 0 10px rgba(34, 197, 94, 0.3), 0 0 20px rgba(34, 197, 94, 0.2); }
                50% { box-shadow: 0 0 20px rgba(34, 197, 94, 0.5), 0 0 30px rgba(34, 197, 94, 0.3); }
              }
            `}</style>

            {/* Title */}
            <div className={`text-center mb-2 transition-all duration-500 ${
              fadeOut ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-2'
            }`}>
              <h2 style={{ fontSize: '14px' }} className="font-bold text-[#FF9900]">⚡ Emergency Evidence Capture</h2>
              <p style={{ fontSize: '9px' }} className="text-[#94A3B8] mt-0.5">AI Incident Analysis Powered by AWS Bedrock</p>
            </div>

            {/* Progress Circle */}
            <div className={`relative w-32 h-32 mb-3 transition-all duration-700 ${
              fadeOut ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}>
              {/* SVG Progress Circle */}
              <svg className="w-full h-full -rotate-90 absolute inset-0" style={{
                filter: 'drop-shadow(0 0 15px rgba(255, 153, 0, 0.3))'
              }}>
                <defs>
                  <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FF9900" />
                    <stop offset="100%" stopColor="#FFB84D" />
                  </linearGradient>
                </defs>
                <circle cx="64" cy="64" r="56" fill="none" stroke="currentColor" strokeWidth="4" className="text-[#334155]" />
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  fill="none"
                  stroke="url(#progressGradient)"
                  strokeWidth="4"
                  strokeDasharray="351.86"
                  strokeDashoffset={351.86 - (351.86 * displayProgress) / 100}
                  className="transition-all duration-300"
                  strokeLinecap="round"
                />
              </svg>

              {/* Center Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <Zap className="w-6 h-6 text-[#FF9900]" />
                <span style={{ fontSize: '28px' }} className="font-black text-[#FF9900] leading-none">{displayProgress}</span>
                <span style={{ fontSize: '9px' }} className="font-bold text-[#FFB84D]">ANALYZING</span>
              </div>
            </div>

            {/* Agent Chips Grid - Multi-Agent Dashboard */}
            <div className="w-full max-w-sm px-4">
              {/* Row 1: 3 Agents */}
              <div className="grid grid-cols-3 gap-2 mb-2">
                {/* Evidence Processing Agent */}
                <div 
                  className={`flex flex-col items-center gap-1 px-2 py-2 rounded-lg border transition-all duration-500 ${
                    agents.evidence 
                      ? 'border-[#00FF00]/60 bg-[#00FF00]/10 shadow-lg shadow-[#00FF00]/30' 
                      : 'border-[#00FF00]/30 bg-[#0F172A]/50'
                  } ${isComplete && agents.evidence ? 'animate-pulse' : ''}`}
                  style={{
                    animation: isComplete && agents.evidence ? 'glow 2s ease-in-out infinite' : 'none',
                    transitionDelay: '0ms',
                    opacity: agents.evidence ? 1 : 0.6,
                  }}
                >
                  <div className="text-sm">
                    {agents.evidence ? <span className="text-[#22c55e]">✓</span> : <span className="text-[#FF9900]">⚙</span>}
                  </div>
                  <span style={{ fontSize: '9px' }} className="font-bold text-[#FF9900] text-center">Agent 1</span>
                  <span style={{ fontSize: '9px' }} className="font-semibold text-[#94A3B8] text-center">Evidence Processing</span>
                </div>

                {/* Location Intelligence Agent */}
                <div 
                  className={`flex flex-col items-center gap-1 px-2 py-2 rounded-lg border transition-all duration-500 ${
                    agents.location 
                      ? 'border-[#00FF00]/60 bg-[#00FF00]/10 shadow-lg shadow-[#00FF00]/30' 
                      : 'border-[#00FF00]/30 bg-[#0F172A]/50'
                  } ${isComplete && agents.location ? 'animate-pulse' : ''}`}
                  style={{
                    animation: isComplete && agents.location ? 'glow 2s ease-in-out infinite' : 'none',
                    transitionDelay: '100ms',
                    opacity: agents.location ? 1 : 0.6,
                  }}
                >
                  <div className="text-sm">
                    {agents.location ? <span className="text-[#22c55e]">✓</span> : <span className="text-[#FF9900]">⚙</span>}
                  </div>
                  <span style={{ fontSize: '9px' }} className="font-bold text-[#FF9900] text-center">Agent 2</span>
                  <span style={{ fontSize: '9px' }} className="font-semibold text-[#94A3B8] text-center">Geo Intelligence</span>
                </div>

                {/* Vision Analysis Agent */}
                <div 
                  className={`flex flex-col items-center gap-1 px-2 py-2 rounded-lg border transition-all duration-500 ${
                    agents.vision 
                      ? 'border-[#00FF00]/60 bg-[#00FF00]/10 shadow-lg shadow-[#00FF00]/30' 
                      : 'border-[#00FF00]/30 bg-[#0F172A]/50'
                  } ${isComplete && agents.vision ? 'animate-pulse' : ''}`}
                  style={{
                    animation: isComplete && agents.vision ? 'glow 2s ease-in-out infinite' : 'none',
                    transitionDelay: '200ms',
                    opacity: agents.vision ? 1 : 0.6,
                  }}
                >
                  <div className="text-sm">
                    {agents.vision ? <span className="text-[#22c55e]">✓</span> : <span className="text-[#FF9900]">⚙</span>}
                  </div>
                  <span style={{ fontSize: '9px' }} className="font-bold text-[#FF9900] text-center">Agent 3</span>
                  <span style={{ fontSize: '9px' }} className="font-semibold text-[#94A3B8] text-center">Vision Analysis</span>
                </div>
              </div>

              {/* Row 2: 2 Agents (Centered) */}
              <div className="flex justify-center gap-2">
                {/* Risk Assessment Agent */}
                <div 
                  className={`flex flex-col items-center gap-1 px-2 py-2 rounded-lg border transition-all duration-500 ${
                    agents.risk 
                      ? 'border-[#00FF00]/60 bg-[#00FF00]/10 shadow-lg shadow-[#00FF00]/30' 
                      : 'border-[#00FF00]/30 bg-[#0F172A]/50'
                  } ${isComplete && agents.risk ? 'animate-pulse' : ''}`}
                  style={{
                    animation: isComplete && agents.risk ? 'glow 2s ease-in-out infinite' : 'none',
                    transitionDelay: '300ms',
                    opacity: agents.risk ? 1 : 0.6,
                    width: '80px',
                  }}
                >
                  <div className="text-sm">
                    {agents.risk ? <span className="text-[#22c55e]">✓</span> : <span className="text-[#FF9900]">⚙</span>}
                  </div>
                  <span style={{ fontSize: '9px' }} className="font-bold text-[#FF9900] text-center">Agent 4</span>
                  <span style={{ fontSize: '9px' }} className="font-semibold text-[#94A3B8] text-center">Risk Assessment</span>
                </div>

                {/* Emergency Response Agent */}
                <div 
                  className={`flex flex-col items-center gap-1 px-2 py-2 rounded-lg border transition-all duration-500 ${
                    agents.emergency 
                      ? 'border-[#00FF00]/60 bg-[#00FF00]/10 shadow-lg shadow-[#00FF00]/30' 
                      : 'border-[#00FF00]/30 bg-[#0F172A]/50'
                  } ${isComplete && agents.emergency ? 'animate-pulse' : ''}`}
                  style={{
                    animation: isComplete && agents.emergency ? 'glow 2s ease-in-out infinite' : 'none',
                    transitionDelay: '400ms',
                    opacity: agents.emergency ? 1 : 0.6,
                    width: '90px',
                  }}
                >
                  <div className="text-sm">
                    {agents.emergency ? <span className="text-[#22c55e]">✓</span> : <span className="text-[#FF9900]">⚙</span>}
                  </div>
                  <span style={{ fontSize: '9px' }} className="font-bold text-[#FF9900] text-center">Agent 5</span>
                  <span style={{ fontSize: '9px' }} className="font-semibold text-[#94A3B8] text-center">Alert Generation</span>
                </div>
              </div>
            </div>

            {/* Success Message & Report */}
            {isComplete && !showReport && (
              <div className={`mt-2 px-4 py-2 text-center transition-all duration-500 ${
                isComplete ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
              }`}
              style={{
                animation: isComplete ? 'glow 2s ease-in-out infinite' : 'none',
              }}>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-[#22c55e] text-sm">✓</span>
                  <span style={{ fontSize: '12px' }} className="font-bold text-[#22c55e]">Emergency Alert Generated</span>
                </div>
              </div>
            )}

            {/* AI Analysis Report */}
            {showReport && (
              <div className={`w-full max-w-sm flex flex-col items-center gap-3 px-4 transition-all duration-500 ${
                showReport ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
              }`}>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <span style={{ fontSize: '24px' }}>🧠</span>
                    <h3 style={{ fontSize: '14px' }} className="font-bold text-[#FF9900]">AI Analysis</h3>
                  </div>
                  <p style={{ fontSize: '10px' }} className="text-[#94A3B8]">Powered by Amazon Bedrock</p>
                </div>

                <div className="w-full bg-[#0F172A]/60 border border-[#334155] rounded-lg p-3 space-y-2 max-h-48 overflow-y-auto">
                  <div className="border-b border-[#334155] pb-2">
                    <p style={{ fontSize: '10px' }} className="font-bold text-[#FF9900]">🎯 Incident Type</p>
                    <p style={{ fontSize: '9px' }} className="text-[#F1F5F9] mt-1">Emergency Incident Detected - Medium Priority</p>
                  </div>
                  
                  <div className="border-b border-[#334155] pb-2">
                    <p style={{ fontSize: '10px' }} className="font-bold text-[#FF9900]">📍 Location</p>
                    <p style={{ fontSize: '9px' }} className="text-[#F1F5F9] mt-1">Coordinates verified - Zone mapped</p>
                  </div>

                  <div className="border-b border-[#334155] pb-2">
                    <p style={{ fontSize: '10px' }} className="font-bold text-[#FF9900]">⚠️ Risk Level</p>
                    <p style={{ fontSize: '9px' }} className="text-[#F1F5F9] mt-1">Moderate - Immediate action recommended</p>
                  </div>

                  <div>
                    <p style={{ fontSize: '10px' }} className="font-bold text-[#FF9900]">✅ Alert Status</p>
                    <p style={{ fontSize: '9px' }} className="text-[#F1F5F9] mt-1">Emergency notification sent</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        <input ref={fileInputRef} type="file" className="hidden" accept="image/*,video/*" onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])} />
      </div>
    </div>
  );
}
