// src/content.config.ts
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders'; // <-- Indispensable pour charger des fichiers

const projectsCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/projects" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.preprocess(
      (value) => value instanceof Date ? value.toISOString().slice(0, 10) : value,
      z.string().regex(/^\d{4}(?:-\d{2})?(?:-\d{2})?$/, 'La date doit être au format YYYY, YYYY-MM ou YYYY-MM-DD'),
    ),
    technologies: z.array(z.string()),
    tags: z.array(z.string()),
    repository: z.string().url().optional(),
  }),
});

export const collections = {
  'projects': projectsCollection,
};