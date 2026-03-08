"use client";

import React from 'react';

export function AWSBrandingFooter() {
  return (
    <div className="w-full bg-gradient-to-r from-[#232F3E] via-[#37475A] to-[#232F3E] border-t border-[#FF9900]/20 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#FF9900]/20 flex items-center justify-center border border-[#FF9900]/40">
            <span className="text-sm font-black">☁️</span>
          </div>
          <div>
            <p className="text-xs font-black text-[#FF9900] uppercase tracking-widest">Powered by Amazon Web Services</p>
            <p className="text-[8px] text-white/60 mt-0.5">Built with Bedrock Foundation Models & Managed Services</p>
          </div>
        </div>
        <div className="flex gap-2 text-[7px] uppercase font-bold text-white/60">
          <span className="px-2 py-1 rounded bg-[#232F3E]/80 border border-[#FF9900]/20">Bedrock</span>
          <span className="px-2 py-1 rounded bg-[#232F3E]/80 border border-[#FF9900]/20">Lambda</span>
          <span className="px-2 py-1 rounded bg-[#232F3E]/80 border border-[#FF9900]/20">DynamoDB</span>
          <span className="px-2 py-1 rounded bg-[#232F3E]/80 border border-[#FF9900]/20">S3</span>
        </div>
      </div>
    </div>
  );
}
