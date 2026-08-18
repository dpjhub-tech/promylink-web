"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Link as LinkIcon, Film, Sparkles } from "lucide-react";

interface PostTypeChooserProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onChooseLink: () => void;
  onChooseVideo: () => void;
}

// Faithful port of Promylink/src/components/create-post/PostTypeChooser.tsx
// (the "AI Reel" option existed as a prop on the original too but was never
// actually rendered in its JSX, so it's dropped here as well — not a
// regression, just matching what the original UI actually showed).
export function PostTypeChooser({ open, onOpenChange, onChooseLink, onChooseVideo }: PostTypeChooserProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg p-0 gap-0 border-border/40 shadow-2xl overflow-hidden rounded-2xl">
        <div className="relative bg-gradient-to-br from-primary via-primary/90 to-primary/70 px-8 pt-8 pb-6">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.15),transparent_60%)]" />
          <DialogHeader className="relative z-10">
            <div className="flex items-center gap-3 mb-2">
              <div className="h-10 w-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-lg">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <DialogTitle className="text-white text-xl font-bold tracking-tight">Create New Post</DialogTitle>
            </div>
            <DialogDescription className="text-white/70 text-sm font-medium">
              Choose your content type to get started
            </DialogDescription>
          </DialogHeader>
        </div>

        <div className="p-6 grid grid-cols-2 gap-4">
          <button
            onClick={() => { onOpenChange(false); onChooseLink(); }}
            className="group relative flex flex-col items-center gap-4 p-7 rounded-2xl border border-border/60 bg-card hover:bg-accent/40 hover:border-primary/40 hover:shadow-lg transition-all duration-300 cursor-pointer"
          >
            <div className="relative">
              <div className="absolute inset-0 rounded-2xl bg-primary/10 blur-xl group-hover:bg-primary/20 transition-all" />
              <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/15 to-primary/5 group-hover:from-primary/25 group-hover:to-primary/10 flex items-center justify-center transition-all duration-300 shadow-sm">
                <LinkIcon className="h-7 w-7 text-primary transition-transform group-hover:scale-110 duration-300" />
              </div>
            </div>
            <div className="text-center space-y-1.5">
              <p className="font-semibold text-sm text-foreground">Banner Link</p>
              <p className="text-[11px] text-muted-foreground leading-relaxed">Promote your website, app or referral link</p>
            </div>
            <span className="text-[10px] font-semibold px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
              Paid
            </span>
          </button>

          <button
            onClick={() => { onOpenChange(false); onChooseVideo(); }}
            className="group relative flex flex-col items-center gap-4 p-7 rounded-2xl border border-border/60 bg-card hover:bg-accent/40 hover:border-emerald-500/40 hover:shadow-lg transition-all duration-300 cursor-pointer"
          >
            <div className="relative">
              <div className="absolute inset-0 rounded-2xl bg-emerald-500/10 blur-xl group-hover:bg-emerald-500/20 transition-all" />
              <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500/15 to-emerald-500/5 group-hover:from-emerald-500/25 group-hover:to-emerald-500/10 flex items-center justify-center transition-all duration-300 shadow-sm">
                <Film className="h-7 w-7 text-emerald-600 dark:text-emerald-400 transition-transform group-hover:scale-110 duration-300" />
              </div>
            </div>
            <div className="text-center space-y-1.5">
              <p className="font-semibold text-sm text-foreground">Short Video</p>
              <p className="text-[11px] text-muted-foreground leading-relaxed">Upload a rich HD video reel (max 1 min)</p>
            </div>
            <span className="text-[10px] font-semibold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              Free
            </span>
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
