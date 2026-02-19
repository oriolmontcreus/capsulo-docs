"use client";

import { ChevronDown } from "lucide-react";
import Link from "fumadocs-core/link";
import { cva } from "class-variance-authority";
import { cn } from "../lib/cn";
import { type ReactNode, useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";

// Helper function to detect custom types
function isCustomTypePart(typePart: string): boolean {
  const cleanType = typePart
    .trim()
    .replace(/^['"`]/, "")
    .replace(/['"`]$/, "");

  // Standard JavaScript/TypeScript types that should NOT be highlighted
  const standardTypes = [
    "string",
    "number",
    "boolean",
    "object",
    "null",
    "undefined",
    "any",
    "void",
    "never",
    "bigint",
    "symbol",
    "unknown",
    "Function",
    "Date",
    "RegExp",
    "Array",
    "Promise",
    "true",
    "false",
  ];

  // Check if it's a standard type
  if (standardTypes.includes(cleanType)) {
    return false;
  }

  if (cleanType.includes("<") && cleanType.includes(">")) {
    const innerContent = cleanType.slice(
      cleanType.indexOf("<") + 1,
      cleanType.lastIndexOf(">"),
    );
    const innerParts = innerContent.split(",").map((part) => part.trim());
    if (
      innerParts.every(
        (part) => standardTypes.includes(part) || /^\d+$/.test(part),
      )
    ) {
      return false;
    }
  }

  const customTypePatterns = [
    "ResponsiveValue",
    "SelectOption",
    "SelectOptionGroup",
    "ResponsiveColumns",
  ];
  return customTypePatterns.some((pattern) => cleanType.includes(pattern));
}

// Function to render type with custom type highlighting
function renderTypeWithHighlighting(type: ReactNode): ReactNode {
  if (typeof type !== "string") {
    return type;
  }

  // Split by pipe operator to handle union types
  const parts = type.split("|");

  if (parts.length === 1) {
    // Single type
    const part = parts[0];
    if (isCustomTypePart(part)) {
      return <span className="text-green-600">{part}</span>;
    }
    return type;
  }

  // Union type - process each part
  return parts.map((part, index) => {
    const trimmedPart = part.trim();
    const isLast = index === parts.length - 1;

    if (isCustomTypePart(trimmedPart)) {
      return (
        <span key={index}>
          <span className="text-green-600">{trimmedPart}</span>
          {!isLast && " | "}
        </span>
      );
    }

    return (
      <span key={index}>
        {trimmedPart}
        {!isLast && " | "}
      </span>
    );
  });
}

export interface ParameterNode {
  name: string;
  description: ReactNode;
}

export interface TypeNode {
  /**
   * Additional description of the field
   */
  description?: ReactNode;

  /**
   * type signature (short)
   */
  type: ReactNode;

  /**
   * type signature (full)
   */
  typeDescription?: ReactNode;

  /**
   * Optional `href` for the type
   */
  typeDescriptionLink?: string;

  default?: ReactNode;

  required?: boolean;
  deprecated?: boolean;

  parameters?: ParameterNode[];

  returns?: ReactNode;
}

const keyVariants = cva("text-fd-primary", {
  variants: {
    deprecated: {
      true: "line-through text-fd-primary/50",
    },
  },
});

const fieldVariants = cva("text-fd-muted-foreground not-prose pe-2");

export function TypeTable({ type }: { type: Record<string, TypeNode> }) {
  return (
    <div className="@container flex flex-col p-1 bg-fd-card text-fd-card-foreground rounded-none border my-6 text-sm overflow-hidden">
      <div className="flex font-medium items-center px-3 py-1 not-prose text-fd-muted-foreground">
        <p className="w-[25%]">Prop</p>
        <p className="@max-xl:hidden">Type</p>
      </div>
      {Object.entries(type).map(([key, value]) => (
        <Item key={key} name={key} item={value} />
      ))}
    </div>
  );
}

function Item({
  name,
  item: {
    parameters = [],
    description,
    required = false,
    deprecated,
    typeDescription,
    default: defaultValue,
    type,
    typeDescriptionLink,
    returns,
  },
}: {
  name: string;
  item: TypeNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Collapsible
      open={open}
      onOpenChange={setOpen}
      className={cn(
        "rounded-none border overflow-hidden transition-all",
        open
          ? "shadow-sm bg-fd-background not-last:mb-2"
          : "border-transparent",
      )}
    >
      <CollapsibleTrigger className="relative flex flex-row items-center w-full group text-start px-3 py-2 not-prose hover:bg-fd-accent">
        <code
          className={cn(
            keyVariants({
              deprecated,
              className: "min-w-fit w-[25%] font-medium pe-2 text-primary",
            }),
          )}
        >
          {name}
          {!required && "?"}
        </code>
        {typeDescriptionLink ? (
          <Link href={typeDescriptionLink} className="underline @max-xl:hidden">
            {type}
          </Link>
        ) : (
          <span className="@max-xl:hidden">
            {renderTypeWithHighlighting(type)}
          </span>
        )}
        <ChevronDown className="absolute end-2 size-4 text-fd-muted-foreground transition-transform group-data-[state=open]:rotate-180" />
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="grid grid-cols-[1fr_3fr] gap-y-4 text-sm p-3 overflow-auto fd-scroll-container border-t">
          <div className="text-sm prose col-span-full prose-no-margin empty:hidden">
            {description}
          </div>
          {typeDescription && (
            <>
              <p className={cn(fieldVariants())}>Type</p>
              <p className="my-auto not-prose">{typeDescription}</p>
            </>
          )}
          {defaultValue && (
            <>
              <p className={cn(fieldVariants())}>Default</p>
              <p className="my-auto not-prose">{defaultValue}</p>
            </>
          )}
          {parameters.length > 0 && (
            <>
              <p className={cn(fieldVariants())}>Parameters</p>
              <div className="flex flex-col gap-2">
                {parameters.map((param) => (
                  <div
                    key={param.name}
                    className="inline-flex items-center flex-wrap gap-1"
                  >
                    <p className="font-medium not-prose text-nowrap">
                      {param.name} -
                    </p>
                    <div className="text-sm prose prose-no-margin">
                      {param.description}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
          {returns && (
            <>
              <p className={cn(fieldVariants())}>Returns</p>
              <div className="my-auto text-sm prose prose-no-margin">
                {returns}
              </div>
            </>
          )}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
