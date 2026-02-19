import { createSchema } from "@/lib/form-builder/builders/SchemaBuilder";
import { Select } from "@/lib/form-builder/fields/Select/select.builder";
import { Globe, MapPin } from "lucide-react";

export const BasicSelectSchema = createSchema(
  "Basic select",
  [
    Select("country")
      .label("Country")
      .placeholder("Select a country")
      .options([
        { label: "United States", value: "us" },
        { label: "United Kingdom", value: "uk" },
        { label: "Canada", value: "ca" },
        { label: "Australia", value: "au" },
      ]),
  ],
  "A standard select dropdown field",
);

export const SearchableSelectSchema = createSchema(
  "Searchable select",
  [
    Select("city")
      .label("City")
      .searchable()
      .searchPlaceholder("Search cities...")
      .options([
        { label: "New York", value: "ny" },
        { label: "Los Angeles", value: "la" },
        { label: "Chicago", value: "chi" },
        { label: "Houston", value: "hou" },
        { label: "Phoenix", value: "phx" },
        { label: "Philadelphia", value: "phi" },
        { label: "San Antonio", value: "sa" },
        { label: "San Diego", value: "sd" },
      ]),
  ],
  "Select with search functionality",
);

export const GroupedSelectSchema = createSchema(
  "Grouped options",
  [
    Select("framework")
      .label("Framework")
      .placeholder("Choose a framework")
      .groups([
        {
          label: "Frontend",
          options: [
            { label: "React", value: "react" },
            { label: "Vue", value: "vue" },
            { label: "Angular", value: "angular" },
          ],
        },
        {
          label: "Backend",
          options: [
            { label: "Express", value: "express" },
            { label: "Fastify", value: "fastify" },
            { label: "NestJS", value: "nestjs" },
          ],
        },
      ]),
  ],
  "Select with grouped options",
);

export const MultiColumnSelectSchema = createSchema(
  "Multi-column layout",
  [
    Select("color")
      .label("Color")
      .searchable()
      .columns(3)
      .options([
        { label: "Red", value: "red" },
        { label: "Blue", value: "blue" },
        { label: "Green", value: "green" },
        { label: "Yellow", value: "yellow" },
        { label: "Purple", value: "purple" },
        { label: "Orange", value: "orange" },
        { label: "Pink", value: "pink" },
        { label: "Cyan", value: "cyan" },
        { label: "Magenta", value: "magenta" },
      ]),
  ],
  "Select with multi-column grid layout",
);

export const PrefixSuffixSelectSchema = createSchema(
  "Prefix & Suffix",
  [
    Select("region")
      .label("Region")
      .prefix(<Globe className="size-4" />)
      .suffix(<MapPin className="size-4 text-muted-foreground" />)
      .options([
        { label: "North America", value: "na" },
        { label: "Europe", value: "eu" },
        { label: "Asia Pacific", value: "apac" },
        { label: "Latin America", value: "latam" },
      ]),
  ],
  "Select with visual indicators",
);

export const DescriptionSelectSchema = createSchema(
  "Options with descriptions",
  [
    Select("plan")
      .label("Subscription Plan")
      .searchable()
      .options([
        {
          label: "Free",
          value: "free",
          description: "Basic features for personal use",
        },
        {
          label: "Pro",
          value: "pro",
          description: "Advanced features for professionals",
        },
        {
          label: "Enterprise",
          value: "enterprise",
          description: "Full features with priority support",
        },
      ]),
  ],
  "Select with option descriptions",
);

export const InternalLinksSelectSchema = createSchema(
  "Internal links",
  [
    Select("linkedPage")
      .label("Link to Page")
      .internalLinks(true, false)
      .placeholder("Select a page to link to"),
  ],
  "Select that automatically scans and provides internal page options",
);
