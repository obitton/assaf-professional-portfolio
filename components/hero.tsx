"use client"

import { ArrowDown, Linkedin, Mail, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>
      
      <div className="max-w-6xl mx-auto px-6 py-24 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Text content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <p className="text-sm font-medium tracking-widest uppercase text-primary">
                Quantitative Finance & Analytics
              </p>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground text-balance">
                Assaf Bitton
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed max-w-lg">
                Undergraduate at Baruch College specializing in Statistics and Quantitative Modeling, 
                with a focus on predictive analytics, risk modeling, and data-driven decision making.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
                <a href="#research">
                  View Research
                  <ArrowDown className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button variant="outline" asChild className="border-border text-foreground hover:bg-secondary bg-transparent">
                <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                  <FileText className="mr-2 h-4 w-4" />
                  Resume
                </a>
              </Button>
            </div>
            
            <div className="flex items-center gap-6 pt-4">
              <a
                href="https://linkedin.com/in/assafbitton"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="mailto:assafbitton@example.com"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          {/* Right side - Stats/Highlights */}
          <div className="hidden lg:grid grid-cols-2 gap-6">
            <div className="bg-card border border-border rounded-lg p-6 space-y-2">
              <p className="text-4xl font-bold text-primary">3.94</p>
              <p className="text-sm text-muted-foreground">GPA / 4.0</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-6 space-y-2">
              <p className="text-4xl font-bold text-primary">2027</p>
              <p className="text-sm text-muted-foreground">Expected Graduation</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-6 space-y-2">
              <p className="text-sm font-medium text-foreground">Statistics & Quantitative Modeling</p>
              <p className="text-xs text-muted-foreground">Major</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-6 space-y-2">
              <p className="text-sm font-medium text-foreground">Mathematics & Economics</p>
              <p className="text-xs text-muted-foreground">Minor</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ArrowDown className="h-5 w-5 text-muted-foreground" />
      </div>
    </section>
  )
}
