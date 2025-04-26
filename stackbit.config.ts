// stackbit.config.ts
import { defineStackbitConfig } from "@stackbit/types";
import { SanityContentSource } from "@stackbit/cms-sanity";

export default defineStackbitConfig({
  stackbitVersion: "~0.6.0",
  ssgName: "nextjs",
  nodeVersion: "16",
  contentSources: [
    new SanityContentSource({
      rootPath: __dirname,
      studioPath: path.join(__dirname, "studio"),
      studioUrl: "https://project.sanity.studio",
      projectId: process.env.SANITY_PROJECT_ID!,
      token: process.env.SANITY_ACCESS_TOKEN!,
      dataset: process.env.SANITY_DATASET || "production"
    })
  ],
  mapModels: ({ models }) => {
    return models.map(model => {
      if (model.name === "page") {
        return { ...model, type: "page", urlPath: "/{slug}" };
      }
      return model;
    });
  }
});
