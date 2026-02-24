import { createSchema } from "@/lib/form-builder/builders/SchemaBuilder";
import { Input } from "@/lib/form-builder/fields/Input/input.builder";
import { Tabs, Tab } from "@/lib/form-builder/layouts/Tabs/tabs.builder";
import { Grid } from "@/lib/form-builder/layouts/Grid/grid.builder";

export const BasicTabsSchema = createSchema(
  "Basic tabs",
  [
    Tabs()
      .tab("Profile", [
        Input("firstName").label("First Name"),
        Input("lastName").label("Last Name"),
      ])
      .tab("Contact", [
        Input("email").label("Email"),
        Input("phone").label("Phone Number"),
      ]),
  ],
  "A simple tabs layout with two sections",
);

export const VerticalTabsSchema = createSchema(
  "Vertical Tabs",
  [
    Tabs()
      .variant("vertical")
      .tab("General", [
        Input("siteName").label("Site Name"),
        Input("description").label("Description"),
      ])
      .tab("Security", [
        Input("password").label("Password"),
        Input("recoveryEmail").label("Recovery Email"),
      ]),
  ],
  "A vertical tabs layout for settings-style interfaces",
);

import { User, Settings } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const TabsWithIconsSchema = createSchema(
  "Tabs with Icons",
  [
    Tabs()
      .addTab(
        Tab("Personal", [Input("name").label("Name")]).prefix(
          <User className="size-4" />,
        ),
      )
      .addTab(
        Tab("Settings", [Input("theme").label("Theme")]).prefix(
          <Settings className="size-4" />,
        ),
      ),
  ],
  "Tabs featuring prefix icons and suffix badges",
);

export const TabsWithGridSchema = createSchema(
  "Tabs with Grid",
  [
    Tabs()
      .tab("Step 1: Identity", [
        Grid({ base: 1, md: 2 }).contains([
          Input("firstName").label("First Name"),
          Input("lastName").label("Last Name"),
          Input("username").label("Username").colSpan("full"),
        ]),
      ])
      .tab("Step 2: Address", [
        Grid({ base: 1, md: 2 }).contains([
          Input("street").label("Street").colSpan("full"),
          Input("city").label("City"),
          Input("zip").label("ZIP Code"),
        ]),
      ]),
  ],
  "A tabs layout where each tab uses a responsive grid",
);
