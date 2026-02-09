'use client';

import { Input, Select, Textarea } from '@/lib/form-builder/fields';
import { createSchema } from '@/lib/form-builder/builders/SchemaBuilder';
import { Sparkles } from 'lucide-react';

export const HeroSchema = createSchema(
    'Hero',
    [
     Input('title')
      .label('Hero title')
      .description('The main headline')
      .required()
      .translatable()
      .defaultValue('Welcome to Capsulo'),

    Textarea('subtitle')
      .label('Subtitle')
      .rows(3)
      .translatable()
      .defaultValue('A content management system for developers'),

    Select('ctaLinkType')
      .label('CTA link type')
      .options([
        { label: 'Internal Page', value: 'internal' },
        { label: 'External URL', value: 'external' },
      ])
      .defaultValue('internal'),
    ],
    'Main hero section with title, subtitle, and CTA button',
    'hero', // Unique key for CMS injection
    <Sparkles size={18} />
);
