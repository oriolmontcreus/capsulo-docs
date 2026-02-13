"use client";

import { createSchema } from "@/lib/form-builder/builders/SchemaBuilder";
import { Switch } from "@/lib/form-builder/fields/Switch/switch.builder";
import { Input } from "@/lib/form-builder/fields/Input/input.builder";
import { SchemaRenderer } from "@/lib/docs/SchemaRenderer";

const ConditionalFieldSchema = createSchema(
  "Conditional field",
  [
    Switch("hasLink").label("Has link").defaultValue(false),
    Input("link")
      .label("Link")
      .type("url")
      .prefix("https://")
      .required((formData) => formData?.hasLink)
      .hidden((formData) => !formData?.hasLink),
  ],
  "Toggle the switch to show/hide the input field",
);

export function ConditionalFieldExample() {
  return <SchemaRenderer schema={ConditionalFieldSchema} />;
}
