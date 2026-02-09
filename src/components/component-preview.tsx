"use client";

import * as React from "react";
import { Code } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

interface ComponentPreviewProps extends React.HTMLAttributes<HTMLDivElement> {
  align?: "center" | "start" | "end";
  showBorder?: boolean;
  showMargin?: boolean;
}

export function ComponentPreview({
  children,
  className,
  align = "center",
  showBorder = true,
  showMargin = true,
  ...props
}: ComponentPreviewProps) {
  const [preview, code] = React.Children.toArray(children);

  return (
    <div
      className={cn(
        "group relative flex flex-col",
        showMargin && "my-4 space-y-2",
        className
      )}
      {...props}
    >
      <div className={cn("relative", showBorder && "border")}>
        {/* Code Icon Button - appears on hover */}
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="absolute right-4 top-4 z-10 opacity-0 transition-opacity group-hover:opacity-100 h-8 w-8"
            >
              <Code className="h-4 w-4" />
              <span className="sr-only">View code</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[80vh]">
            <DialogHeader>
              <DialogTitle>Manual Code</DialogTitle>
            </DialogHeader>
            <ScrollArea className="h-[60vh] w-full [&_pre]:my-0 [&_pre]:overflow-visible">
              {code}
            </ScrollArea>
          </DialogContent>
        </Dialog>

        {/* Preview Area */}
        <div
          className={cn("flex items-center justify-center", {
            "items-center": align === "center",
            "items-start": align === "start",
            "items-end": align === "end",
            "min-h-[350px] p-10": showMargin,
            "min-h-0 p-6": !showMargin,
          })}
        >
          {preview}
        </div>
      </div>
    </div>
  );
}
