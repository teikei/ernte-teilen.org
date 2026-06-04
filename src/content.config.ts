import { defineCollection, z } from 'astro:content'
import { glob } from 'astro/loaders'

const link = z.object({ text: z.string(), href: z.string() })

// Markdown pages live in src/content/pages/*.md. Each page selects a layout via
// its `template` frontmatter field (replacing the gatsby-node.js logic).
const pages = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/pages' }),
  schema: z.object({
    template: z
      .enum(['home', 'about', 'featured', 'teikei'])
      .optional(),
    title: z.string().optional(),
    lead: z.string().optional(),
    link: link.optional(),
    // Path (relative to src/assets) of the featured hero image.
    image: z.string().optional(),
    // Absolute path under /public for the social/OpenGraph image.
    metaImage: z.string().optional(),
    teasers: z
      .array(
        z.object({
          slug: z.string(),
          title: z.string(),
          text: z.string(),
          href: z.string(),
        })
      )
      .optional(),
    cards: z
      .array(
        z.object({
          slug: z.string(),
          title: z.string(),
          text: z.string(),
        })
      )
      .optional(),
    testimonials: z
      .array(
        z.object({
          slug: z.string(),
          quote: z.string(),
          name: z.string(),
          description: z.string(),
          title: z.string(),
          text: z.string(),
        })
      )
      .optional(),
    features: z
      .array(
        z.object({
          slug: z.string(),
          title: z.string(),
          text: z.string(),
        })
      )
      .optional(),
    partners: z
      .array(
        z.object({
          id: z.string(),
          title: z.string(),
          items: z.array(
            z.object({
              slug: z.string(),
              name: z.string(),
              url: z.string(),
            })
          ),
        })
      )
      .optional(),
  }),
})

export const collections = { pages }
