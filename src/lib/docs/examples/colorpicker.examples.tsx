import { createSchema } from "@/lib/form-builder/builders/SchemaBuilder";
import { ColorPicker } from "@/lib/form-builder/fields/ColorPicker/colorpicker.builder";

export const BasicColorPickerSchema = createSchema(
  "Basic color picker",
  [ColorPicker("themeColor").label("Theme Color")],
  "A standard color picker field",
);

export const AlphaColorPickerSchema = createSchema(
  "With alpha channel",
  [ColorPicker("overlayColor").label("Overlay Color").showAlpha(true)],
  "Color picker that supports transparency",
);

export const PresetColorsColorPickerSchema = createSchema(
  "Preset colors",
  [
    ColorPicker("brandColor")
      .label("Brand Color")
      .presetColors(["#ef4444", "#f59e0b", "#eab308", "#10b981", "#3b82f6"]),
  ],
  "Color picker with predefined color options",
);

export const DefaultValueColorPickerSchema = createSchema(
  "With default value",
  [
    ColorPicker("backgroundColor")
      .label("Background Color")
      .defaultValue("#3B82F6"),
  ],
  "Color picker pre-populated with a default color",
);

export const OnlyPresetsColorPickerSchema = createSchema(
  "Only presets",
  [
    ColorPicker("accentColor")
      .label("Accent Color")
      .presetColors(
        ["#0ea5e9", "#3b82f6", "#6366f1", "#8b5cf6", "#a855f7", "#d946ef"],
        true,
      ),
  ],
  "Color picker restricted to preset colors only",
);
