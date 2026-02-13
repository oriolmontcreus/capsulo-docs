import { createSchema } from "@/lib/form-builder/builders/SchemaBuilder";
import { Switch } from "@/lib/form-builder/fields/Switch/switch.builder";

export const BasicSwitchSchema = createSchema(
  "Basic switch",
  [Switch("enabled").label("Enabled")],
  "A standard toggle switch",
);

export const DefaultOnSwitchSchema = createSchema(
  "Default on",
  [Switch("notifications").label("Enable Notifications").defaultValue(true)],
  "Switch that starts in the on state",
);

export const WithDescriptionSwitchSchema = createSchema(
  "With description",
  [
    Switch("marketing")
      .label("Marketing Emails")
      .description("Receive promotional emails and offers"),
  ],
  "Switch with helper description text",
);

export const RequiredSwitchSchema = createSchema(
  "Required",
  [
    Switch("terms")
      .label("Accept Terms and Conditions")
      .required(true),
  ],
  "Switch that must be checked",
);
