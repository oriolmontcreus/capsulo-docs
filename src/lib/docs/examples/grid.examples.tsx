import { createSchema } from "@/lib/form-builder/builders/SchemaBuilder";
import { Input } from "@/lib/form-builder/fields/Input/input.builder";
import { Textarea } from "@/lib/form-builder/fields/Textarea/textarea.builder";
import { ColorPicker } from "@/lib/form-builder/fields/ColorPicker/colorpicker.builder";
import { Switch } from "@/lib/form-builder/fields/Switch/switch.builder";
import { Grid } from "@/lib/form-builder/layouts/Grid/grid.builder";

export const BasicGridSchema = createSchema(
  "Basic Grid",
  [
    Grid().contains([
      Input("firstName").label("First Name"),
      Input("lastName").label("Last Name"),
    ]),
  ],
  "A simple two-column grid layout",
);

export const ResponsiveGridSchema = createSchema(
  "Responsive Grid",
  [
    Grid({ base: 1, md: 2, lg: 3 }).contains([
      Input("name").label("Name"),
      Input("email").label("Email"),
      Input("phone").label("Phone"),
      Input("address").label("Address"),
      Input("city").label("City"),
      Input("country").label("Country"),
    ]),
  ],
  "Grid with responsive column counts",
);

export const CustomGapGridSchema = createSchema(
  "Custom Gap Grid",
  [
    Grid(2)
      .gap(6)
      .contains([
        Input("username").label("Username"),
        Input("email").label("Email"),
        Input("bio").label("Bio"),
        Input("website").label("Website"),
      ]),
  ],
  "Grid with custom gap spacing",
);

export const ResponsiveGapGridSchema = createSchema(
  "Responsive Gap Grid",
  [
    Grid({ base: 1, lg: 2 })
      .gap({ base: 2, md: 4, lg: 6 })
      .contains([
        Input("title").label("Title"),
        Input("description").label("Description"),
      ]),
  ],
  "Grid with responsive gap values",
);

export const NestedFieldsGridSchema = createSchema(
  "Nested Fields Grid",
  [
    Grid(2).contains([
      Input("firstName").label("First Name"),
      Input("lastName").label("Last Name"),
      Textarea("address").label("Address"),
      Grid({ base: 1, sm: 2 })
        .gap(4)
        .contains([
          Input("city").label("City"),
          Input("zip").label("ZIP Code"),
        ]),
    ]),
  ],
  "Grid with nested fields and layouts",
);

export const ColSpanExampleSchema = createSchema(
  "Column Span Example",
  [
    Grid({ base: 1, md: 2, lg: 3 })
      .contains([
        Input("firstName").label("First Name"),
        Input("lastName").label("Last Name"),
        Textarea("bio").label("Biography").colSpan({ base: 1, md: 2 }),
        Input("address").label("Address").colSpan("full"),
        Input("city").label("City"),
        Input("country").label("Country"),
      ]),
  ],
  "Fields with column spanning in grid layouts",
);

export const ColSpanMixedFieldsSchema = createSchema(
  "Column Span with Mixed Field Types",
  [
    Grid({ base: 1, md: 2, lg: 3 })
      .contains([
        Input("productName").label("Product Name").colSpan({ base: 1, md: 2 }),
        ColorPicker("primaryColor").label("Primary Color"),
        ColorPicker("secondaryColor").label("Secondary Color"),
        Switch("isActive").label("Active").colSpan("full"),
        Switch("isPublic").label("Public"),
        Input("sku").label("SKU Code"),
      ]),
  ],
  "ColorPicker and Switch components with column spanning",
);
