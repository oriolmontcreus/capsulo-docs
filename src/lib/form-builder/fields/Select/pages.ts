/**
 * Available Pages for Internal Links
 * Static list of documentation pages for the demo
 * 
 * Note: In a real application, you would fetch this dynamically from your CMS or API
 * For this documentation demo, we use a static list that matches the actual docs structure
 */

import type { SelectOption } from './select.types';

export const AVAILABLE_PAGES: SelectOption[] = [
    { label: 'Introduction', value: '/docs', description: 'index' },
    { label: 'Global variables', value: '/docs/global-variables', description: 'global-variables' },
    { label: 'What is Capsulo', value: '/docs/what-is-capsulo', description: 'what-is-capsulo' },
    { label: 'ColorPicker', value: '/docs/fields/colorpicker', description: 'fields/colorpicker' },
    { label: 'Input', value: '/docs/fields/input', description: 'fields/input' },
    { label: 'Select', value: '/docs/fields/select', description: 'fields/select' },
    { label: 'Switch', value: '/docs/fields/switch', description: 'fields/switch' },
    { label: 'Textarea', value: '/docs/fields/textarea', description: 'fields/textarea' },
    { label: 'Grid', value: '/docs/layouts/grid', description: 'layouts/grid' },
];

/**
 * Get all available documentation pages
 * This function is kept for API compatibility but returns the static list
 */
export function getAvailablePages(): SelectOption[] {
    return AVAILABLE_PAGES;
}
