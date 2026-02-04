import { createSchema } from '@/lib/form-builder/builders/SchemaBuilder';
import { Input } from '@/lib/form-builder/fields/Input/input.builder';
import { Mail, Lock, User, Search, DollarSign } from 'lucide-react';

export const BasicInputSchema = createSchema(
  'Basic Input',
  [
    Input('username')
      .label('Username')
      .placeholder('Enter your username')
  ],
  'A standard text input field'
);

export const EmailInputSchema = createSchema(
  'Email Input',
  [
    Input('email')
      .label('Email Address')
      .type('email')
      .placeholder('john@example.com')
      .prefix(<Mail className="size-4" />)
  ],
  'Input field optimized for email addresses'
);

export const PasswordInputSchema = createSchema(
  'Password Input',
  [
    Input('password')
      .label('Password')
      .type('password')
      .placeholder('Enter your password')
      .prefix(<Lock className="size-4" />)
  ],
  'Secure input for passwords'
);

export const NumberInputSchema = createSchema(
  'Number Input',
  [
    Input('quantity')
      .label('Quantity')
      .type('number')
      .min(0)
      .max(100)
      .defaultValue('1')
  ],
  'Numeric input with min/max constraints'
);

export const PrefixSuffixInputSchema = createSchema(
  'Prefix & Suffix',
  [
    Input('price')
      .label('Price')
      .type('number')
      .prefix(<DollarSign className="size-4" />)
      .suffix(<span className="text-sm text-muted-foreground">USD</span>)
      .allowDecimals(true)
      .step(0.01)
  ],
  'Input with visual indicators'
);

export const ValidationInputSchema = createSchema(
  'Validation',
  [
    Input('bio')
      .label('Short Bio')
      .description('Between 10 and 50 characters')
      .minLength(10)
      .maxLength(50)
  ],
  'Input with character length validation'
);
