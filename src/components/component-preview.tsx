"use client"

import { Pre } from "fumadocs-ui/components/codeblock"
import { codeToHtml } from "shiki"
import { capsuloHighlighter } from "@/../source.config"
import { useEffect, useState } from "react"

interface ComponentPreviewProps {
    children: React.ReactNode
    code: string
    className?: string
    lang?: string
}

export function ComponentPreview({
    children,
    code,
    className,
    lang = "tsx"
}: ComponentPreviewProps) {
    const [html, setHtml] = useState<string>("")

    useEffect(() => {
        codeToHtml(code, {
            lang,
            themes: {
                light: 'github-light',
                dark: 'github-dark',
            },
            transformers: [capsuloHighlighter],
        }).then(setHtml)
    }, [code, lang])

    return (
        <div className={`my-6 overflow-hidden rounded-lg border ${className}`}>
            {/* Preview */}
            <div className="flex min-h-[350px] items-center justify-center p-10 bg-background">
                {children}
            </div>

            {/* Code */}
            {html && <div dangerouslySetInnerHTML={{ __html: html }} />}
        </div>
    )
}
