"use client"

import { Navigation } from "@/components/navigation"
import { PdfViewer } from "@/components/pdf-viewer"
import { Button } from "@/components/ui/button"
import { Download, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function ResumePage() {
    return (
        <main className="min-h-screen bg-background">
            <Navigation />

            <div className="pt-32 pb-24">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
                        <div className="space-y-4">
                            <Link
                                href="/"
                                className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
                            >
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                Back to Home
                            </Link>
                            <h1 className="text-3xl md:text-4xl font-bold text-foreground">Resume</h1>
                            <p className="text-muted-foreground">Assaf Bitton - Quantitative Analysis & Risk Modeling</p>
                        </div>

                        <Button asChild className="bg-primary hover:bg-primary/90">
                            <a href="/Assaf_Bitton_Resume.pdf?v=2" download="Assaf Bitton Resume.pdf">
                                <Download className="mr-2 h-4 w-4" />
                                Download PDF
                            </a>
                        </Button>
                    </div>

                    <div className="w-full">
                        <PdfViewer url="/Assaf_Bitton_Resume.pdf?v=2" title="Assaf Bitton Resume" />
                    </div>
                </div>
            </div>
        </main>
    )
}
