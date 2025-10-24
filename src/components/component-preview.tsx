"use client"

import { DynamicCodeBlock } from "fumadocs-ui/components/dynamic-codeblock"

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
    return (
        <div className={`my-6 overflow-hidden rounded-lg border ${className}`}>
            {/* Preview */}
            <div className="flex min-h-[350px] items-center justify-center p-10 bg-background">
                {children}
            </div>

            {/* Code */}
            <DynamicCodeBlock lang={lang} code={code} />
        </div>
    )
}
