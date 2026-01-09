'use client';

import React from 'react';
import { PreferencesProvider } from '@/lib/context/PreferencesContext';
import { TranslationProvider } from '@/lib/form-builder/context/TranslationContext';
import { TranslationDataProvider } from '@/lib/form-builder/context/TranslationDataContext';
import { ValidationProvider } from '@/lib/form-builder/context/ValidationContext';
import { RepeaterEditProvider } from '@/lib/form-builder/context/RepeaterEditContext';

interface DocsProviderProps {
    children: React.ReactNode;
}

/**
 * DocsProvider wraps documentation components with all necessary form-builder contexts.
 * This allows CMS components to function correctly in the documentation site.
 */
export function DocsProvider({ children }: DocsProviderProps) {
    return (
        <PreferencesProvider>
            <TranslationProvider>
                <TranslationDataProvider>
                    <ValidationProvider>
                        <RepeaterEditProvider>
                            {children}
                        </RepeaterEditProvider>
                    </ValidationProvider>
                </TranslationDataProvider>
            </TranslationProvider>
        </PreferencesProvider>
    );
}
