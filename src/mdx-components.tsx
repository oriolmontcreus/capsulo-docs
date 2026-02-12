import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';
import { InfoCard, InfoCards } from '@/components/info-cards';
import { CodeBlock, Pre } from 'fumadocs-ui/components/codeblock';
import { Card as FumaCard, Cards as FumaCards } from 'fumadocs-ui/components/card';
import Link from 'fumadocs-core/link';
import { cn } from '@/lib/cn';

function Card({ icon, title, description, ...props }: React.ComponentProps<typeof FumaCard>) {
  const E = props.href ? Link : 'div';
  return (
    <E
      {...props}
      data-card
      className={cn(
        'block rounded-none border bg-fd-card p-4 text-fd-card-foreground transition-colors @max-lg:col-span-full',
        props.href && 'hover:bg-fd-accent/80',
        props.className
      )}
    >
      {icon ? (
        <div className="not-prose mb-2 w-fit shadow-md rounded-none border bg-fd-muted p-1.5 text-fd-muted-foreground [&_svg]:size-4">
          {icon}
        </div>
      ) : null}
      <h3 className="not-prose mb-1 text-sm font-medium">{title}</h3>
      {description ? (
        <p className="!my-0 text-sm text-fd-muted-foreground">{description}</p>
      ) : null}
      <div className="text-sm text-fd-muted-foreground prose-no-margin empty:hidden">
        {props.children}
      </div>
    </E>
  );
}

function Cards(props: React.ComponentProps<typeof FumaCards>) {
  return (
    <div
      {...props}
      className={cn('grid grid-cols-2 gap-3 @container', props.className)}
    >
      {props.children}
    </div>
  );
}

function Table(props: React.TableHTMLAttributes<HTMLTableElement>) {
  return (
    <div className="relative overflow-auto prose-no-margin my-6 rounded-none">
      <table {...props} className={cn('rounded-none', props.className)} />
    </div>
  );
}

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  // Store the original link component (e.g., createRelativeLink)
  const OriginalLink = components?.a;

  return {
    ...defaultMdxComponents,
    InfoCard,
    InfoCards,
    Card,
    Cards,
    table: Table,
    ...components,
    a: (props) => {
      const className = "font-medium underline decoration-dotted decoration-blue-500 dark:decoration-blue-600 hover:decoration-blue-300 hover:dark:decoration-blue-800 underline-offset-2 transition-colors";

      if (OriginalLink) {
        const LinkComponent = OriginalLink as any;
        return <LinkComponent {...props} className={className} />;
      }
      return <a {...props} className={className} />;
    },
    pre: ({ ref: _ref, ...props }) => (
      <CodeBlock {...props} className="rounded-none">
        <Pre className="rounded-none">{props.children}</Pre>
      </CodeBlock>
    ),
  };
}
