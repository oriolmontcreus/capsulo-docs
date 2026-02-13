import { createSchema } from "@/lib/form-builder/builders/SchemaBuilder";
import { Textarea } from "@/lib/form-builder/fields/Textarea/textarea.builder";
import { MessageCircle } from "lucide-react";

export const BasicTextareaSchema = createSchema(
  "Basic textarea",
  [Textarea("comment").label("Comment").placeholder("Enter your comment")],
  "A standard multi-line text input field",
);

export const ValidationTextareaSchema = createSchema(
  "Validation",
  [
    Textarea("bio")
      .label("Bio")
      .description("Between 50 and 500 characters")
      .minLength(50)
      .maxLength(500),
  ],
  "Textarea with character length validation",
);

export const AutoResizeTextareaSchema = createSchema(
  "Auto-resize",
  [Textarea("message").label("Message").autoResize(true).minRows(3).maxRows(8)],
  "Textarea that automatically resizes based on content",
);

export const FixedSizeTextareaSchema = createSchema(
  "Fixed size",
  [Textarea("notes").label("Notes").rows(4).resize("none")],
  "Textarea with fixed dimensions and no resize handle",
);

export const PrefixSuffixTextareaSchema = createSchema(
  "Prefix & Suffix",
  [
    Textarea("feedback")
      .label("Feedback")
      .prefix(<MessageCircle className="size-4" />)
      .suffix(<span className="text-sm text-muted-foreground">Optional</span>),
  ],
  "Textarea with visual indicators",
);
