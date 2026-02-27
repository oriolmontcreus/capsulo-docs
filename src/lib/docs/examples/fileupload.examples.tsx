import { createSchema } from "@/lib/form-builder/builders/SchemaBuilder";
import { FileUpload } from "@/lib/form-builder/fields/FileUpload/fileUpload.builder";

export const BasicFileUploadSchema = createSchema(
  "BasicFileUpload",
  [
    FileUpload("attachment").label("Attachment"),
  ],
  "Basic file upload field",
  "basic-file-upload",
);

export const ImageUploadSchema = createSchema(
  "ImageUpload",
  [
    FileUpload("heroImage")
      .label("Hero Image")
      .images()
      .maxSize(5 * 1024 * 1024), // 5MB
  ],
  "Image upload field with size limit",
  "image-upload",
);

export const MultipleFileUploadSchema = createSchema(
  "MultipleFileUpload",
  [
    FileUpload("gallery")
      .label("Image Gallery")
      .images()
      .multiple()
      .maxFiles(10),
  ],
  "Multiple file upload field with image optimization",
  "multiple-file-upload",
);

export const DocumentUploadSchema = createSchema(
  "DocumentUpload",
  [
    FileUpload("resume")
      .label("Resume")
      .documents()
      .maxSize(10 * 1024 * 1024), // 10MB
  ],
  "Document upload field for resumes and documents",
  "document-upload",
);

export const ListVariantSchema = createSchema(
  "ListVariant",
  [
    FileUpload("files")
      .label("Files (List)")
      .variant("list")
      .multiple()
      .maxFiles(5),
  ],
  "File upload with list variant",
  "list-variant",
);

export const GridVariantSchema = createSchema(
  "GridVariant",
  [
    FileUpload("images")
      .label("Images (Grid)")
      .variant("grid")
      .images()
      .multiple()
      .maxFiles(6),
  ],
  "File upload with grid variant",
  "grid-variant",
);

export const InlineVariantSchema = createSchema(
  "InlineVariant",
  [
    FileUpload("logo")
      .label("Logo (Inline)")
      .variant("inline")
      .images()
      .maxSize(2 * 1024 * 1024), // 2MB
  ],
  "File upload with inline variant",
  "inline-variant",
);