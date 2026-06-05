import type { ImageMetadata } from 'astro'

// Eagerly import every processed asset image and key it by slug, so components
// can look up a folder's images by name (see getAssetImages). Used for the
// slug-keyed collections (cards, testimonials, partners, features); single
// frontmatter images use Astro's image() schema helper instead.
const modules = import.meta.glob<{ default: ImageMetadata }>(
  '../assets/**/*.{jpg,jpeg,png}',
  { eager: true }
)

// Build a lookup keyed by "<folder>/<basename-without-ext>",
// e.g. "cards/consumers", "partners/solawi_de", "pages/farms".
const byKey: Record<string, ImageMetadata> = {}
for (const [path, mod] of Object.entries(modules)) {
  const match = path.match(/\/assets\/(.+)\.(jpg|jpeg|png)$/)
  if (match) byKey[match[1]] = mod.default
}

/** All images in a folder, keyed by slug (basename without extension). */
export function getAssetImages(folder: string): Record<string, ImageMetadata> {
  const result: Record<string, ImageMetadata> = {}
  const prefix = `${folder}/`
  for (const [key, image] of Object.entries(byKey)) {
    if (key.startsWith(prefix)) result[key.slice(prefix.length)] = image
  }
  return result
}
