"use client";

import React from 'react';
import { X, Calendar, Clock, AlertCircle, Zap } from 'lucide-react';

export const AnnouncementPanel = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className="w-full max-w-2xl bg-gradient-to-br from-[#1E293B] to-[#0F172A] rounded-lg border border-[#334155] overflow-hidden shadow-2xl">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#FF9900]/20 to-[#FF9900]/5 border-b border-[#334155] px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#FF9900]/20 rounded-lg flex items-center justify-center">
            <Zap className="w-6 h-6 text-[#FF9900]" />
          </div>
          <h2 style={{ fontSize: '18px' }} className="font-bold text-[#FF9900]">AWS Prototype Development Update</h2>
        </div>
        <button onClick={onClose} className="text-[#94A3B8] hover:text-[#F1F5F9] transition-colors">
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Content */}
      <div className="px-6 py-5 space-y-4 max-h-96 overflow-y-auto">
        {/* Welcome Message */}
        <div className="bg-[#0F172A]/50 border border-[#00FF00]/30 rounded-lg p-4">
          <p style={{ fontSize: '13px' }} className="text-[#F1F5F9]">
            <span className="font-bold text-[#22c55e]">✓ We hope your prototype build is going strong!</span>
          </p>
          <p style={{ fontSize: '12px' }} className="text-[#94A3B8] mt-2">
            As you move into the final stages of the Prototype Development Phase, we want to ensure you have the expert guidance and time needed to truly maximize the potential of your solutions on AWS.
          </p>
        </div>

        {/* Expert Session */}
        <div className="bg-[#0F172A]/50 border border-[#FF9900]/30 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Calendar className="w-5 h-5 text-[#FF9900] mt-0.5 flex-shrink-0" />
            <div className="space-y-2">
              <h3 style={{ fontSize: '13px' }} className="font-bold text-[#FF9900]">Expert Session: Building Prototypes on AWS</h3>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#FFB84D]" />
                  <span style={{ fontSize: '11px' }} className="text-[#94A3B8]">Date: Tomorrow, March 3rd</span>
                </div>
                <span style={{ fontSize: '11px' }} className="text-[#94A3B8] block pl-6">Time: 3:00 PM – 4:00 PM IST</span>
              </div>
              <p style={{ fontSize: '11px' }} className="text-[#F1F5F9] mt-2">
                <span className="font-semibold text-[#FFB84D]">Focus:</span> Troubleshooting Bedrock integrations, final architecture review, and submission best practices.
              </p>
            </div>
          </div>
        </div>

        {/* Deadline Extension */}
        <div className="bg-[#0F172A]/50 border-l-2 border-[#22c55e] rounded-lg p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-[#22c55e] mt-0.5 flex-shrink-0" />
            <div>
              <h3 style={{ fontSize: '13px' }} className="font-bold text-[#22c55e]">Deadline Extension</h3>
              <p style={{ fontSize: '12px' }} className="text-[#F1F5F9] mt-1">
                The submission deadline has been officially extended to <span className="font-bold">Sunday, March 8th, 2026, at 11:59 PM IST</span>.
              </p>
              <p style={{ fontSize: '11px' }} className="text-[#94A3B8] mt-2 italic">
                This is a firm extension to help you over the weekend. No further extensions will be granted beyond this date.
              </p>
            </div>
          </div>
        </div>

        {/* AWS Generative AI Services */}
        <div className="bg-[#0F172A]/50 border border-[#334155] rounded-lg p-4">
          <h3 style={{ fontSize: '13px' }} className="font-bold text-[#FF9900] mb-2">Using Generative AI on AWS</h3>
          <p style={{ fontSize: '11px' }} className="text-[#94A3B8] mb-2">Teams are encouraged to incorporate AWS Generative AI services:</p>
          <ul style={{ fontSize: '11px' }} className="text-[#F1F5F9] space-y-1 pl-4">
            <li>• <span className="font-semibold text-[#FFB84D]">Amazon Bedrock</span> for foundation model access, RAG workflows, or agents</li>
            <li>• <span className="font-semibold text-[#FFB84D]">Kiro</span> for spec driven development as part of your build workflow</li>
            <li>• Other AWS AI and ML services where relevant</li>
          </ul>
        </div>

        {/* AWS Services */}
        <div className="bg-[#0F172A]/50 border border-[#334155] rounded-lg p-4">
          <h3 style={{ fontSize: '13px' }} className="font-bold text-[#FF9900] mb-2">Building on AWS Infrastructure</h3>
          <p style={{ fontSize: '11px' }} className="text-[#94A3B8] mb-2">Recommended AWS services:</p>
          <div className="grid grid-cols-2 gap-2">
            <span style={{ fontSize: '10px' }} className="text-[#F1F5F9] bg-[#0F172A] px-2 py-1 rounded border border-[#334155]">AWS Lambda</span>
            <span style={{ fontSize: '10px' }} className="text-[#F1F5F9] bg-[#0F172A] px-2 py-1 rounded border border-[#334155]">Amazon EC2</span>
            <span style={{ fontSize: '10px' }} className="text-[#F1F5F9] bg-[#0F172A] px-2 py-1 rounded border border-[#334155]">Amazon ECS</span>
            <span style={{ fontSize: '10px' }} className="text-[#F1F5F9] bg-[#0F172A] px-2 py-1 rounded border border-[#334155]">AWS Amplify</span>
            <span style={{ fontSize: '10px' }} className="text-[#F1F5F9] bg-[#0F172A] px-2 py-1 rounded border border-[#334155]">API Gateway</span>
            <span style={{ fontSize: '10px' }} className="text-[#F1F5F9] bg-[#0F172A] px-2 py-1 rounded border border-[#334155]">DynamoDB</span>
            <span style={{ fontSize: '10px' }} className="text-[#F1F5F9] bg-[#0F172A] px-2 py-1 rounded border border-[#334155]">Amazon S3</span>
            <span style={{ fontSize: '10px' }} className="text-[#F1F5F9] bg-[#0F172A] px-2 py-1 rounded border border-[#334155]">App Hosting</span>
          </div>
          <p style={{ fontSize: '11px' }} className="text-[#94A3B8] mt-3">
            <span className="font-semibold text-[#22c55e]">✓ Using AWS-native patterns</span> (serverless, managed services, scalable architectures) will strengthen your technical evaluation.
          </p>
        </div>

        {/* Submission Requirements */}
        <div className="bg-[#0F172A]/50 border border-[#334155] rounded-lg p-4">
          <h3 style={{ fontSize: '13px' }} className="font-bold text-[#FF9900] mb-2">Submission Requirements</h3>
          <p style={{ fontSize: '11px' }} className="text-[#94A3B8] mb-2">Your submission should clearly explain:</p>
          <ul style={{ fontSize: '11px' }} className="text-[#F1F5F9] space-y-1 pl-4">
            <li>✓ Why AI is required in your solution</li>
            <li>✓ How AWS services are used within your architecture</li>
            <li>✓ What value the AI layer adds to the user experience</li>
          </ul>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-[#334155] bg-[#0F172A]/50 px-6 py-4">
        <p style={{ fontSize: '11px' }} className="text-[#94A3B8]">
          Keep building, stay focused, and we look forward to seeing you at the session tomorrow at 3:00 PM!
        </p>
        <p style={{ fontSize: '10px' }} className="text-[#94A3B8] mt-2">
          Best regards, <span className="font-semibold text-[#FF9900]">Team Hack2skill</span>
        </p>
      </div>
    </div>
  );
};
