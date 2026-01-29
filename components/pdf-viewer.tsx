"use client"

import { FileText, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"

interface PdfViewerProps {
    title?: string
    url: string
    className?: string
    aspectRatio?: string
}

export function PdfViewer({
    title = "Research Paper",
    url,
    className = "",
    aspectRatio = "aspect-[3/4] md:aspect-[16/9]"
}: PdfViewerProps) {
    return (
        <div className={`bg-card border border-border rounded-xl p-8 overflow-hidden ${className}`}>
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
                    <FileText className="h-6 w-6 text-primary" />
                    {title}
                </h2>
                <Button variant="outline" size="sm" asChild>
                    <a href={url} target="_blank" rel="noopener noreferrer">
                        Open PDF <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                </Button>
            </div>

            <div className={`${aspectRatio} w-full bg-white rounded-lg border border-border overflow-hidden`}>
                <iframe
                    src={url}
                    className="w-full h-full border-0"
                    title={title}
                />
            </div>
        </div>
    )
}
