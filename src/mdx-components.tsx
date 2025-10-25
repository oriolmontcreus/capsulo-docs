import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';
import { InfoCard, InfoCards } from '@/components/info-cards';

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    InfoCard,
    InfoCards,
    ...components,
  };
}
