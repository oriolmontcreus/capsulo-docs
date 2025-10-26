'use client';

import React from 'react';
import type { SwitchField as SwitchFieldType } from './switch.types';
import { Switch as SwitchUI } from '@/components/ui/switch';
import { Field, FieldLabel, FieldDescription, FieldError } from '@/components/ui/field';

interface SwitchFieldProps {
    field: SwitchFieldType;
    value?: any;
    onChange?: (value: any) => void;
    error?: string;
}

export const SwitchField: React.FC<SwitchFieldProps> = ({ field, value, onChange, error }) => {
    const [internalValue, setInternalValue] = React.useState<boolean>(field.defaultValue ?? false);
    const isControlled = value !== undefined && onChange !== undefined;
    const booleanValue = isControlled ? (value ?? field.defaultValue ?? false) : internalValue;

    const handleChange = (checked: boolean) => {
        if (isControlled && onChange) {
            onChange(checked);
        } else {
            setInternalValue(checked);
        }
    };

    return (
        <Field data-invalid={!!error}>
            <div className="w-fit flex flex-col gap-2">
                <div className="flex flex-col gap-2">

                    <div className="flex gap-2">
                        <SwitchUI
                            id={field.name}
                            checked={booleanValue}
                            onCheckedChange={handleChange}
                            aria-invalid={!!error}
                        />

                        <FieldLabel htmlFor={field.name} required={field.required}>
                            {field.label || field.name}
                        </FieldLabel>
                    </div>
                    {field.description && (
                        <FieldDescription>{field.description}</FieldDescription>
                    )}
                </div>

            </div>
            {error && <FieldError>{error}</FieldError>}
        </Field>
    );
};
