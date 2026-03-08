
"use client";

import React, { useState, useEffect } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter,
  DialogDescription 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { 
  ShieldCheck, 
  Smartphone, 
  Terminal,
  Save,
  Key,
  Cpu,
  Lock,
  Loader2
} from 'lucide-react';

const DEFAULT_CONFIG = {
  accountSid: '',
  authToken: '',
  from: '',
  to: '',
  googleApiKey: '',
  geminiApiKey: '',
};

export function SettingsModal({ isOpen, onClose }: any) {
  const [config, setConfig] = useState(DEFAULT_CONFIG);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const saved = localStorage.getItem('sentinel_dispatch_config');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setConfig(prev => ({ ...prev, ...parsed }));
      } catch (e) {
        localStorage.setItem('sentinel_dispatch_config', JSON.stringify(DEFAULT_CONFIG));
      }
    }
  }, [isOpen]);

  const handleSave = () => {
    setIsSaving(true);
    localStorage.setItem('sentinel_dispatch_config', JSON.stringify(config));
    
    toast({
      title: "COMMAND PROTOCOLS UPDATED",
      description: "Tactical credentials synchronized with matrix core successfully.",
    });
    
    setTimeout(() => {
      setIsSaving(false);
      onClose();
    }, 1200);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md bg-[#0a0a0a] border border-white/10 shadow-2xl p-6 rounded-2xl">
        <DialogHeader className="mb-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-primary/15 border border-primary/25 flex items-center justify-center">
              <Terminal className="w-5 h-5 text-primary" />
            </div>
            <div>
              <DialogTitle className="text-white tracking-tight text-xl font-bold uppercase">Command Center</DialogTitle>
              <p className="text-xs font-semibold uppercase tracking-wider text-primary/70">Configuration</p>
            </div>
          </div>
          <DialogDescription className="text-xs font-semibold uppercase tracking-wider text-white/40 pt-3 leading-relaxed">
            Configure API credentials and dispatch settings synchronously across all systems.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 max-h-[50vh] overflow-y-auto px-1">
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#FF9900] flex items-center gap-2">
              <Lock className="w-3.5 h-3.5" /> 🚀 AWS Intelligence Services
            </h4>
            
            <div className="space-y-2">
              <Label className="text-xs font-semibold uppercase tracking-wider text-white/50 flex items-center gap-2">
                <Cpu className="w-3 h-3" /> AWS_SECRET_ACCESS_KEY
              </Label>
              <Input 
                type="password" 
                value={config.googleApiKey} 
                onChange={(e) => setConfig({ ...config, googleApiKey: e.target.value })} 
                className="h-10 bg-[#232F3E]/40 border border-[#FF9900]/15 text-white rounded-lg font-mono text-xs focus:border-[#FF9900] focus:bg-[#232F3E]/60 transition-all" 
              />
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-semibold uppercase tracking-wider text-white/50 flex items-center gap-2">
                <Key className="w-3 h-3" /> AWS MODEL ID
              </Label>
              <Input 
                type="password" 
                value={config.geminiApiKey} 
                onChange={(e) => setConfig({ ...config, geminiApiKey: e.target.value })} 
                className="h-10 bg-[#232F3E]/40 border border-[#FF9900]/15 text-white rounded-lg font-mono text-xs focus:border-[#FF9900] focus:bg-[#232F3E]/60 transition-all" 
              />
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-white/5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-2">
              <Smartphone className="w-3.5 h-3.5" /> Dispatch System
            </h4>
            
            <div className="space-y-2">
              <Label className="text-xs font-semibold uppercase tracking-wider text-white/50 flex items-center gap-2">
                <Key className="w-3 h-3" /> Twilio Account SID
              </Label>
              <Input type="password" value={config.accountSid} onChange={(e) => setConfig({ ...config, accountSid: e.target.value })} className="h-10 bg-[#232F3E]/40 border border-[#FF9900]/15 text-white rounded-lg font-mono text-xs focus:border-[#FF9900] focus:bg-[#232F3E]/60 transition-all" />
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-semibold uppercase tracking-wider text-white/50 flex items-center gap-2">
                <ShieldCheck className="w-3 h-3" /> Twilio Auth Token
              </Label>
              <Input type="password" value={config.authToken} onChange={(e) => setConfig({ ...config, authToken: e.target.value })} className="h-10 bg-[#232F3E]/40 border border-[#FF9900]/15 text-white rounded-lg font-mono text-xs focus:border-[#FF9900] focus:bg-[#232F3E]/60 transition-all" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label className="text-xs font-semibold uppercase tracking-wider text-white/50">From Number</Label>
                <Input value={config.from} onChange={(e) => setConfig({ ...config, from: e.target.value })} placeholder="+123456789" className="h-10 bg-[#232F3E]/40 border border-[#FF9900]/15 text-white rounded-lg font-mono text-xs focus:border-[#FF9900] focus:bg-[#232F3E]/60 transition-all" />
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-semibold uppercase tracking-wider text-white/50">Recipient</Label>
                <Input value={config.to} onChange={(e) => setConfig({ ...config, to: e.target.value })} placeholder="+123456789" className="h-10 bg-[#232F3E]/40 border border-[#FF9900]/15 text-white rounded-lg font-mono text-xs focus:border-[#FF9900] focus:bg-[#232F3E]/60 transition-all" />
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="mt-6 pt-4 border-t border-white/5">
          <Button onClick={handleSave} disabled={isSaving} className="w-full h-11 bg-primary hover:bg-primary/90 text-white font-bold uppercase tracking-wider rounded-lg shadow-lg hover:shadow-xl hover:shadow-primary/20 gap-2 transition-all active:scale-95 border-0 disabled:opacity-60">
            {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {isSaving ? 'Saving...' : 'Save Configuration'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
