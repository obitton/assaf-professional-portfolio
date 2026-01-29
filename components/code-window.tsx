"use client"

import { cn } from "@/lib/utils"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Copy, Check } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"

interface CodeWindowProps {
    title: string
    code: string
    language?: "python" | "r" | "typescript" | "text"
    className?: string
}

export function CodeWindow({ title, code, language = "python", className }: CodeWindowProps) {
    const [copied, setCopied] = useState(false)

    const handleCopy = () => {
        navigator.clipboard.writeText(code)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    // Simple syntax highlighting using single-pass regex to avoid nested replacement issues
    const highlightCode = (code: string, lang: string) => {
        if (lang === "python") {
            return code.split('\n').map((line, i) => {
                // Single pass regex for tokenization
                // Groups: 1:Comment, 2:String, 3:Keyword, 4:Number, 5:Library
                const tokenRegex = /(#.*)|('.*?'|".*?")|(\b(?:import|from|def|return|print|if|else|elif|for|in|as)\b)|(\b\d+\b)|(\b(?:pd|np|plt|sns)\b)/g

                const formattedLine = line.replace(tokenRegex, (match, comment, string, keyword, number, lib) => {
                    if (comment) return `<span class="text-green-500">${match}</span>`
                    if (string) return `<span class="text-yellow-400">${match}</span>`
                    if (keyword) return `<span class="text-pink-500">${match}</span>`
                    if (number) return `<span class="text-blue-400">${match}</span>`
                    if (lib) return `<span class="text-cyan-400">${match}</span>`
                    return match
                })

                return (
                    <div key={i} className="table-row">
                        <span className="table-cell text-right w-8 pr-4 text-muted-foreground/40 select-none text-xs align-top">
                            {i + 1}
                        </span>
                        <span className="table-cell whitespace-pre font-mono text-sm leading-6">
                            <span dangerouslySetInnerHTML={{ __html: formattedLine || " " }} />
                        </span>
                    </div>
                )
            })
        }

        if (lang === "r") {
            return code.split('\n').map((line, i) => {
                // R syntax highlighting
                // Groups: 1:Comment, 2:String, 3:Keyword/Operator, 4:Number, 5:Function
                const tokenRegex = /(#.*)|('.*?'|".*?")|(\b(?:if|else|for|while|in|next|break|function|return|library|require)\b|<-|%>%|\$)|(\b\d+\b)|(\b\w+(?=\())\b/g

                const formattedLine = line.replace(tokenRegex, (match, comment, string, keyword, number, func) => {
                    if (comment) return `<span class="text-green-500">${match}</span>`
                    if (string) return `<span class="text-yellow-400">${match}</span>`
                    if (keyword) return `<span class="text-pink-500">${match}</span>`
                    if (number) return `<span class="text-blue-400">${match}</span>`
                    if (func) return `<span class="text-cyan-400">${match}</span>`
                    return match
                })

                return (
                    <div key={i} className="table-row">
                        <span className="table-cell text-right w-8 pr-4 text-muted-foreground/40 select-none text-xs align-top">
                            {i + 1}
                        </span>
                        <span className="table-cell whitespace-pre font-mono text-sm leading-6">
                            <span dangerouslySetInnerHTML={{ __html: formattedLine || " " }} />
                        </span>
                    </div>
                )
            })
        }

        // Default fallback
        return code.split('\n').map((line, i) => (
            <div key={i} className="table-row">
                <span className="table-cell text-right w-8 pr-4 text-muted-foreground/40 select-none text-xs align-top">
                    {i + 1}
                </span>
                <span className="table-cell whitespace-pre font-mono text-sm leading-6">
                    {line}
                </span>
            </div>
        ))
    }

    return (
        <div className={cn("rounded-xl overflow-hidden border border-border/40 card-shadow bg-[#1e1e1e] dark:bg-[#1e1e1e] w-full max-w-full", className)}>
            {/* Window Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-[#252526] border-b border-white/5">
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                        <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                        <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                    </div>
                    <span className="text-xs font-medium text-muted-foreground font-mono">{title}</span>
                </div>
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 text-muted-foreground hover:text-white hover:bg-white/10"
                    onClick={handleCopy}
                >
                    {copied ? <Check className="h-3.5 w-3.5 text-green-500" /> : <Copy className="h-3.5 w-3.5" />}
                </Button>
            </div>

            {/* Code Editor Area */}
            <div className="p-4 overflow-x-auto text-[#d4d4d4]">
                <div className="table w-full">
                    {highlightCode(code, language)}
                </div>
            </div>
        </div>
    )
}
