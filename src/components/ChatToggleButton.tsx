"use client";

import React from 'react';
import { MessageCircle, X } from 'lucide-react';

interface ChatToggleButtonProps {
  isOpen: boolean;
  onToggle: () => void;
  isChatActive: boolean;
}

export function ChatToggleButton({ isOpen, onToggle, isChatActive }: ChatToggleButtonProps) {
  return (
    <div className="fixed bottom-8 right-8 z-[1000]">
      <button
        onClick={onToggle}
        disabled={!isChatActive}
        aria-label={isOpen ? "Close AI Assistant" : "Open AI Assistant"}
        title={isChatActive ? "AI Rural Assistant" : "Activate emergency to chat"}
        className={`
          relative w-16 h-16 rounded-full flex items-center justify-center
          transition-all duration-300 ease-out
          border border-transparent
          shadow-2xl
          ${isChatActive
            ? 'bg-[#1B5E20] hover:bg-[#2D7F31] cursor-pointer'
            : 'bg-gray-500 cursor-not-allowed opacity-50'
          }
          ${isOpen ? 'ring-4 ring-[#FF9900]/40' : 'hover:ring-2 hover:ring-[#FF9900]/20'}
          group
        `}
      >
        {/* Animated background glow when emergency is active */}
        {isChatActive && !isOpen && (
          <div className="absolute inset-0 rounded-full bg-[#1B5E20]/20 animate-pulse" />
        )}
        
        {/* Icon transition */}
        <div className="relative w-8 h-8 flex items-center justify-center text-white">
          {isOpen ? (
            <X className="w-6 h-6 animate-in zoom-in-150 duration-200" />
          ) : (
            <MessageCircle className="w-6 h-6 animate-in zoom-in-150 duration-200" />
          )}
        </div>

        {/* Tooltip visible on hover */}
        <div className="absolute bottom-full right-0 mb-3 px-3 py-2 bg-[#232F3E] text-white text-[11px] font-black tracking-widest rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none shadow-lg border border-white/10">
          {isChatActive
            ? isOpen
              ? "CLOSE ASSISTANT"
              : "OPEN ASSISTANT"
            : "ACTIVATE EMERGENCY"
          }
        </div>
      </button>

      {/* Notification dot when chat has unread or new data */}
      {isChatActive && !isOpen && (
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#FF9900] rounded-full animate-pulse shadow-lg" />
      )}

      //9,84,05,10,097
    </div>
  );
}
