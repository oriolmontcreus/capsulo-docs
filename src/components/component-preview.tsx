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

  // Extract schema name from SchemaRenderer if available
  const schemaName =
    React.isValidElement(preview) &&
    (preview.props as { schema?: { name?: string } })?.schema?.name
      ? (preview.props as { schema: { name: string } }).schema.name
      : "Manual Code";

  return (
    <div
      className={cn(
        "group relative flex flex-col",
        showMargin && "my-4 space-y-2",
        className,
      )}
      {...props}
    >
      <div className={cn("relative", showBorder && "border")}>
        {/* Code Icon Button - appears on hover */}
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-4 z-10 opacity-0 transition-opacity group-hover:opacity-100 size-8 duration-150 ease-in-out cursor-pointer"
            >
              <Code className="size-4" />
              <span className="sr-only">View code</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="min-h-[80vh] min-w-[80vw]">
            <DialogHeader>
              <DialogTitle>{schemaName}</DialogTitle>
            </DialogHeader>
            <div className="h-full overflow-auto">{code}</div>
          </DialogContent>
        </Dialog>

        {/* Preview Area */}
        <div
          className={cn("flex items-center justify-center", {
            "items-center": align === "center",
            "items-start": align === "start",
            "items-end": align === "end",
            "min-h-[350px] p-10": showMargin,
            "min-h-0 p-6 pb-0 pt-8": !showMargin,
          })}
        >
          {preview}
        </div>
      </div>
    </div>
  );
}
