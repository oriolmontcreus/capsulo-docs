/**
 * Available Pages Mockup
 * Hardcoded pages for documentation demo
 */

import type { SelectOption } from './select.types';

export const AVAILABLE_PAGES: SelectOption[] = [
    { label: 'Home Page', value: '/', description: 'index' },
    { label: 'About Us', value: '/about', description: 'about' },
    { label: 'Documentation', value: '/docs', description: 'docs/index' },
    { label: 'Contact', value: '/contact', description: 'contact' },
    { label: 'Blog', value: '/blog', description: 'blog/index' },
    { label: 'API Reference', value: '/docs/api', description: 'docs/api' },
];
