"use client";

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
  "Select that automatically provides internal page options",
);

export const InternalLinksGroupedSelectSchema = createSchema(
  "Internal links (grouped)",
  [
    Select("linkedPage")
      .label("Link to Page")
      .internalLinks(true, true)
      .placeholder("Select a page to link to"),
  ],
  "Select with internal pages grouped by section",
);

export const StatusSelectSchema = createSchema(
  "Custom rendered options",
  [
    Select("status")
      .label("Status")
      .placeholder("Select a status")
      .renderOption((option, context) => (
        <div className="flex items-center gap-2">
          <div
            className="size-2 rounded-full"
            style={{ backgroundColor: option.value }}
          />
          <span>{option.label}</span>
        </div>
      ))
      .options([
        { label: "Completed", value: "#22c55e" },
        { label: "In Progress", value: "#3b82f6" },
        { label: "Pending", value: "#f59e0b" },
        { label: "Cancelled", value: "#6b7280" },
        { label: "Failed", value: "#ef4444" },
      ]),
  ],
  "Select with custom option rendering using colored status indicators",
);

export const CustomRenderedColumnsSchema = createSchema(
  "Custom rendering with columns",
  [
    Select("color")
      .label("Color Palette")
      .placeholder("Select a color")
      .columns(2)
      .renderOption((option, context) => (
        <div className="flex items-center gap-2">
          <div
            className="size-4 rounded border"
            style={{ backgroundColor: option.value }}
          />
          <span className="truncate">{option.label}</span>
        </div>
      ))
      .options([
        { label: "Crimson Red", value: "#ef4444" },
        { label: "Ocean Blue", value: "#0284c7" },
        { label: "Forest Green", value: "#16a34a" },
        { label: "Sunset Orange", value: "#f97316" },
        { label: "Royal Purple", value: "#7c3aed" },
        { label: "Golden Yellow", value: "#eab308" },
        { label: "Rose Pink", value: "#f43f5e" },
        { label: "Teal", value: "#14b8a6" },
      ]),
  ],
  "Custom rendered options in a multi-column grid layout",
);

export const OptionLevelCustomRenderSchema = createSchema(
  "Option-level custom rendering",
  [
    Select("notification")
      .label("Notification Type")
      .placeholder("Select notification type")
      .searchable()
      .options([
        {
          label: "Email",
          value: "email",
          render: (opt, ctx) => (
            <div className="flex items-center gap-3">
              <div className="flex size-8 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                📧
              </div>
              <div className="flex flex-col">
                <span className="font-medium">Email Notification</span>
                <span className="text-xs text-muted-foreground">
                  Receive updates via email
                </span>
              </div>
            </div>
          ),
        },
        {
          label: "SMS",
          value: "sms",
          render: (opt, ctx) => (
            <div className="flex items-center gap-3">
              <div className="flex size-8 items-center justify-center rounded-full bg-green-100 text-green-600">
                💬
              </div>
              <div className="flex flex-col">
                <span className="font-medium">SMS Alert</span>
                <span className="text-xs text-muted-foreground">
                  Get instant text messages
                </span>
              </div>
            </div>
          ),
        },
        {
          label: "Push",
          value: "push",
          render: (opt, ctx) => (
            <div className="flex items-center gap-3">
              <div className="flex size-8 items-center justify-center rounded-full bg-purple-100 text-purple-600">
                🔔
              </div>
              <div className="flex flex-col">
                <span className="font-medium">Push Notification</span>
                <span className="text-xs text-muted-foreground">
                  Mobile app notifications
                </span>
              </div>
            </div>
          ),
        },
        {
          label: "Webhook",
          value: "webhook",
          render: (opt, ctx) => (
            <div className="flex items-center gap-3">
              <div className="flex size-8 items-center justify-center rounded-full bg-orange-100 text-orange-600">
                🔗
              </div>
              <div className="flex flex-col">
                <span className="font-medium">Webhook Integration</span>
                <span className="text-xs text-muted-foreground">
                  Send to external service
                </span>
              </div>
            </div>
          ),
        },
      ]),
  ],
  "Each option has its own unique custom render function",
);
