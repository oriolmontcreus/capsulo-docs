import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';
import { InfoCard, InfoCards } from '@/components/info-cards';

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  // Store the original link component (e.g., createRelativeLink)
  const OriginalLink = components?.a;

  return {
    ...defaultMdxComponents,
    InfoCard,
    InfoCards,
    ...components,
    a: (props) => {
      const className = "font-medium underline decoration-dotted decoration-blue-500 dark:decoration-blue-600 hover:decoration-blue-300 hover:dark:decoration-blue-800 underline-offset-2 transition-colors";

      if (OriginalLink) {
        const LinkComponent = OriginalLink as any;
        return <LinkComponent {...props} className={className} />;
      }
      return <a {...props} className={className} />;
    },
  };
}
