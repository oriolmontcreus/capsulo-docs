/**
 * DocsFieldRenderer - A simplified field renderer for documentation purposes.
 * 
 * This is a portable version that doesn't require translation contexts,
 * validation, or other CMS-specific dependencies.
 */

import React from 'react';
import type { Field } from '@/lib/form-builder/core/types';

// Import field components directly
import { InputField } from '@/lib/form-builder/fields/Input/input.field';
import { TextareaField } from '@/lib/form-builder/fields/Textarea/textarea.field';
import { SelectField } from '@/lib/form-builder/fields/Select/select.field';
import { SwitchField } from '@/lib/form-builder/fields/Switch/switch.field';
import { ColorPickerField } from '@/lib/form-builder/fields/ColorPicker/colorpicker.field';
import { DateFieldComponent } from '@/lib/form-builder/fields/DateField/datefield.field';
import { RepeaterField } from '@/lib/form-builder/fields/Repeater/repeater.field';
import { GridFieldComponent } from '@/lib/form-builder/layouts/Grid/grid.layout';
import { TabsFieldComponent } from '@/lib/form-builder/layouts/Tabs/tabs.layout';

interface DocsFieldRendererProps {
  field: Field;
  value: any;
  onChange: (value: any) => void;
  formData?: Record<string, any>;
}

const fieldComponentMap: Record<string, React.ComponentType<any>> = {
  input: InputField,
  textarea: TextareaField,
  select: SelectField,
  switch: SwitchField,
  colorpicker: ColorPickerField,
  datefield: DateFieldComponent,
  repeater: RepeaterField,
  grid: GridFieldComponent,
  tabs: TabsFieldComponent,
};

export const DocsFieldRenderer: React.FC<DocsFieldRendererProps> = ({
  field,
  value,
  onChange,
  formData = {},
}) => {
  // Check hidden state
  if (field.hidden) {
    const isHidden = typeof field.hidden === 'function'
      ? field.hidden(formData)
      : field.hidden;
    if (isHidden) return null;
  }

  const FieldComponent = fieldComponentMap[field.type];

  if (!FieldComponent) {
    console.warn(`[DocsFieldRenderer] Unknown field type: ${field.type}`);
    return (
      <div className="text-destructive text-sm p-2 rounded bg-destructive/10">
        Unknown field type: {field.type}
      </div>
    );
  }

  return (
    <FieldComponent
      field={field}
      value={value}
      onChange={onChange}
      formData={formData}
    />
  );
};

export default DocsFieldRenderer;
