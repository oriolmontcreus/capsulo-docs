"use client"

import * as React from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

interface ComponentPreviewProps extends React.HTMLAttributes<HTMLDivElement> {
  align?: "center" | "start" | "end"
}

export function ComponentPreview({
  children,
  className,
  align = "center",
  ...props
}: ComponentPreviewProps) {
  const [preview, code] = React.Children.toArray(children)

  return (
    <div
      className={cn("group relative my-4 flex flex-col space-y-2", className)}
      {...props}
    >
      <Tabs defaultValue="preview" className="relative mr-auto w-full">
        <div className="flex items-center justify-between pb-3">
          <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0">
            <TabsTrigger
              value="preview"
              className="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none hover:text-foreground"
            >
              Preview
            </TabsTrigger>
            <TabsTrigger
              value="code"
              className="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none hover:text-foreground"
            >
              Code
            </TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="preview" className="relative rounded-md border p-0 mt-0">
          <div
            className={cn(
              "flex min-h-[350px] items-center justify-center p-10",
              {
                "items-center": align === "center",
                "items-start": align === "start",
                "items-end": align === "end",
              }
            )}
          >
            {preview}
          </div>
        </TabsContent>
        <TabsContent value="code" className="mt-0">
          <div className="flex flex-col space-y-4">
            <div className="w-full rounded-md [&_pre]:my-0 [&_pre]:max-h-[350px] [&_pre]:overflow-auto">
              {code}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
