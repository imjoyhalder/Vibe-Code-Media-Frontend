"use client";

import Link from "next/link";
import { 
  FileSearch, 
  Home, 
  ArrowLeft, 
  Search,
  Terminal,
  Layers
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function NotFound() {
  return (
    <div className="min-h-[90vh] flex items-center justify-center px-6 py-24">
      <div className="max-w-2xl w-full text-center space-y-8">
        
        {/* Visual Element */}
        <div className="relative flex justify-center">
          <div className="absolute inset-0 bg-primary/10 blur-3xl rounded-full" />
          <div className="relative size-24 md:size-32 rounded-3xl bg-card border shadow-2xl flex items-center justify-center overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-primary" />
            <FileSearch className="size-12 md:size-16 text-primary animate-pulse" />
          </div>
        </div>

        {/* Text Content */}
        <div className="space-y-4">
          <div className="flex items-center justify-center gap-2 text-xs font-bold text-primary uppercase tracking-widest">
            <Terminal className="size-4" />
            <span>Error 404</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-foreground">
            Project Disconnected
          </h1>
          <p className="text-muted-foreground text-lg max-w-md mx-auto leading-relaxed">
            The project workspace you're looking for doesn't exist or has been moved to a private repository.
          </p>
        </div>

        {/* Action Interface */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Button asChild size="lg" className="rounded-full px-8 gap-2 w-full sm:w-auto">
            <Link href="/">
              <Home className="size-4" />
              Return Home
            </Link>
          </Button>
          <Button variant="outline" size="lg" className="rounded-full px-8 gap-2 w-full sm:w-auto" onClick={() => window.history.back()}>
            <ArrowLeft className="size-4" />
            Go Back
          </Button>
        </div>

        {/* Professional Footer Links */}
        <div className="pt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 border-t">
          <div className="space-y-2">
            <div className="flex items-center justify-center gap-2 text-foreground font-semibold text-sm">
              <Layers className="size-4 text-primary" />
              Directory
            </div>
            <Link href="/projects" className="text-xs text-muted-foreground hover:text-primary transition-colors">
              Browse All Projects
            </Link>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-center gap-2 text-foreground font-semibold text-sm">
              <Search className="size-4 text-primary" />
              Support
            </div>
            <Link href="/help" className="text-xs text-muted-foreground hover:text-primary transition-colors">
              Documentation
            </Link>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-center gap-2 text-foreground font-semibold text-sm">
              <Terminal className="size-4 text-primary" />
              API
            </div>
            <Link href="/status" className="text-xs text-muted-foreground hover:text-primary transition-colors">
              System Status
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}