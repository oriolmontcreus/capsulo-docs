import { createSchema } from "@/lib/form-builder/builders/SchemaBuilder";
import { ColorPicker } from "@/lib/form-builder/fields/ColorPicker/colorpicker.builder";

export const BasicColorPickerSchema = createSchema(
  "Basic color picker",
  [ColorPicker("themeColor").label("Theme Color")],
  "A standard color picker field",
);

export const AlphaColorPickerSchema = createSchema(
  "With alpha channel",
  [
    ColorPicker("overlayColor")
      .label("Overlay Color")
      .showAlpha(true),
  ],
  "Color picker that supports transparency",
);

export const PresetColorsColorPickerSchema = createSchema(
  "Preset colors",
  [
    ColorPicker("brandColor")
      .label("Brand Color")
      .presetColors([
        "#FF0000",
        "#00FF00",
        "#0000FF",
        "#FFFF00",
        "#FF00FF",
        "#00FFFF",
      ]),
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
