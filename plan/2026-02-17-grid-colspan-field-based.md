# Grid Column Span - Field-Based Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add responsive column spanning capability where fields declare their own span using `.colSpan()` method, enabling intuitive API like `Input("name").colSpan(2)` or `Input("name").colSpan("full")`.

**Architecture:** Add `colSpan` property to ALL field type interfaces (not just translatable ones), add `colSpan()` method to all field builders, and update Grid layout to read spans from field definitions and generate CSS. Supports `number`, `"full"` (all columns), and responsive objects `{base: 1, md: 2}`.

**Tech Stack:** TypeScript, React, CSS-in-JS

---

### Task 1: Add ColSpan Types to Core

**Files:**
- Modify: `/Users/wekodedevelopers/Documents/Test/test-docs/src/lib/form-builder/core/translation.types.ts`

**Step 1: Add ResponsiveValue and ColSpanValue types**

```typescript
/**
 * Core translation types and interfaces for the Capsulo CMS translation system
 */

/**
 * Responsive value for different breakpoints
 */
export type ResponsiveValue = {
    base?: number; // Base/mobile (< 640px)
    sm?: number;   // Small screens (640px+)
    md?: number;   // Medium screens (768px+)
    lg?: number;   // Large screens (1024px+)
    xl?: number;   // Extra large screens (1280px+)
};

/**
 * Column span value type - can be a number, "full", or responsive object
 */
export type ColSpanValue = number | "full" | ResponsiveValue;

/**
 * Locale configuration from capsulo.config.ts
 */
export interface I18nConfig {
    defaultLocale: string;
    locales: string[];
    fallbackLocale: string;
}

/**
 * Translation status for a field or set of fields
 * - 'complete': All locales have translations
 * - 'missing': One or more locales are missing translations
 */
export type TranslationStatus = 'complete' | 'missing';

/**
 * Base interface for translatable fields
 * This extends existing field types to add translation support
 */
export interface TranslatableField {
    /**
     * Whether this field supports translations
     * When true, the field will store values for each locale
     */
    translatable?: boolean;
    
    /**
     * Column span configuration for grid layouts
     * - number: span that many columns on all breakpoints
     * - "full": span all available columns
     * - ResponsiveValue: different spans per breakpoint
     * @example
     * colSpan: 2  // span 2 columns
     * colSpan: "full"  // span all columns
     * colSpan: { base: 1, md: 2, lg: 3 }  // responsive
     */
    colSpan?: ColSpanValue;
}
```

**Step 2: Commit the type changes**

```bash
git add /Users/wekodedevelopers/Documents/Test/test-docs/src/lib/form-builder/core/translation.types.ts
git commit -m "feat(types): add ResponsiveValue and ColSpanValue types, add colSpan to TranslatableField"
```

---

### Task 2: Add colSpan to SelectField Type

**Files:**
- Modify: `/Users/wekodedevelopers/Documents/Test/test-docs/src/lib/form-builder/fields/Select/select.types.ts`

**Step 1: Import and add colSpan property**

```typescript
import type { ReactNode } from 'react';
import type { PageInfo } from './page-scanner';
import type { ColSpanValue } from '../../core/translation.types';

export interface SelectOption {
  label: string;
  value: string;
  prefix?: ReactNode;
  suffix?: ReactNode;
  disabled?: boolean;
  description?: string; // Secondary text shown in muted color
}

export interface SelectOptionGroup {
  label: string;
  options: Array<SelectOption>;
}

export interface ResponsiveColumns {
  base?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
}

export interface SelectField<TFormData = unknown> {
  type: 'select';
  name: string;
  label?: string;
  description?: string;
  placeholder?: string;
  required?: boolean | ((formData: TFormData) => boolean);
  defaultValue?: string;
  options: Array<SelectOption>;
  groups?: Array<SelectOptionGroup>;
  multiple?: boolean;
  prefix?: ReactNode;
  suffix?: ReactNode;
  searchable?: boolean;
  clearable?: boolean;
  emptyMessage?: string;
  searchPlaceholder?: string;
  columns?: number | ResponsiveColumns;
  // Advanced filtering
  highlightMatches?: boolean;
  minSearchLength?: number;
  // Virtualization
  virtualized?: boolean;
  itemHeight?: number;
  maxVisible?: number;
  virtualizeThreshold?: number;
  // Internal links
  internalLinks?: boolean;
  autoResolveLocale?: boolean;
  availablePages?: PageInfo[];
  groupBySection?: boolean;
  // Table display control
  showInTable?: boolean; // Whether to show this field as a column in a repeater with table variant (default: true)
  hidden?: boolean | ((formData: TFormData) => boolean);
  // Column span for grid layouts
  colSpan?: ColSpanValue;
}
```

**Step 2: Commit**

```bash
git add /Users/wekodedevelopers/Documents/Test/test-docs/src/lib/form-builder/fields/Select/select.types.ts
git commit -m "feat(select): add colSpan property to SelectField type"
```

---

### Task 3: Add colSpan to SwitchField Type

**Files:**
- Modify: `/Users/wekodedevelopers/Documents/Test/test-docs/src/lib/form-builder/fields/Switch/switch.types.ts`

**Step 1: Import and add colSpan property**

```typescript
import type { ColSpanValue } from '../../core/translation.types';

export interface SwitchField<TFormData = unknown> {
    type: 'switch';
    name: string;
    label?: string;
    description?: string;
    required?: boolean | ((formData: TFormData) => boolean);
    defaultValue?: boolean;
    // Table display control
    showInTable?: boolean; // Whether to show this field as a column in a repeater with table variant (default: true)
    hidden?: boolean | ((formData: TFormData) => boolean);
    // Column span for grid layouts
    colSpan?: ColSpanValue;
}
```

**Step 2: Commit**

```bash
git add /Users/wekodedevelopers/Documents/Test/test-docs/src/lib/form-builder/fields/Switch/switch.types.ts
git commit -m "feat(switch): add colSpan property to SwitchField type"
```

---

### Task 4: Add colSpan to FileUploadField Type

**Files:**
- Modify: `/Users/wekodedevelopers/Documents/Test/test-docs/src/lib/form-builder/fields/FileUpload/fileUpload.types.ts`

**Step 1: Import and add colSpan property**

```typescript
import type { ColSpanValue } from '../../core/translation.types';

export interface ImageOptimizationConfig {
    enableWebPConversion: boolean;
    quality: number; // 0-100, default 85
    maxWidth?: number; // default 1920
    maxHeight?: number; // default 1080
    supportedFormats: string[]; // ['image/jpeg', 'image/png']
}

export interface QueuedFile {
    id: string;
    file: File;
    status: 'pending' | 'uploading' | 'uploaded' | 'error';
    preview?: string;
    error?: string;
}

export interface FileUploadValue {
    files: Array<{
        url: string;
        name: string;
        size: number;
        type: string;
    }>;
    // Temporary flags for tracking pending uploads (not saved to storage)
    _hasPendingUploads?: boolean;
    _queuedCount?: number;
}

export type FileUploadVariant = 'list' | 'grid' | 'inline';

export type AspectRatio = 'square' | 'video' | 'wide' | 'portrait' | 'auto' | string;

export interface InlineConfig {
    aspectRatio?: AspectRatio; // 'square' (1:1), 'video' (16:9), 'wide' (21:9), 'portrait' (9:16), 'auto', or custom like '4:3'
    width?: string; // CSS width value, e.g., '100%', '300px', 'auto'
    height?: string; // CSS height value, e.g., 'auto', '200px'
}

export interface FileUploadField<TFormData = unknown> {
    type: 'fileUpload';
    name: string;
    label?: string;
    description?: string;
    required?: boolean | ((formData: TFormData) => boolean);
    defaultValue?: FileUploadValue;
    // File validation options
    accept?: string; // MIME types or file extensions
    maxSize?: number; // Maximum file size in bytes
    maxFiles?: number; // Maximum number of files
    multiple?: boolean; // Allow multiple file selection
    // Display variant
    variant?: FileUploadVariant;
    // Inline variant configuration
    inlineConfig?: InlineConfig;
    // Image optimization settings
    imageOptimization?: ImageOptimizationConfig;
    // Table display control
    showInTable?: boolean; // Whether to show this field as a column in a repeater with table variant (default: true)
    hidden?: boolean | ((formData: TFormData) => boolean);
    // Column span for grid layouts
    colSpan?: ColSpanValue;
}
```

**Step 2: Commit**

```bash
git add /Users/wekodedevelopers/Documents/Test/test-docs/src/lib/form-builder/fields/FileUpload/fileUpload.types.ts
git commit -m "feat(file-upload): add colSpan property to FileUploadField type"
```

---

### Task 5: Add colSpan to ColorPickerField Type

**Files:**
- Modify: `/Users/wekodedevelopers/Documents/Test/test-docs/src/lib/form-builder/fields/ColorPicker/colorpicker.types.ts`

**Step 1: Import and add colSpan property**

```typescript
import type { ColSpanValue } from '../../core/translation.types';

export interface ColorPickerField<TFormData = unknown> {
  type: "colorpicker";
  name: string;
  label?: string;
  description?: string;
  required?: boolean | ((formData: TFormData) => boolean);
  defaultValue?: string; // Hex color string (e.g., "#FF0000" or "#FF000050")
  showAlpha?: boolean; // Whether to show alpha channel controls
  presetColors?: string[]; // Array of preset color swatches
  onlyPresets?: boolean; // Whether the user is restricted to only choosing colors from the presets
  // Table display control
  showInTable?: boolean; // Whether to show this field as a column in a repeater with table variant (default: true)
  hidden?: boolean | ((formData: TFormData) => boolean);
  // Column span for grid layouts
  colSpan?: ColSpanValue;
}
```

**Step 2: Commit**

```bash
git add /Users/wekodedevelopers/Documents/Test/test-docs/src/lib/form-builder/fields/ColorPicker/colorpicker.types.ts
git commit -m "feat(color-picker): add colSpan property to ColorPickerField type"
```

---

### Task 6: Add colSpan to RepeaterField Type

**Files:**
- Modify: `/Users/wekodedevelopers/Documents/Test/test-docs/src/lib/form-builder/fields/Repeater/repeater.types.ts`

**Step 1: Import and add colSpan property**

```typescript
import type { Field } from '../../core/types';
import type { ColSpanValue } from '../../core/translation.types';

export type RepeaterVariant = 'card' | 'table';

export interface RepeaterField<TFormData = unknown> {
    type: 'repeater';
    name: string;
    label?: string;
    description?: string;
    fields: Field<TFormData>[];
    minItems?: number;
    maxItems?: number;
    defaultValue?: any[];
    itemName?: string;
    itemPluralName?: string;
    variant?: RepeaterVariant;
    hidden?: boolean | ((formData: TFormData) => boolean);
    // Column span for grid layouts
    colSpan?: ColSpanValue;
}
```

**Step 2: Commit**

```bash
git add /Users/wekodedevelopers/Documents/Test/test-docs/src/lib/form-builder/fields/Repeater/repeater.types.ts
git commit -m "feat(repeater): add colSpan property to RepeaterField type"
```

---

### Task 7: Add colSpan Method to Input Builder

**Files:**
- Modify: `/Users/wekodedevelopers/Documents/Test/test-docs/src/lib/form-builder/fields/Input/input.builder.ts`

**Step 1: Import ColSpanValue type and add colSpan method**

```typescript
import type { ReactNode } from 'react';
import type { InputField } from './input.types';
import type { ColSpanValue } from '../../core/translation.types';

class InputBuilder {
  private field: InputField;

  constructor(name: string) {
    this.field = {
      type: 'input',
      name,
      inputType: 'text',
    };
  }

  label(value: string): this {
    this.field.label = value;
    return this;
  }

  description(value: string): this {
    this.field.description = value;
    return this;
  }

  placeholder(value: string): this {
    this.field.placeholder = value;
    return this;
  }

  required<T = Record<string, any>>(value: boolean | ((formData: T) => boolean) = true): this {
    this.field.required = value;
    return this;
  }

  defaultValue(value: string): this {
    this.field.defaultValue = value;
    return this;
  }

  type(type: 'text' | 'email' | 'url' | 'password' | 'number'): this {
    this.field.inputType = type;
    return this;
  }

  prefix(value: ReactNode): this {
    this.field.prefix = value;
    return this;
  }

  suffix(value: ReactNode): this {
    this.field.suffix = value;
    return this;
  }

  // For text inputs - character length validation
  minLength(value: number): this {
    this.field.minLength = value;
    return this;
  }

  maxLength(value: number): this {
    this.field.maxLength = value;
    return this;
  }

  // For number inputs - numeric value validation
  min(value: number): this {
    this.field.min = value;
    return this;
  }

  max(value: number): this {
    this.field.max = value;
    return this;
  }

  step(value: number): this {
    this.field.step = value;
    return this;
  }

  allowDecimals(value: boolean = true): this {
    this.field.allowDecimals = value;
    if (!value) { this.field.step = 1; }
    return this;
  }

  regex(value: string | RegExp): this {
    this.field.regex = value;
    return this;
  }

  translatable(enabled: boolean = true): this {
    this.field.translatable = enabled;
    return this;
  }

  showInTable(value: boolean = true): this {
    this.field.showInTable = value;
    return this;
  }

  /**
   * @param value - Boolean to hide/show field, or function receiving formData to determine visibility. Defaults to `true`.
   */
  hidden<T = Record<string, any>>(value: boolean | ((formData: T) => boolean) = true): this {
    this.field.hidden = value;
    return this;
  }

  /**
   * Set the column span for this field when rendered in a grid layout
   * @param value - Number of columns to span, "full" for all columns, or responsive object
   * @example
   * .colSpan(2)  // span 2 columns
   * .colSpan("full")  // span all columns
   * .colSpan({ base: 1, md: 2, lg: 3 })  // responsive spanning
   */
  colSpan(value: ColSpanValue): this {
    this.field.colSpan = value;
    return this;
  }

  build(): InputField {
    return this.field;
  }
}

export const Input = (name: string): InputBuilder => new InputBuilder(name);
```

**Step 2: Commit Input builder changes**

```bash
git add /Users/wekodedevelopers/Documents/Test/test-docs/src/lib/form-builder/fields/Input/input.builder.ts
git commit -m "feat(input): add colSpan method to Input builder"
```

---

### Task 8: Add colSpan Method to Textarea Builder

**Files:**
- Modify: `/Users/wekodedevelopers/Documents/Test/test-docs/src/lib/form-builder/fields/Textarea/textarea.builder.ts`

**Step 1: Import type and add colSpan method**

```typescript
import type { ReactNode } from 'react';
import type { TextareaField } from './textarea.types';
import type { ColSpanValue } from '../../core/translation.types';

class TextareaBuilder {
  private field: TextareaField;

  constructor(name: string) {
    this.field = {
      type: 'textarea',
      name,
    };
  }

  label(value: string): this {
    this.field.label = value;
    return this;
  }

  description(value: string): this {
    this.field.description = value;
    return this;
  }

  placeholder(value: string): this {
    this.field.placeholder = value;
    return this;
  }

  required<T = Record<string, any>>(value: boolean | ((formData: T) => boolean) = true): this {
    this.field.required = value;
    return this;
  }

  defaultValue(value: string): this {
    this.field.defaultValue = value;
    return this;
  }

  rows(value: number): this {
    this.field.rows = value;
    return this;
  }

  minLength(value: number): this {
    this.field.minLength = value;
    return this;
  }

  maxLength(value: number): this {
    this.field.maxLength = value;
    return this;
  }

  prefix(value: ReactNode): this {
    this.field.prefix = value;
    return this;
  }

  suffix(value: ReactNode): this {
    this.field.suffix = value;
    return this;
  }

  autoResize(enabled: boolean = true): this {
    this.field.autoResize = enabled;
    return this;
  }

  minRows(value: number): this {
    this.field.minRows = value;
    return this;
  }

  maxRows(value: number): this {
    this.field.maxRows = value;
    return this;
  }

  resize(mode: 'none' | 'vertical' | 'horizontal' | 'both'): this {
    this.field.resize = mode;
    return this;
  }

  regex(value: string | RegExp): this {
    this.field.regex = value;
    return this;
  }

  translatable(enabled: boolean = true): this {
    this.field.translatable = enabled;
    return this;
  }

  showInTable(value: boolean = true): this {
    this.field.showInTable = value;
    return this;
  }

  hidden<T = Record<string, any>>(value: boolean | ((formData: T) => boolean) = true): this {
    this.field.hidden = value;
    return this;
  }

  /**
   * Set the column span for this field when rendered in a grid layout
   * @param value - Number of columns to span, "full" for all columns, or responsive object
   */
  colSpan(value: ColSpanValue): this {
    this.field.colSpan = value;
    return this;
  }

  build(): TextareaField {
    return this.field;
  }
}

export const Textarea = (name: string): TextareaBuilder => new TextareaBuilder(name);
```

**Step 2: Commit Textarea builder changes**

```bash
git add /Users/wekodedevelopers/Documents/Test/test-docs/src/lib/form-builder/fields/Textarea/textarea.builder.ts
git commit -m "feat(textarea): add colSpan method to Textarea builder"
```

---

### Task 9: Add colSpan Method to Select Builder

**Files:**
- Modify: `/Users/wekodedevelopers/Documents/Test/test-docs/src/lib/form-builder/fields/Select/select.builder.ts`

**Step 1: Import type and add colSpan method**

Add import at the top:
```typescript
import type { ColSpanValue } from '../../core/translation.types';
```

Add method before `build()`:
```typescript
  /**
   * Set the column span for this field when rendered in a grid layout
   * @param value - Number of columns to span, "full" for all columns, or responsive object
   */
  colSpan(value: ColSpanValue): this {
    this.field.colSpan = value;
    return this;
  }

  build(): SelectField {
    return this.field;
  }
```

**Step 2: Commit Select builder changes**

```bash
git add /Users/wekodedevelopers/Documents/Test/test-docs/src/lib/form-builder/fields/Select/select.builder.ts
git commit -m "feat(select): add colSpan method to Select builder"
```

---

### Task 10: Add colSpan Method to Switch Builder

**Files:**
- Modify: `/Users/wekodedevelopers/Documents/Test/test-docs/src/lib/form-builder/fields/Switch/switch.builder.ts`

**Step 1: Import type and add colSpan method**

Add import:
```typescript
import type { ColSpanValue } from '../../core/translation.types';
```

Add method before `build()`:
```typescript
  /**
   * Set the column span for this field when rendered in a grid layout
   * @param value - Number of columns to span, "full" for all columns, or responsive object
   */
  colSpan(value: ColSpanValue): this {
    this.field.colSpan = value;
    return this;
  }

  build(): SwitchField {
    return this.field;
  }
```

**Step 2: Commit Switch builder changes**

```bash
git add /Users/wekodedevelopers/Documents/Test/test-docs/src/lib/form-builder/fields/Switch/switch.builder.ts
git commit -m "feat(switch): add colSpan method to Switch builder"
```

---

### Task 11: Add colSpan Method to RichEditor Builder

**Files:**
- Modify: `/Users/wekodedevelopers/Documents/Test/test-docs/src/lib/form-builder/fields/RichEditor/richeditor.builder.ts`

**Step 1: Import type and add colSpan method**

Add import:
```typescript
import type { ColSpanValue } from '../../core/translation.types';
```

Add method before `build()`:
```typescript
  /**
   * Set the column span for this field when rendered in a grid layout
   * @param value - Number of columns to span, "full" for all columns, or responsive object
   */
  colSpan(value: ColSpanValue): this {
    this.field.colSpan = value;
    return this;
  }

  build(): RichEditorField {
    return this.field;
  }
```

**Step 2: Commit RichEditor builder changes**

```bash
git add /Users/wekodedevelopers/Documents/Test/test-docs/src/lib/form-builder/fields/RichEditor/richeditor.builder.ts
git commit -m "feat(rich-editor): add colSpan method to RichEditor builder"
```

---

### Task 12: Add colSpan Method to FileUpload Builder

**Files:**
- Modify: `/Users/wekodedevelopers/Documents/Test/test-docs/src/lib/form-builder/fields/FileUpload/fileUpload.builder.ts`

**Step 1: Import type and add colSpan method**

Add import:
```typescript
import type { ColSpanValue } from '../../core/translation.types';
```

Add method before `build()`:
```typescript
  /**
   * Set the column span for this field when rendered in a grid layout
   * @param value - Number of columns to span, "full" for all columns, or responsive object
   */
  colSpan(value: ColSpanValue): this {
    this.field.colSpan = value;
    return this;
  }

  build(): FileUploadField {
    return this.field;
  }
```

**Step 2: Commit FileUpload builder changes**

```bash
git add /Users/wekodedevelopers/Documents/Test/test-docs/src/lib/form-builder/fields/FileUpload/fileUpload.builder.ts
git commit -m "feat(file-upload): add colSpan method to FileUpload builder"
```

---

### Task 13: Add colSpan Method to ColorPicker Builder

**Files:**
- Modify: `/Users/wekodedevelopers/Documents/Test/test-docs/src/lib/form-builder/fields/ColorPicker/colorpicker.builder.ts`

**Step 1: Import type and add colSpan method**

Add import:
```typescript
import type { ColSpanValue } from '../../core/translation.types';
```

Add method before `build()`:
```typescript
  /**
   * Set the column span for this field when rendered in a grid layout
   * @param value - Number of columns to span, "full" for all columns, or responsive object
   */
  colSpan(value: ColSpanValue): this {
    this.field.colSpan = value;
    return this;
  }

  build(): ColorPickerField {
    return this.field;
  }
```

**Step 2: Commit ColorPicker builder changes**

```bash
git add /Users/wekodedevelopers/Documents/Test/test-docs/src/lib/form-builder/fields/ColorPicker/colorpicker.builder.ts
git commit -m "feat(color-picker): add colSpan method to ColorPicker builder"
```

---

### Task 14: Add colSpan Method to DateField Builder

**Files:**
- Modify: `/Users/wekodedevelopers/Documents/Test/test-docs/src/lib/form-builder/fields/DateField/datefield.builder.ts`

**Step 1: Import type and add colSpan method**

Add import:
```typescript
import type { ColSpanValue } from '../../core/translation.types';
```

Add method before `build()`:
```typescript
  /**
   * Set the column span for this field when rendered in a grid layout
   * @param value - Number of columns to span, "full" for all columns, or responsive object
   */
  colSpan(value: ColSpanValue): this {
    this.field.colSpan = value;
    return this;
  }

  build(): DateField {
    return this.field;
  }
```

**Step 2: Commit DateField builder changes**

```bash
git add /Users/wekodedevelopers/Documents/Test/test-docs/src/lib/form-builder/fields/DateField/datefield.builder.ts
git commit -m "feat(date-field): add colSpan method to DateField builder"
```

---

### Task 15: Add colSpan Method to Repeater Builder

**Files:**
- Modify: `/Users/wekodedevelopers/Documents/Test/test-docs/src/lib/form-builder/fields/Repeater/repeater.builder.ts`

**Step 1: Import type and add colSpan method**

Add import:
```typescript
import type { ColSpanValue } from '../../core/translation.types';
```

Add method before `build()`:
```typescript
  /**
   * Set the column span for this field when rendered in a grid layout
   * @param value - Number of columns to span, "full" for all columns, or responsive object
   */
  colSpan(value: ColSpanValue): this {
    this.field.colSpan = value;
    return this;
  }

  build(): RepeaterField {
    return this.field;
  }
```

**Step 2: Commit Repeater builder changes**

```bash
git add /Users/wekodedevelopers/Documents/Test/test-docs/src/lib/form-builder/fields/Repeater/repeater.builder.ts
git commit -m "feat(repeater): add colSpan method to Repeater builder"
```

---

### Task 16: Update Grid Layout to Render Field colSpans

**Files:**
- Modify: `/Users/wekodedevelopers/Documents/Test/test-docs/src/lib/form-builder/layouts/Grid/grid.layout.tsx`

**Step 1: Import ColSpanValue type**

```typescript
import type { ColSpanValue, ResponsiveValue } from '../../core/translation.types';
```

**Step 2: Add helper function to generate colSpan CSS**

Add this function inside the component (before `generateResponsiveStyles`):

```typescript
// Convert colSpan to responsive CSS
const generateFieldColSpanStyles = () => {
    let css = '';
    const totalCols = field.columns?.base ?? 1;
    
    field.fields.forEach((childField) => {
        if ('colSpan' in childField && childField.colSpan) {
            const fieldName = 'name' in childField ? childField.name : '';
            if (!fieldName) return;
            
            const colSpan = childField.colSpan;
            
            if (colSpan === "full") {
                // Full width on all breakpoints
                css += `
                    [data-grid-id="${gridId}"] [data-field-name="${fieldName}"] {
                        grid-column: 1 / -1 !important;
                    }
                `;
            } else if (typeof colSpan === "number") {
                // Single number - same on all breakpoints
                const span = Math.min(colSpan, totalCols);
                css += `
                    [data-grid-id="${gridId}"] [data-field-name="${fieldName}"] {
                        grid-column: span ${span} / span ${span} !important;
                    }
                `;
            } else {
                // Responsive object
                if (colSpan.base !== undefined) {
                    const span = Math.min(colSpan.base, totalCols);
                    css += `
                        [data-grid-id="${gridId}"] [data-field-name="${fieldName}"] {
                            grid-column: span ${span} / span ${span} !important;
                        }
                    `;
                }
                if (colSpan.sm !== undefined) {
                    const span = Math.min(colSpan.sm, field.columns?.sm ?? totalCols);
                    css += `
                        @media (min-width: 640px) {
                            [data-grid-id="${gridId}"] [data-field-name="${fieldName}"] {
                                grid-column: span ${span} / span ${span} !important;
                            }
                        }
                    `;
                }
                if (colSpan.md !== undefined) {
                    const span = Math.min(colSpan.md, field.columns?.md ?? totalCols);
                    css += `
                        @media (min-width: 768px) {
                            [data-grid-id="${gridId}"] [data-field-name="${fieldName}"] {
                                grid-column: span ${span} / span ${span} !important;
                            }
                        }
                    `;
                }
                if (colSpan.lg !== undefined) {
                    const span = Math.min(colSpan.lg, field.columns?.lg ?? totalCols);
                    css += `
                        @media (min-width: 1024px) {
                            [data-grid-id="${gridId}"] [data-field-name="${fieldName}"] {
                                grid-column: span ${span} / span ${span} !important;
                            }
                        }
                    `;
                }
                if (colSpan.xl !== undefined) {
                    const span = Math.min(colSpan.xl, field.columns?.xl ?? totalCols);
                    css += `
                        @media (min-width: 1280px) {
                            [data-grid-id="${gridId}"] [data-field-name="${fieldName}"] {
                                grid-column: span ${span} / span ${span} !important;
                            }
                        }
                    `;
                }
            }
        }
    });
    
    return css;
};
```

**Step 3: Update the style injection**

Modify around line 212-214:

```tsx
<>
    {/* Inject responsive styles for columns, gaps, and field column spans */}
    <style dangerouslySetInnerHTML={{ __html: generateResponsiveStyles() + generateFieldColSpanStyles() }} />

    <div
        data-grid-id={gridId}
        className="grid *:[[role=group]]:w-auto *:[[role=group]>*]:w-full"
        style={getGridStyles()}
    >
        {field.fields.map((childField, index) => {
            // Only data fields have names, not layouts like Grid
            const fieldName = 'name' in childField ? childField.name : `field-${index}`;
            const nestedValue = value?.[fieldName];
            const nestedError = fieldErrors && 'name' in childField ? fieldErrors[childField.name] : undefined;

            return (
                <div key={fieldName} data-field-name={fieldName}>
                    <GridFieldItem
                        childField={childField}
                        fieldName={fieldName}
                        fieldPath={fieldName}
                        value={nestedValue}
                        onChange={handleNestedFieldChange}
                        error={nestedError}
                        fieldErrors={fieldErrors}
                        componentData={componentData}
                        formData={formData}
                        highlightedField={highlightedField}
                        highlightRequestId={highlightRequestId}
                    />
                </div>
            );
        })}
    </div>
</>
```

**Step 4: Commit layout changes**

```bash
git add /Users/wekodedevelopers/Documents/Test/test-docs/src/lib/form-builder/layouts/Grid/grid.layout.tsx
git commit -m "feat(grid): implement field-based colSpan rendering with 'full' support"
```

---

### Task 17: Update Documentation

**Files:**
- Modify: `/Users/wekodedevelopers/Documents/Test/test-docs/content/docs/layouts/grid.mdx`

**Step 1: Update the API documentation to show colSpan on fields**

Add a new section after the ResponsiveValue Type section (around line 97):

```markdown
## Column Spanning

Fields inside a grid can span multiple columns using the `colSpan()` method. This is applied directly to the field builder for a more intuitive API.

### colSpan Method

<TypeTable
  type={{
    "Field.colSpan(value)": {
      description: "Sets how many columns this field should span in a grid layout. Supports numbers, 'full' for all columns, or responsive objects.",
      type: "number | 'full' | ResponsiveValue",
    },
  }}
/>

### colSpan Values

- **number**: Span that many columns on all breakpoints (e.g., `colSpan(2)`)
- **"full"**: Span all available columns (e.g., `colSpan("full")`)
- **ResponsiveValue**: Different spans per breakpoint (e.g., `colSpan({ base: 1, md: 2 })`)

If a colSpan exceeds the available columns, it automatically caps at the maximum available.
```

**Step 2: Add colSpan example**

Add after line 185 (after NestedFieldsGridSchema example):

```markdown
<ComponentPreview showMargin={false} className="col-span-full">
  <SchemaRenderer schema={ColSpanExampleSchema} />

```typescript
// Field-based column spanning
Grid({ base: 1, md: 2, lg: 3 })
  .contains([
    Input("firstName").label("First Name"),
    Input("lastName").label("Last Name"),
    Textarea("bio").label("Biography").colSpan({ base: 1, md: 2 }),
    Input("address").label("Address").colSpan("full"),
    Input("city").label("City"),
    Input("country").label("Country"),
  ]);
```

</ComponentPreview>
```

**Step 3: Update imports**

Add to imports around line 6-13:

```typescript
import {
  BasicGridSchema,
  ResponsiveGridSchema,
  CustomGapGridSchema,
  ResponsiveGapGridSchema,
  NestedFieldsGridSchema,
  ColSpanExampleSchema, // ADD THIS
} from "@/lib/docs/examples/grid.examples";
```

**Step 4: Commit documentation**

```bash
git add /Users/wekodedevelopers/Documents/Test/test-docs/content/docs/layouts/grid.mdx
git commit -m "docs(grid): add field-based colSpan documentation and examples"
```

---

### Task 18: Create Example Schema

**Files:**
- Modify: `/Users/wekodedevelopers/Documents/Test/test-docs/src/lib/docs/examples/grid.examples.ts`

**Step 1: Add ColSpanExampleSchema export**

```typescript
export const ColSpanExampleSchema = [
  Grid({ base: 1, md: 2, lg: 3 })
    .contains([
      Input("firstName").label("First Name"),
      Input("lastName").label("Last Name"),
      Textarea("bio").label("Biography").colSpan({ base: 1, md: 2 }),
      Input("address").label("Address").colSpan("full"),
      Input("city").label("City"),
      Input("country").label("Country"),
    ]),
];
```

**Step 2: Commit example**

```bash
git add /Users/wekodedevelopers/Documents/Test/test-docs/src/lib/docs/examples/grid.examples.ts
git commit -m "feat(grid): add field-based colSpan example schema"
```

---

### Task 19: Verification

**Step 1: Run type checking**

```bash
npm run typecheck
```

**Step 2: Build and test**

```bash
npm run build
```

**Step 3: Start dev server and verify**

```bash
npm run dev
# Visit http://localhost:3000/docs/layouts/grid
# Verify colSpan example renders correctly
```

**Step 4: Final commit**

```bash
git add .
git commit -m "feat(grid): complete field-based colSpan implementation for all field types"
```