import { defineCollection, z } from 'astro:content'
import { glob } from 'astro/loaders'

const themes = defineCollection({
  loader: glob({ pattern: '**/index.md', base: './src/content/themes' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    author: z.string(),
    linkedin: z.string().url().optional(),
    date: z.coerce.date(),
  }),
})

export const collections = { themes }
