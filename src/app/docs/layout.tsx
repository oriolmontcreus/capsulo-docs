import { source } from '@/lib/source';
import { DocsLayout, type DocsLayoutProps } from 'fumadocs-ui/layouts/docs';
import { baseOptions } from '@/lib/layout.shared';
import { GitHub } from '@/components/github-icon';
import type { ReactNode } from 'react';

function docsOptions(): DocsLayoutProps {
  return {
    ...baseOptions(),
    tree: source.pageTree,
    links: [
      {
        type: 'icon',
        url: 'https://github.com/oriolmontcreus/capsulo',
        icon: <GitHub />,
        text: 'GitHub',
      },
    ],
  };
}

export default function Layout({ children }: { children: ReactNode }) {
  return <DocsLayout {...docsOptions()}>{children}</DocsLayout>;
}
