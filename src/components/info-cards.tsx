import Link from "fumadocs-core/link";
import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

export function InfoCards(props: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      className={cn("grid grid-cols-2 gap-3 @container", props.className)}
    >
      {props.children}
    </div>
  );
}

export type InfoCardProps = Omit<HTMLAttributes<HTMLElement>, "title"> & {
  image?: string;
  title: ReactNode;
  description?: ReactNode;

  href?: string;
  external?: boolean;
};

export function InfoCard({
  image,
  title,
  description,
  ...props
}: InfoCardProps) {
  const E = props.href ? Link : "div";

  return (
    <E
      {...props}
      data-card
      className={cn(
        "block rounded-none border bg-fd-card p-4 text-fd-card-foreground transition-colors @max-lg:col-span-full",
        props.href && "hover:bg-fd-accent/80",
        props.className,
      )}
    >
      {image ? (
        <div className="not-prose mb-2 w-full h-40 overflow-hidden rounded-none">
          <img
            src={image}
            draggable={false}
            alt={typeof title === "string" ? title : ""}
            className="w-full h-full object-cover select-none"
          />
        </div>
      ) : null}
      <h3 className="not-prose mb-1 text-sm font-medium mt-6!">{title}</h3>
      {description ? (
        <p className="!my-0 text-sm text-fd-muted-foreground">{description}</p>
      ) : null}
      <div className="text-sm text-fd-muted-foreground prose-no-margin empty:hidden">
        {props.children}
      </div>
    </E>
  );
}
