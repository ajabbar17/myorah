"use client";

import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { studioTheme } from "@sanity/ui";

import { apiVersion, dataset, projectId } from "./src/sanity/env";
import { schema } from "./src/sanity/schemaTypes";
import { structure } from "./src/sanity/structure";

// Modify the studio theme to disable animations
const noAnimationsTheme = {
  ...studioTheme,
  animation: {
    ...studioTheme.animation,
    enabled: false,
    duration: 0,
  },
};

export default defineConfig({
  basePath: "/studio",
  projectId,
  dataset,
  schema,
  theme: noAnimationsTheme,
  plugins: [
    structureTool({
      structure,
      options: {
        disableAnimations: true,
      },
    }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
});
